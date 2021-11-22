import { MetadataCalculatorSimplePresenter } from "../../../src/presenter/simple/MetadataCalculatorSimplePresenter";

describe("MetadataCalculatorSimplePresenter test suite", () => {
	const presenter = new MetadataCalculatorSimplePresenter();
	describe("Success Cases", () => {
		it("generateOkResponse should return an object with status OK", () => {
			// @ts-ignore
			const { status } = presenter.generateOKResponse();
			expect(status).toBe("OK");
		});
	});
});
