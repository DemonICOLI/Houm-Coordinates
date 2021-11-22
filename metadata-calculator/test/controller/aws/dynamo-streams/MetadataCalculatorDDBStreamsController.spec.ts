import { Mock } from "ts-mocks";
import { DynamoDBStreamEvent } from "aws-lambda";
import { CONSTANTS } from "../../../../src/utils/Constants";
import { IMetadataCalculatorService } from "../../../../src/service/IMetadataCalculatorService";
import { HoumerCoordinatesInformationRecordDTO } from "../../../../src/model/HoumerCoordinatesDTO";
import { MetadataCalculatorDDBStreamsController } from "../../../../src/controller/aws/dynamo-streams/MetadataCalculatorDDBStreamsController";

describe("MetadataCalculatorDDBStreamsController Test Suite", () => {
	describe("Success Test Cases", () => {
		it("handleEvent should call generateHoumerRegistryMetadata in the service", async () => {
			const serviceMock = {
				generateHoumerRegistryMetadata: async (
					houmerCoordinatesInformationRecord: HoumerCoordinatesInformationRecordDTO
				) => {
					return {};
				},
			};
			spyOn(serviceMock, "generateHoumerRegistryMetadata");
			let service = new Mock<IMetadataCalculatorService>(serviceMock).Object,
				controller = new MetadataCalculatorDDBStreamsController(service),
				mockEvent: DynamoDBStreamEvent = {
					Records: [
						{
							eventName: "INSERT",
							dynamodb: {
								Keys: {
									INFORMATION_TYPE: { S: CONSTANTS.HOUMER_COORDINATES_INFORMATION_PARTITION_KEY },
								},
								NewImage: {
									HOUMER_ID: { N: "3" },
									LATITUDE: { N: "3" },
									LONGITUDE: { N: "3" },
									REPORT_DATE: { N: "3" },
								},
							},
						},
						{
							eventName: "MODIFY",
							dynamodb: {
								Keys: {
									INFORMATION_TYPE: { S: CONSTANTS.HOUMER_COORDINATES_INFORMATION_PARTITION_KEY },
								},
								NewImage: {
									HOUMER_ID: { N: "3" },
									LATITUDE: { N: "3" },
									LONGITUDE: { N: "3" },
									REPORT_DATE: { N: "3" },
								},
							},
						},
						{
							eventName: "INSERT",
							dynamodb: {
								Keys: { INFORMATION_TYPE: { S: CONSTANTS.HOUMER_SPEED_INFORMATION_PARTITION_KEY } },
								NewImage: {
									HOUMER_ID: { N: "3" },
									LATITUDE: { N: "3" },
									LONGITUDE: { N: "3" },
									REPORT_DATE: { N: "3" },
								},
							},
						},
						{
							eventName: "INSERT",
							dynamodb: {
								Keys: {
									INFORMATION_TYPE: { S: CONSTANTS.HOUMER_COORDINATES_INFORMATION_PARTITION_KEY },
								},
								NewImage: {
									HOUMER_ID: { N: "3" },
									LATITUDE: { N: "3" },
									LONGITUDE: { N: "3" },
									REPORT_DATE: { N: "3" },
								},
							},
						},
					],
				};
			await controller.handleEvent(mockEvent);
			expect(serviceMock.generateHoumerRegistryMetadata).toHaveBeenCalledTimes(2);
		});

		it("handleEvent should resolve even if an error happens in the service", async () => {
			const serviceMock = {
				generateHoumerRegistryMetadata: async (
					houmerCoordinatesInformationRecord: HoumerCoordinatesInformationRecordDTO
				) => {
					throw new Error("Mock ERROR");
				},
			};
			spyOn(serviceMock, "generateHoumerRegistryMetadata");
			let service = new Mock<IMetadataCalculatorService>(serviceMock).Object,
				controller = new MetadataCalculatorDDBStreamsController(service),
				mockEvent: DynamoDBStreamEvent = {
					Records: [
						{
							eventName: "INSERT",
							dynamodb: {
								Keys: {
									INFORMATION_TYPE: { S: CONSTANTS.HOUMER_COORDINATES_INFORMATION_PARTITION_KEY },
								},
								NewImage: {
									HOUMER_ID: { N: "3" },
									LATITUDE: { N: "3" },
									LONGITUDE: { N: "3" },
									REPORT_DATE: { N: "3" },
								},
							},
						},
					],
				};

			await expectAsync(controller.handleEvent(mockEvent)).toBeResolved();
		});
	});
});
