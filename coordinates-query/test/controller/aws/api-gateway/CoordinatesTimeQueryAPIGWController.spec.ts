import { Mock } from "ts-mocks";
import { APIGatewayEventIdentity, APIGatewayProxyEvent } from "aws-lambda";
import { CoordinatesTimeQueryAPIGWController } from "../../../../src/controller/aws/api-gateway/CoordinatesTimeQueryAPIGWController";
import { ICoordinatesTimeQueryService } from "../../../../src/service/ICoordinatesTimeQueryService";

describe("CoordinatesTimeQueryAPIGWController Test Suite", () => {
	describe("Success Test Cases", () => {
		it("handleEvent should call getHoumerDateCoordinatesInformation in the service", async () => {
			const serviceMock = {
				getHoumerDateCoordinatesInformation: async (houmerID: number, date: string) => {
					return {};
				},
			};
			spyOn(serviceMock, "getHoumerDateCoordinatesInformation");
			let service = new Mock<ICoordinatesTimeQueryService>(serviceMock).Object,
				controller = new CoordinatesTimeQueryAPIGWController(service),
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
					},
				};
			await controller.handleEvent(mockEvent);
			expect(serviceMock.getHoumerDateCoordinatesInformation).toHaveBeenCalledWith(1, "2");
		});
	});
});
