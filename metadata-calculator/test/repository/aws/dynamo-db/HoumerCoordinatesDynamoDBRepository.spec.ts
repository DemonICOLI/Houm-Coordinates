import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import { HoumerCoordinatesDynamoDBRepository } from "../../../../src/repository/aws/dynamo-db/HoumerCoordinatesDynamoDBRepository";
import { LuxonDateProvider } from "../../../../src/provider/date/luxon/LuxonDateProvider";

describe("HoumerCoordinatesDynamoDBRepository Test Suite", () => {
	describe("Success Cases", () => {
		it("An Error in saveCoordinatesTimeInformation should throw an error", async () => {
			AWSMock.setSDKInstance(AWS);
			AWSMock.mock("DynamoDB.DocumentClient", "put", (parameters: object, callback: Function) => {
				callback("Error");
			});
			const repository = new HoumerCoordinatesDynamoDBRepository(new LuxonDateProvider());
			const result = repository.saveCoordinatesTimeInformation({
				arrivalDate: "",
				departureDate: "",
				houmerID: 0,
				hoursInSite: 0,
				latitude: 0,
				longitude: 0,
			});
			await expectAsync(result).toBeRejected();
			AWSMock.restore("DynamoDB.DocumentClient");
		});

		it("An Error in saveSpeedBetweenSitesInformation should throw an error", async () => {
			AWSMock.setSDKInstance(AWS);
			AWSMock.mock("DynamoDB.DocumentClient", "put", (parameters: object, callback: Function) => {
				callback("Error");
			});
			const repository = new HoumerCoordinatesDynamoDBRepository(new LuxonDateProvider());
			const result = repository.saveSpeedBetweenSitesInformation({
				destiantionArrivalDate: "",
				destinarionLongitude: 0,
				destinationLatitude: 0,
				distanceInKM: 0,
				houmerID: 0,
				originDepartureDate: "",
				originLatitude: 0,
				originLongitude: 0,
				speed: "",
				transitTimeInHours: 0,
			});
			await expectAsync(result).toBeRejected();
			AWSMock.restore("DynamoDB.DocumentClient");
		});

		it("An Error in getSameDayPreviousCoordinatesInformationRecord should throw an error", async () => {
			AWSMock.setSDKInstance(AWS);
			AWSMock.mock("DynamoDB.DocumentClient", "query", (parameters: object, callback: Function) => {
				callback("Error");
			});
			const repository = new HoumerCoordinatesDynamoDBRepository(new LuxonDateProvider());
			const result = repository.getSameDayPreviousCoordinatesInformationRecord(0, "");
			await expectAsync(result).toBeRejected();
			AWSMock.restore("DynamoDB.DocumentClient");
		});

		it("An non exixting item in getSameDayPreviousCoordinatesInformationRecord should resolve undefined", async () => {
			AWSMock.setSDKInstance(AWS);
			AWSMock.mock("DynamoDB.DocumentClient", "query", (parameters: object, callback: Function) => {
				callback(null, {});
			});
			const repository = new HoumerCoordinatesDynamoDBRepository(new LuxonDateProvider());
			const result = repository.getSameDayPreviousCoordinatesInformationRecord(0, "");
			await expectAsync(result).toBeResolvedTo(undefined);
			AWSMock.restore("DynamoDB.DocumentClient");
		});

		it("An empty Items Array in getSameDayPreviousCoordinatesInformationRecord should resolve undefined", async () => {
			AWSMock.setSDKInstance(AWS);
			AWSMock.mock("DynamoDB.DocumentClient", "query", (parameters: object, callback: Function) => {
				callback(null, { Items: [] });
			});
			const repository = new HoumerCoordinatesDynamoDBRepository(new LuxonDateProvider());
			const result = repository.getSameDayPreviousCoordinatesInformationRecord(0, "");
			await expectAsync(result).toBeResolvedTo(undefined);
			AWSMock.restore("DynamoDB.DocumentClient");
		});

		it("An Items Array for another houmer id in getSameDayPreviousCoordinatesInformationRecord should resolve undefined", async () => {
			AWSMock.setSDKInstance(AWS);
			AWSMock.mock("DynamoDB.DocumentClient", "query", (parameters: object, callback: Function) => {
				callback(null, { Items: [{ HOUMER_ID: 1 }] });
			});
			const repository = new HoumerCoordinatesDynamoDBRepository(new LuxonDateProvider());
			const result = repository.getSameDayPreviousCoordinatesInformationRecord(0, "");
			await expectAsync(result).toBeResolvedTo(undefined);
			AWSMock.restore("DynamoDB.DocumentClient");
		});

		it("An Items Array for same houmer id and another date in getSameDayPreviousCoordinatesInformationRecord should resolve undefined", async () => {
			AWSMock.setSDKInstance(AWS);
			AWSMock.mock("DynamoDB.DocumentClient", "query", (parameters: object, callback: Function) => {
				callback(null, { Items: [{ HOUMER_ID: 0, REPORT_DATE: "2021-11-20T18:00:00-0500" }] });
			});
			const repository = new HoumerCoordinatesDynamoDBRepository(new LuxonDateProvider());
			const result = repository.getSameDayPreviousCoordinatesInformationRecord(0, "2021-11-19T18:00:00-0500");
			await expectAsync(result).toBeResolvedTo(undefined);
			AWSMock.restore("DynamoDB.DocumentClient");
		});

		it("An Items Array for same houmer id and same date in getSameDayPreviousCoordinatesInformationRecord should resolve", async () => {
			AWSMock.setSDKInstance(AWS);
			AWSMock.mock("DynamoDB.DocumentClient", "query", (parameters: object, callback: Function) => {
				callback(null, {
					Items: [{ HOUMER_ID: 0, REPORT_DATE: "2021-11-19T18:00:00-0500", LATITUDE: 1, LONGITUDE: 1 }],
				});
			});
			const repository = new HoumerCoordinatesDynamoDBRepository(new LuxonDateProvider());
			const result = repository.getSameDayPreviousCoordinatesInformationRecord(0, "2021-11-19T18:00:00-0500");
			await expectAsync(result).toBeResolvedTo({
				houmerID: 0,
				recordDateIso: "2021-11-19T18:00:00-0500",
				latitude: 1,
				longitude: 1,
			});
			AWSMock.restore("DynamoDB.DocumentClient");
		});
	});
});
