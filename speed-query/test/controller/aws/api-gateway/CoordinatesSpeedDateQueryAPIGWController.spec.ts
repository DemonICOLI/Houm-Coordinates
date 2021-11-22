import { Mock } from "ts-mocks";
import { APIGatewayEventIdentity, APIGatewayProxyEvent } from "aws-lambda";
import { CoordinatesSpeedDateQueryAPIGWController } from "../../../../src/controller/aws/api-gateway/CoordinatesSpeedDateQueryAPIGWController";
import { ICoordinatesSpeedDateQueryService } from "../../../../src/service/ICoordinatesSpeedDateQueryService";

describe("CoordinatesSpeedDateQueryAPIGWController Test Suite", () => {
	describe("Success Test Cases", () => {
		it("handleEvent should call getHoumerDateCoordinatesInformation in the service", async () => {
			const serviceMock = {
				getHoumerSpeedDateCoordinatesInformation: async (houmerID: number, date: string, maxspeed: number) => {
					return {};
				},
			};
			spyOn(serviceMock, "getHoumerSpeedDateCoordinatesInformation");
			let service = new Mock<ICoordinatesSpeedDateQueryService>(serviceMock).Object,
				controller = new CoordinatesSpeedDateQueryAPIGWController(service),
				mockEvent: APIGatewayProxyEvent = {
					multiValueQueryStringParameters: {},
					requestContext: {
						accountId: "",
						apiId: "",
						authorizer: {},
						protocol: "",
						httpMethod: "",
						identity: {
							accessKey: "",
							accountId: "",
							apiKey: "",
							apiKeyId: "",
							caller: "",
							clientCert: {
								clientCertPem: "CERT_CONTENT",
								subjectDN: "www.example.com",
								issuerDN: "Example issuer",
								serialNumber: "a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1:a1",
								validity: {
									notBefore: "May 28 12:30:02 2019 GMT",
									notAfter: "Aug  5 09:36:04 2021 GMT",
								},
							},
							cognitoAuthenticationProvider: "",
							cognitoAuthenticationType: "",
							cognitoIdentityId: "",
							cognitoIdentityPoolId: "",
							principalOrgId: "",
							sourceIp: "",
							user: "",
							userAgent: "",
							userArn: "",
						},
						path: "",
						stage: "",
						requestId: "",
						requestTime: "",
						requestTimeEpoch: 0,
						resourceId: "",
						resourcePath: "",
					},
					resource: "",
					stageVariables: {},
					body: null,
					headers: {},
					httpMethod: "",
					isBase64Encoded: false,
					path: "",
					pathParameters: {
						hoummerID: "1",
					},
					multiValueHeaders: {},
					queryStringParameters: {
						date: "2",
						maxspeed: "40.5",
					},
				};
			await controller.handleEvent(mockEvent);
			expect(serviceMock.getHoumerSpeedDateCoordinatesInformation).toHaveBeenCalledWith(1, "2", 40.5);
		});
	});
});
