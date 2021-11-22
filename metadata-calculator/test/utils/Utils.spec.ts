import { Utils } from "../../src/utils/Utils";

describe("Utils Test Suite", () => {
	describe("Success Test Cases", () => {
		it("calculateSpeedInKmH should return Correct Speed", () => {
			const distance = 120,
				time = 2,
				speed = Utils.calculateSpeedInKmH(distance, time);
			expect(speed).toBe(60);
		});

		it("convertDegreesToRadians should convert correctly to radians", () => {
			const degree = 60,
				radians = Utils.convertDegreesToRadians(degree);
			expect(radians).toBe(Math.PI / 3);
		});

		it("calculateDistanceFromTwoCoordinatesInKMonEarth should calculate distance correctly", () => {
			const latitudeLondonLTN = 51.874444,
				longitudeLondonLTN = 0.368056,
				latitudeParisCDG = 49.012778,
				longitudeParisCDG = 2.549722,
				distanceLondonParis = Utils.calculateDistanceFromTwoCoordinatesInKMonEarth(
					latitudeLondonLTN,
					longitudeLondonLTN,
					latitudeParisCDG,
					longitudeParisCDG
				);
			expect(distanceLondonParis.toFixed(2)).toBe("353.68");
		});
	});
});
