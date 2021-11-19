import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import { HoumerCoordinatesDynamoDBRepository } from "../../../../src/repository/aws/dynamodb/HoumerCoordinatesDynamoDBRepository";
import { HoumerCoordinatesDTO } from "../../../../src/model/HoumerCoordinatesDTO";

describe("HoumerCoordinatesDynamoDBRepository Test Suite", () => {
	describe("Success Cases", () => {
		it("An Error saving the info should throw an error", async () => {
			AWSMock.setSDKInstance(AWS);
			AWSMock.mock("DynamoDB.DocumentClient", "put", (parameters: object, callback: Function) => {
				callback("Error");
			});
			const repository = new HoumerCoordinatesDynamoDBRepository();
			const houmerCoordinates: HoumerCoordinatesDTO = {
				houmerID: 1,
				date: "",
				latitude: 2,
				longitude: 3,
			};
			const result = repository.registerCoordinates(houmerCoordinates);
			await expectAsync(result).toBeRejected();
			AWSMock.restore("DynamoDB.DocumentClient");
		});
	});
});