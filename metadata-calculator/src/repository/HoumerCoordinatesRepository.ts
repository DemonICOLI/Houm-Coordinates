import { HoumerCoordinatesInformationRecordDTO } from "../model/HoumerCoordinatesDTO";
import { HoumerSiteTimeDTO } from "../model/HoumerSiteTimeDTO";
import { HoumerSpeedInfoDTO } from "../model/HoumerSpeedInfoDTO";

export interface HoumerCoordinatesRepository {
	getSameDayPreviousCoordinatesInformationRecord(
		houmerID: number,
		recordDateIso: string
	): Promise<HoumerCoordinatesInformationRecordDTO | undefined>;

	saveCoordinatesTimeInformation(houmerSiteTimeData: HoumerSiteTimeDTO): Promise<void>;
	saveSpeedBetweenSitesInformation(houmerSpeedInformation: HoumerSpeedInfoDTO): Promise<void>;
}
