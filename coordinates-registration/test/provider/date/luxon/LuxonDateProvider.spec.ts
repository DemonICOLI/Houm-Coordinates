import { LuxonDateProvider } from "../../../../src/provider/date/luxon/LuxonDateProvider";

describe("LuxonDateProvider test suite", () => {
	const dateProvider = new LuxonDateProvider();
	describe("Success Cases", () => {
		it("getCurrentDate should return an ISO Date string", () => {
			const isoDate = dateProvider.getCurrentDate("America/Bogota");
			expect(isNaN(Date.parse(isoDate))).toBe(false);
		});
	});
});
