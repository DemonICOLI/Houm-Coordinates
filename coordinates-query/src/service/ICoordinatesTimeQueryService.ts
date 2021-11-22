export interface ICoordinatesTimeQueryService {
	getHoumerDateCoordinatesInformation(houmerID: number, dateIso: string): Promise<object>
}