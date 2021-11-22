import { HoumerCoordinatesRepository } from "../../HoumerCoordinatesRepository";
import "reflect-metadata";
import { injectable } from "inversify";
import { HoumerSpeedDateDTO } from "../../../model/HoumerSpeedDateDTO";
import QueryInput = DocumentClient.QueryInput;
import { CONSTANTS } from "../../../utils/Constants";
import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";
import ItemList = DocumentClient.ItemList;

@injectable()
export class HoumerCoordinatesDynamoDBRepository implements HoumerCoordinatesRepository {
	private documentClient = new DynamoDB.DocumentClient();
	async getHoumerSpeedDateCoordinatesInformation(
		houmerID: number,
		dateIso: string,
		maxspeed: number
	): Promise<HoumerSpeedDateDTO[]> {
		const params: QueryInput = {
			TableName: CONSTANTS.REPOSITORY_TABLE_NAME,
			KeyConditionExpression:
				"INFORMATION_TYPE = :informationType and begins_with(IDENTIFIER, :houmerCoordIdentifier)",
			ExpressionAttributeValues: {
				":informationType": CONSTANTS.HOUMER_SPEED_INFORMATION_PARTITION_KEY,
				":houmerCoordIdentifier": `${houmerID}-${dateIso}`,
				":speed": maxspeed,
			},
			FilterExpression: "SPEED > :speed",
		};
		console.debug("Consultando Dynamo: %o", params);
		try {
			let Items: ItemList[] = [],
				LastEvaluatedKey = null;
			do {
				const result = await this.documentClient.query(params).promise();
				console.debug("Resultado Obtenido de Dynamo: %o", result);
				Items = Items.concat(<ItemList[]>result.Items);
				LastEvaluatedKey = result.LastEvaluatedKey;
			} while (LastEvaluatedKey);
			return Items.map((item) => {
				return {
					// @ts-ignore
					destinarionLongitude: item.DESTINATION_LONGITUDE,
					// @ts-ignore
					originDepartureDate: item.ORIGIN_DEPARTURE_DATE,
					// @ts-ignore
					speed: item.SPEED,
					// @ts-ignore
					destiantionArrivalDate: item.DESTINATION_ARRIVAL_DATE,
					// @ts-ignore
					originLongitude: item.ORIGIN_LONGITUDE,
					// @ts-ignore
					destinationLatitude: item.DESTINATION_LATITUDE,
					// @ts-ignore
					distanceInKM: item.DISTANCE_IN_KM,
					// @ts-ignore
					originLatitude: item.ORIGIN_LATITUDE,
					// @ts-ignore
					transitTimeInHours: item.TRANSIT_TIME,
				};
			});
		} catch (error) {
			console.error("Error Consultando Dynamo: %o", error);
			throw new Error("Error Consultando Dynamo");
		}
	}
}
