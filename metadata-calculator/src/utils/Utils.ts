import { CONSTANTS } from "./Constants";

export class Utils {
	public static calculateDistanceFromTwoCoordinatesInKMonEarth(
		latitudeStart: number,
		longitudeStart: number,
		latitudeEnd: number,
		longitudeEnd: number
	) {
		const diffLat = this.convertDegreesToRadians(latitudeEnd - latitudeStart),
			diffLon = this.convertDegreesToRadians(longitudeEnd - longitudeStart);

		const a =
			Math.pow(Math.sin(diffLat / 2), 2) +
			Math.cos(this.convertDegreesToRadians(latitudeStart)) *
				Math.cos(this.convertDegreesToRadians(latitudeEnd)) *
				Math.pow(Math.sin(diffLon / 2), 2);

		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return CONSTANTS.EARTH_RADIUS_IN_KILOMETERS * c;
	}

	public static calculateSpeedInKmH(distanceInKm: number, timeInHours: number): number {
		return distanceInKm / timeInHours;
	}

	public static convertDegreesToRadians(degree: number): number {
		return degree * (Math.PI / 180);
	}
}
