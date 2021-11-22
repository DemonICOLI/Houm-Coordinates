import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import { HoumerCoordinatesDynamoDBRepository } from "../../../../src/repository/aws/dynamo-db/HoumerCoordinatesDynamoDBRepository";

describe("HoumerCoordinatesDynamoDBRepository Test Suite", () => {
	describe("Success Cases", () => {
		it("An Error getting the info should throw an error", async () => {
			AWSMock.setSDKInstance(AWS);
			AWSMock.mock("DynamoDB.DocumentClient", "query", (parameters: object, callback: Function) => {
				callback("Error");
			});
			const repository = new HoumerCoordinatesDynamoDBRepository();
			const result = repository.getHoumerDateCoordinatesInformation(1, "2");
			await expectAsync(result).toBeRejected();
			AWSMock.restore("DynamoDB.DocumentClient");
		});
		it("A success get should resolve", async () => {
			AWSMock.setSDKInstance(AWS);
			let genomeCount = 1;
			AWSMock.mock("DynamoDB.DocumentClient", "query", (parameters: object, callback: Function) => {
				callback(null, {
					Items: [{ LATITUDE: 0, LONGITUDE: 0, HOURS_ON_SITE: 0, DEPARTURE_DATE: "", ARRIVAL_DATE: "" }],
				});
			});
			const repository = new HoumerCoordinatesDynamoDBRepository();
			const result = repository.getHoumerDateCoordinatesInformation(1, "2");
			await expectAsync(result).toBeResolvedTo([
				{ latitude: 0, longitude: 0, hoursInSite: 0, departureDate: "", arrivalDate: "" },
			]);
			AWSMock.restore("DynamoDB.DocumentClient");
		});

		it("A success get should resolve if no items", async () => {
			AWSMock.setSDKInstance(AWS);
			let genomeCount = 1;
			AWSMock.mock("DynamoDB.DocumentClient", "query", (parameters: object, callback: Function) => {
				callback(null, {
					Items: [],
				});
			});
			const repository = new HoumerCoordinatesDynamoDBRepository();
			const result = repository.getHoumerDateCoordinatesInformation(1, "2");
			await expectAsync(result).toBeResolvedTo([]);
			AWSMock.restore("DynamoDB.DocumentClient");
		});
	});
});
