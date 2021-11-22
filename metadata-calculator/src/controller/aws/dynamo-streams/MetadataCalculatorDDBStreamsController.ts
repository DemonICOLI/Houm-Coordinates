import { MetadataCalculatorController } from "../../MetadataCalculatorController";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { CONSTANTS, TYPES } from "../../../utils/Constants";
import { IMetadataCalculatorService } from "../../../service/IMetadataCalculatorService";
import { DynamoDBStreamEvent } from "aws-lambda";

@injectable()
export class MetadataCalculatorDDBStreamsController implements MetadataCalculatorController {
	constructor(@inject(TYPES.MetadataCalculatorService) private service: IMetadataCalculatorService) {}

	async handleEvent(event: DynamoDBStreamEvent): Promise<object> {
		let records = event.Records;

		let coordinatesInsertRecords = records
			.filter(({ dynamodb, eventName }) => {
				return (
					eventName === "INSERT" &&
					// @ts-ignore
					dynamodb.Keys.INFORMATION_TYPE.S === CONSTANTS.HOUMER_COORDINATES_INFORMATION_PARTITION_KEY
				);
			})
			.map((record) => {
				return new Promise(async (resolve) => {
					// @ts-ignore
					resolve(
						await this.service.generateHoumerRegistryMetadata({
							// @ts-ignore
							houmerID: record.dynamodb.NewImage.HOUMER_ID.N,
							// @ts-ignore
							latitude: record.dynamodb.NewImage.LATITUDE.N,
							// @ts-ignore
							longitude: record.dynamodb.NewImage.LONGITUDE.N,
							// @ts-ignore
							recordDateIso: record.dynamodb.NewImage.REPORT_DATE.S,
						})
					);
				});
			})
			.map((promise) => promise.catch((e) => console.error(e)));
		console.log(coordinatesInsertRecords);
		return await Promise.all(coordinatesInsertRecords);
	}
}
