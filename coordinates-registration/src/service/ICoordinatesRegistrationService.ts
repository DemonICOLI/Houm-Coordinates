export interface ICoordinatesRegistrationService {
	registerCoordinates(houmerID: number, latitude: number, longitude: number): Promise<object>;
}
