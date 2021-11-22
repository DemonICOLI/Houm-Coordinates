import { HoumerCoordinatesRepository } from "../../HoumerCoordinatesRepository";
import "reflect-metadata";
import { injectable } from "inversify";
import { HoumerSiteTimeDTO } from "../../../model/HoumerSiteTimeDTO";
import QueryInput = DocumentClient.QueryInput;
import { CONSTANTS } from "../../../utils/Constants";
import { DynamoDB } from "aws-sdk";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";
import ItemList = DocumentClient.ItemList;

@injectable()
export class HoumerCoordinatesDynamoDBRepository implements HoumerCoordinatesRepository {
	private documentClient = new DynamoDB.DocumentClient();
	async getHoumerDateCoordinatesInformation(houmerID: number, dateIso: string): Promise<HoumerSiteTimeDTO[]> {
		const params: QueryInput = {
			TableName: CONSTANTS.REPOSITORY_TABLE_NAME,
			KeyConditionExpression:
				"INFORMATION_TYPE = :informationType and begins_with(IDENTIFIER, :houmerCoordIdentifier)",
			ExpressionAttributeValues: {
				":informationType": CONSTANTS.HOUMER_COORD_TIME_INFORMATION_PARTITION_KEY,
				":houmerCoordIdentifier": `${houmerID}-${dateIso}`,
			},
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
					latitude: item.LATITUDE,
					// @ts-ignore
					longitude: item.LONGITUDE,
					// @ts-ignore
					arrivalDate: item.ARRIVAL_DATE,
					// @ts-ignore
					departureDate: item.DEPARTURE_DATE,
					// @ts-ignore
					hoursInSite: item.HOURS_ON_SITE,
				};
			});
		} catch (error) {
			console.error("Error Consultando Dynamo: %o", error);
			throw new Error("Error Consultando Dynamo");
		}
	}
}
