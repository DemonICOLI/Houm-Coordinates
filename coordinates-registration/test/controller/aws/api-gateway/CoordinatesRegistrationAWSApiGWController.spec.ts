import { Mock } from "ts-mocks";
import { APIGatewayEventIdentity, APIGatewayProxyEvent } from "aws-lambda";
import {ICoordinatesRegistrationService} from "../../../../src/service/ICoordinatesRegistrationService";
import {CoordinatesRegistrationAWSApiGWController} from "../../../../src/controller/aws/api-gateway/CoordinatesRegistrationAWSApiGWController";

describe("CoordinatesRegistrationAWSApiGWController Test Suite", () => {
	describe("Success Test Cases", () => {
		it("handleEvent should call registerCoordinates in the service", async () => {
			const serviceMock = {
				registerCoordinates: async (houmerID: number, latitude: number, longitude: number) => {
					return {};
				},
			};
			spyOn(serviceMock, "registerCoordinates");
			let service = new Mock<ICoordinatesRegistrationService>(serviceMock).Object,
				controller = new CoordinatesRegistrationAWSApiGWController(service),
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
					body: '{"latitude":2,"longitude":3}',
					headers: {},
					httpMethod: "",
					isBase64Encoded: false,
					path: "",
					pathParameters: {
						hoummerID: "1",
					},
					multiValueHeaders: {},
					queryStringParameters: {},
				};
			await controller.handleEvent(mockEvent);
			expect(serviceMock.registerCoordinates).toHaveBeenCalledWith(1, 2, 3);
		});
	});
});
