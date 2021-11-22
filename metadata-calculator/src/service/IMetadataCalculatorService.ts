import { HoumerCoordinatesInformationRecordDTO } from "../model/HoumerCoordinatesDTO";

export interface IMetadataCalculatorService {
	generateHoumerRegistryMetadata(
		houmerCoordinatesInformationRecord: HoumerCoordinatesInformationRecordDTO
	): Promise<object>;
}
