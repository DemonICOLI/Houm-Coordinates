import { DateProvider } from "../DateProvider";
import { DateTime } from "luxon";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class LuxonDateProvider implements DateProvider {
	hoursBetweenTwoDates(startISODate: string, endISODate: string): number {
		const startDate = DateTime.fromISO(startISODate),
			endDate = DateTime.fromISO(endISODate);
		return Math.abs(<number>endDate.diff(startDate, "hours").toObject().hours);
	}

	areDatesSameDay(date1: string, date2: string): boolean {
		const dateOne = DateTime.fromISO(date1),
			dateTwo = DateTime.fromISO(date2);
		return dateOne.startOf("day").equals(dateTwo.startOf("day"));
	}
}
