import { HoumerCoordinatesRepository } from "../repository/HoumerCoordinatesRepository";
import { inject, injectable } from "inversify";
import { CONSTANTS, TYPES } from "../utils/Constants";
import "reflect-metadata";
import { MetadataCalculatorPresenter } from "../presenter/MetadataCalculatorPresenter";
import { HoumerCoordinatesInformationRecordDTO } from "../model/HoumerCoordinatesDTO";
import { Utils } from "../utils/Utils";
import { DateProvider } from "../provider/date/DateProvider";
import { IMetadataCalculatorService } from "./IMetadataCalculatorService";

@injectable()
export class MetadataCalculatorService implements IMetadataCalculatorService {
	constructor(
		@inject(TYPES.DateProvider) private dateProvider: DateProvider,
		@inject(TYPES.HoumerCoordinatesRepository) private repository: HoumerCoordinatesRepository,
		@inject(TYPES.MetadataCalculatorPresenter) private presenter: MetadataCalculatorPresenter
	) {}

	public async generateHoumerRegistryMetadata(
		houmerCoordinatesInformationRecord: HoumerCoordinatesInformationRecordDTO
	): Promise<object> {
		const sameDayPreviousInfoHoumerRecord = await this.repository.getSameDayPreviousCoordinatesInformationRecord(
			houmerCoordinatesInformationRecord.houmerID,
			houmerCoordinatesInformationRecord.recordDateIso
		);
		if (sameDayPreviousInfoHoumerRecord) {
			const timeBetweenRecordsInHours: number = this.calculateTimeBetweenRegistriesInHours(
				sameDayPreviousInfoHoumerRecord,
				houmerCoordinatesInformationRecord
			);
			if (this.areRecordsOnSameCoordinates(houmerCoordinatesInformationRecord, sameDayPreviousInfoHoumerRecord)) {
				await this.repository.saveCoordinatesTimeInformation({
					houmerID: houmerCoordinatesInformationRecord.houmerID,
					arrivalDate: sameDayPreviousInfoHoumerRecord.recordDateIso,
					departureDate: houmerCoordinatesInformationRecord.recordDateIso,
					latitude: houmerCoordinatesInformationRecord.latitude,
					longitude: houmerCoordinatesInformationRecord.longitude,
					hoursInSite: timeBetweenRecordsInHours,
				});
			} else {
				const distanceBetweenRecords = Utils.calculateDistanceFromTwoCoordinatesInKMonEarth(
					sameDayPreviousInfoHoumerRecord.latitude,
					sameDayPreviousInfoHoumerRecord.longitude,
					houmerCoordinatesInformationRecord.latitude,
					houmerCoordinatesInformationRecord.longitude
				);
				const speedBetweenRecords = Utils.calculateSpeedInKmH(
					distanceBetweenRecords,
					timeBetweenRecordsInHours
				).toFixed(2);
				await this.repository.saveSpeedBetweenSitesInformation({
					houmerID: houmerCoordinatesInformationRecord.houmerID,
					originDepartureDate: sameDayPreviousInfoHoumerRecord.recordDateIso,
					originLatitude: sameDayPreviousInfoHoumerRecord.latitude,
					originLongitude: sameDayPreviousInfoHoumerRecord.longitude,
					destiantionArrivalDate: houmerCoordinatesInformationRecord.recordDateIso,
					destinationLatitude: houmerCoordinatesInformationRecord.latitude,
					destinarionLongitude: houmerCoordinatesInformationRecord.longitude,
					distanceInKM: distanceBetweenRecords,
					transitTimeInHours: timeBetweenRecordsInHours,
					speed: speedBetweenRecords,
				});
			}
		} else {
			console.info("El registro anterior no se encontro para el mismo dia");
		}
		return this.presenter.generateOKResponse();
	}

	private calculateTimeBetweenRegistriesInHours(
		firstRecord: HoumerCoordinatesInformationRecordDTO,
		secondRecord: HoumerCoordinatesInformationRecordDTO
	): number {
		return this.dateProvider.hoursBetweenTwoDates(firstRecord.recordDateIso, secondRecord.recordDateIso);
	}

	private areRecordsOnSameCoordinates(
		firstRecord: HoumerCoordinatesInformationRecordDTO,
		secondRecord: HoumerCoordinatesInformationRecordDTO
	): boolean {
		return firstRecord.latitude == secondRecord.latitude && firstRecord.longitude == secondRecord.longitude;
	}
}
