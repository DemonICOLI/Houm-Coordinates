import { CoordinatesTimeQueryAWSApiGWPresenter } from "../../../../src/presenter/aws/api-gateway/CoordinatesTimeQueryAWSApiGWPresenter";

describe("CoordinatesTimeQueryAWSApiGWPresenter test suite", () => {
	const presenter = new CoordinatesTimeQueryAWSApiGWPresenter();
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
