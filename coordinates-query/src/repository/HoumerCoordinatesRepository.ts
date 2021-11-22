import { HoumerSiteTimeDTO } from "../model/HoumerSiteTimeDTO";

export interface HoumerCoordinatesRepository {
	getHoumerDateCoordinatesInformation(houmerID: number, dateIso: string): Promise<HoumerSiteTimeDTO[]>;
}
