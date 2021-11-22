import { CoordinatesSpeedDateQueryAWSApiGWPresenter } from "../../../../src/presenter/aws/api-gateway/CoordinatesSpeedDateQueryAWSApiGWPresenter";

describe("CoordinatesSpeedDateQueryAWSApiGWPresenter test suite", () => {
	const presenter = new CoordinatesSpeedDateQueryAWSApiGWPresenter();
	describe("Success Cases", () => {
		it("generateOKResponse should return an object with status code 200", () => {
			const invalidInputResponse = presenter.generateOKResponse({});
			expect(invalidInputResponse.statusCode).toBe(200);
		});

		it("generateInternalServerErrorResponse should return an object with status code 500", () => {
			const invalidInputResponse = presenter.generateInternalServerErrorResponse();
			expect(invalidInputResponse.statusCode).toBe(500);
		});
	});
});
