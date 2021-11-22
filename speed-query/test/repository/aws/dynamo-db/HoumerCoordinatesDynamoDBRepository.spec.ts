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
			const result = repository.getHoumerSpeedDateCoordinatesInformation(1, "2", 40.5);
			await expectAsync(result).toBeRejected();
			AWSMock.restore("DynamoDB.DocumentClient");
		});
		it("A success get should resolve", async () => {
			AWSMock.setSDKInstance(AWS);
			let genomeCount = 1;
			AWSMock.mock("DynamoDB.DocumentClient", "query", (parameters: object, callback: Function) => {
				callback(null, {
					Items: [
						{
							DESTINATION_LATITUDE: 0,
							DESTINATION_ARRIVAL_DATE: "",
							ORIGIN_DEPARTURE_DATE: "",
							ORIGIN_LATITUDE: 0,
							SPEED: 0,
							DISTANCE_IN_KM: 0,
							TRANSIT_TIME: 0,
							DESTINATION_LONGITUDE: 0,
							ORIGIN_LONGITUDE: 0,
						},
					],
				});
			});
			const repository = new HoumerCoordinatesDynamoDBRepository();
			const result = repository.getHoumerSpeedDateCoordinatesInformation(1, "2", 40.5);
			await expectAsync(result).toBeResolvedTo([
				{
					destinarionLongitude: 0,
					originLongitude: 0,
					originLatitude: 0,
					originDepartureDate: "",
					destinationLatitude: 0,
					destiantionArrivalDate: "",
					transitTimeInHours: 0,
					speed: 0,
					distanceInKM: 0,
				},
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
			const result = repository.getHoumerSpeedDateCoordinatesInformation(1, "2", 40.5);
			await expectAsync(result).toBeResolvedTo([]);
			AWSMock.restore("DynamoDB.DocumentClient");
		});
	});
});
