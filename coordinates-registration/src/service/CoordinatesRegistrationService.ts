import { ICoordinatesRegistrationService } from "./ICoordinatesRegistrationService";
import { inject, injectable } from "inversify";
import { CONSTANTS, TYPES } from "../utils/Constants";
import { CoordinatesRegistrationPresenter } from "../presenter/CoordinatesRegistrationPresenter";
import { HoumerCoordinatesRepository } from "../repository/HoumerCoordinatesRepository";
import { DateProvider } from "../provider/date/DateProvider";
import { HoumerCoordinatesDTO } from "../model/HoumerCoordinatesDTO";
import "reflect-metadata";

@injectable()
export class CoordinatesRegistrationService implements ICoordinatesRegistrationService {
	constructor(
		@inject(TYPES.DateProvider) private dateProvider: DateProvider,
		@inject(TYPES.HoumerCoordinatesRepository) private repository: HoumerCoordinatesRepository,
		@inject(TYPES.CoordinatesRegistrationPresenter) private presenter: CoordinatesRegistrationPresenter
	) {}

	async registerCoordinates(houmerID: number, latitude: number, longitude: number): Promise<object> {
		const houmerCoordinatesInformation: HoumerCoordinatesDTO = {
			date: this.dateProvider.getCurrentDate(CONSTANTS.TIMEZONE),
			houmerID,
			latitude,
			longitude,
		};
		try {
			console.log("Guardando Información del Houmer: %o", houmerCoordinatesInformation);
			await this.repository.registerCoordinates(houmerCoordinatesInformation);
		} catch (error) {
			console.error("Ocurrio un Error guardando la información: %o", error);
			return this.presenter.generateInternalServerErrorResponse();
		}
		return this.presenter.generateOKResponse();
	}
}
