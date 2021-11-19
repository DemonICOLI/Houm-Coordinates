import { DateProvider } from "../DateProvider";
import { DateTime } from "luxon";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class LuxonDateProvider implements DateProvider {
	getCurrentDate(timezone: string): string {
		return DateTime.now().setZone(timezone).toISO();
	}
}
