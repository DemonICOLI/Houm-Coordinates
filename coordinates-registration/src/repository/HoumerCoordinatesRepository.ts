import { HoumerCoordinatesDTO } from "../model/HoumerCoordinatesDTO";

export interface HoumerCoordinatesRepository {
	registerCoordinates(houmerCoordinates: HoumerCoordinatesDTO): Promise<void>;
}
