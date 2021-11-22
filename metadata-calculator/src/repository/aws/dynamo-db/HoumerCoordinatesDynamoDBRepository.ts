import { HoumerCoordinatesRepository } from "../../HoumerCoordinatesRepository";
import { HoumerCoordinatesInformationRecordDTO } from "../../../model/HoumerCoordinatesDTO";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";
import { CONSTANTS, TYPES } from "../../../utils/Constants";
import QueryInput = DocumentClient.QueryInput;
import { HoumerSiteTimeDTO } from "../../../model/HoumerSiteTimeDTO";
import PutItemInput = DocumentClient.PutItemInput;
import { DateProvider } from "../../../provider/date/DateProvider";
import { HoumerSpeedInfoDTO } from "../../../model/HoumerSpeedInfoDTO";

@injectable()
export class HoumerCoordinatesDynamoDBRepository implements HoumerCoordinatesRepository {
	constructor(@inject(TYPES.DateProvider) private dateProvider: DateProvider) {}

	private documentClient = new DynamoDB.DocumentClient();
	public async getSameDayPreviousCoordinatesInformationRecord(
		houmerID: number,
		recordDateIso: string
	): Promise<HoumerCoordinatesInformationRecordDTO | undefined> {
		const params: QueryInput = {
			TableName: CONSTANTS.REPOSITORY_TABLE_NAME,
			KeyConditionExpression: "INFORMATION_TYPE = :informationType and IDENTIFIER < :houmerCoordIdentifier",
			ExpressionAttributeValues: {
				":informationType": CONSTANTS.HOUMER_COORDINATES_INFORMATION_PARTITION_KEY,
				":houmerCoordIdentifier": `${houmerID}-${recordDateIso}`,
			},
			Limit: 1,
			ScanIndexForward: false,
		};
		console.debug("Consultando Dynamo: %o", params);
		try {
			let { Items } = await this.documentClient.query(params).promise();
			console.debug("Resultado Obtenido de Dynamo: %o", Items);
			if (
				Items &&
				Items[0] &&
				Items[0].HOUMER_ID == houmerID &&
				this.dateProvider.areDatesSameDay(recordDateIso, Items[0].REPORT_DATE)
			) {
				return {
					houmerID: Items[0].HOUMER_ID,
					latitude: Items[0].LATITUDE,
					longitude: Items[0].LONGITUDE,
					recordDateIso: Items[0].REPORT_DATE,
				};
			}
			return undefined;
		} catch (error) {
			console.error("Error Consultando Dynamo: %o", error);
			throw new Error("Error Consultando Dynamo");
		}
	}

	public async saveCoordinatesTimeInformation(houmerSiteTimeData: HoumerSiteTimeDTO): Promise<void> {
		const parameters: PutItemInput = {
			TableName: CONSTANTS.REPOSITORY_TABLE_NAME,
			Item: {
				INFORMATION_TYPE: CONSTANTS.HOUMER_COORD_TIME_INFORMATION_PARTITION_KEY,
				IDENTIFIER: `${houmerSiteTimeData.houmerID}-${houmerSiteTimeData.arrivalDate}`,
				HOUMER_ID: houmerSiteTimeData.houmerID,
				ARRIVAL_DATE: houmerSiteTimeData.arrivalDate,
				DEPARTURE_DATE: houmerSiteTimeData.departureDate,
				LATITUDE: houmerSiteTimeData.latitude,
				LONGITUDE: houmerSiteTimeData.longitude,
				HOURS_ON_SITE: houmerSiteTimeData.hoursInSite,
			},
		};
		await this.documentClient.put(parameters).promise();
	}

	async saveSpeedBetweenSitesInformation(houmerSpeedInformation: HoumerSpeedInfoDTO): Promise<void> {
		const parameters: PutItemInput = {
			TableName: CONSTANTS.REPOSITORY_TABLE_NAME,
			Item: {
				INFORMATION_TYPE: CONSTANTS.HOUMER_SPEED_INFORMATION_PARTITION_KEY,
				IDENTIFIER: `${houmerSpeedInformation.houmerID}-${houmerSpeedInformation.destiantionArrivalDate}`,
				HOUMER_ID: houmerSpeedInformation.houmerID,
				ORIGIN_DEPARTURE_DATE: houmerSpeedInformation.originDepartureDate,
				ORIGIN_LATITUDE: houmerSpeedInformation.originLatitude,
				ORIGIN_LONGITUDE: houmerSpeedInformation.originLongitude,
				DESTINATION_ARRIVAL_DATE: houmerSpeedInformation.destiantionArrivalDate,
				DESTINATION_LATITUDE: houmerSpeedInformation.destinationLatitude,
				DESTINATION_LONGITUDE: houmerSpeedInformation.destinarionLongitude,
				DISTANCE_IN_KM: houmerSpeedInformation.distanceInKM,
				TRANSIT_TIME: houmerSpeedInformation.transitTimeInHours,
				SPEED: houmerSpeedInformation.speed,
			},
		};
		await this.documentClient.put(parameters).promise();
	}
}
