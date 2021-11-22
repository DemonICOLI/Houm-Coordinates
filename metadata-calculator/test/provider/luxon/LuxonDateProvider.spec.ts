import { LuxonDateProvider } from "../../../src/provider/date/luxon/LuxonDateProvider";

describe("LuxonDateProvider test suite", () => {
	const dateProvider = new LuxonDateProvider();
	describe("Success Cases", () => {
		it("hoursBetweenTwoDates should return correct time", () => {
			const hours = dateProvider.hoursBetweenTwoDates("2021-11-19T18:00:00-0500", "2021-11-19T22:30:00-0500");
			expect(hours).toBe(4.5);
		});

		it("areDatesSameDay should return true if dates are on the same day", () => {
			const sameDay = dateProvider.areDatesSameDay(
				"2021-11-21T21:19:24.219-05:00",
				"2021-11-21T21:27:44.527-05:00"
			);
			expect(sameDay).toBe(true);
		});

		it("areDatesSameDay should return false if dates aren't on the same day", () => {
			const sameDay = dateProvider.areDatesSameDay("2021-11-20T18:00:00-0500", "2021-11-19T22:30:00-0500");
			expect(sameDay).toBe(false);
		});
	});
});
