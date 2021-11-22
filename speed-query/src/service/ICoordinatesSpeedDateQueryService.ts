export interface ICoordinatesSpeedDateQueryService {
	getHoumerSpeedDateCoordinatesInformation(houmerID: number, dateIso: string, maxspeed: number): Promise<object>;
}
