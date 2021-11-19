import { HoumerCoordinatesRepository } from "../../HoumerCoordinatesRepository";
import { HoumerCoordinatesDTO } from "../../../model/HoumerCoordinatesDTO";
import { injectable } from "inversify";
import "reflect-metadata";
import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";
import PutItemInput = DocumentClient.PutItemInput;
import { CONSTANTS } from "../../../utils/Constants";

@injectable()
export class HoumerCoordinatesDynamoDBRepository implements HoumerCoordinatesRepository {
	private documentClient = new DynamoDB.DocumentClient();
	async registerCoordinates(houmerCoordinates: HoumerCoordinatesDTO): Promise<void> {
		const parameters: PutItemInput = {
			TableName: CONSTANTS.REPOSITORY_TABLE_NAME,
			Item: {
				INFORMATION_TYPE: CONSTANTS.HOUMER_COORDINATES_INFORMATION_PARTITION_KEY,
				IDENTIFIER: `${houmerCoordinates.houmerID}-${houmerCoordinates.date}`,
				HOUMER_ID: houmerCoordinates.houmerID,
				REPORT_DATE: houmerCoordinates.date,
				LATITUDE: houmerCoordinates.latitude,
				LONGITUDE: houmerCoordinates.longitude,
			},
		};
		try {
			await this.documentClient.put(parameters).promise();
		} catch (error) {
			console.log("Error Guardando en DynamoDB: %o", error);
			throw new Error("Error Guardando en DynamoDB");
		}
	}
}
