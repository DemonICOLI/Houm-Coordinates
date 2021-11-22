import { HoumerSpeedDateDTO } from "../model/HoumerSpeedDateDTO";

export interface HoumerCoordinatesRepository {
	getHoumerSpeedDateCoordinatesInformation(
		houmerID: number,
		dateIso: string,
		maxspeed: number
	): Promise<HoumerSpeedDateDTO[]>;
}
