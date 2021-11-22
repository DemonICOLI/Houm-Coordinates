import { Mock } from "ts-mocks";
import { HoumerCoordinatesRepository } from "../../src/repository/HoumerCoordinatesRepository";
import { DateProvider } from "../../src/provider/date/DateProvider";
import { MetadataCalculatorPresenter } from "../../src/presenter/MetadataCalculatorPresenter";
import { MetadataCalculatorService } from "../../src/service/MetadataCalculatorService";
import { HoumerCoordinatesInformationRecordDTO } from "../../src/model/HoumerCoordinatesDTO";
import { HoumerSpeedInfoDTO } from "../../src/model/HoumerSpeedInfoDTO";
import { HoumerSiteTimeDTO } from "../../src/model/HoumerSiteTimeDTO";

describe("MetadataCalculatorService Test Suite", () => {
	describe("Success Test Cases", () => {
		it("generateHoumerRegistryMetadata should return if no sameDayPreviousInfoHoumerRecord is present", async () => {
			const dateProviderMock = new Mock<DateProvider>({
				hoursBetweenTwoDates(date1: string, date2: string): number {
					return 0;
				},
				areDatesSameDay(date1: string, date2: string): boolean {
					return true;
				},
			}).Object;
			const presenter = new Mock<MetadataCalculatorPresenter>({
				generateOKResponse: () => {
					return {};
				},
			}).Object;

			const repository = new Mock<HoumerCoordinatesRepository>({
				saveSpeedBetweenSitesInformation: undefined,
				saveCoordinatesTimeInformation: undefined,
				getSameDayPreviousCoordinatesInformationRecord: () => {
					return new Promise<HoumerCoordinatesInformationRecordDTO | undefined>((resolve) => {
						resolve(undefined);
					});
				},
			}).Object;

			const service = new MetadataCalculatorService(dateProviderMock, repository, presenter);
			const result = service.generateHoumerRegistryMetadata({
				houmerID: 0,
				latitude: 0,
				longitude: 0,
				recordDateIso: "",
			});
			await expectAsync(result).toBeResolvedTo({});
		});

		it("generateHoumerRegistryMetadata should call saveCoordinatesTimeInformation if sameDayPreviousInfoHoumerRecord is same location", async () => {
			const dateProviderMock = new Mock<DateProvider>({
				hoursBetweenTwoDates(date1: string, date2: string): number {
					return 1;
				},
				areDatesSameDay(date1: string, date2: string): boolean {
					return true;
				},
			}).Object;
			const presenter = new Mock<MetadataCalculatorPresenter>({
				generateOKResponse: () => {
					return {};
				},
			}).Object;

			const repository: HoumerCoordinatesRepository = {
				getSameDayPreviousCoordinatesInformationRecord: async (houmerID, recordDateIso) => {
					return {
						houmerID: 0,
						longitude: 0,
						latitude: 0,
						recordDateIso: "",
					};
				},
				saveCoordinatesTimeInformation: async (houmerSiteTimeData: HoumerSiteTimeDTO) => {},
				saveSpeedBetweenSitesInformation: async (houmerSpeedInformation: HoumerSpeedInfoDTO) => {},
			};
			spyOn(repository, "saveCoordinatesTimeInformation");

			const service = new MetadataCalculatorService(dateProviderMock, repository, presenter);
			const result = await service.generateHoumerRegistryMetadata({
				houmerID: 0,
				latitude: 0,
				longitude: 0,
				recordDateIso: "",
			});
			expect(repository.saveCoordinatesTimeInformation).toHaveBeenCalledOnceWith({
				houmerID: 0,
				longitude: 0,
				latitude: 0,
				hoursInSite: 1,
				arrivalDate: "",
				departureDate: "",
			});
		});

		it("generateHoumerRegistryMetadata should call saveSpeedBetweenSitesInformation if sameDayPreviousInfoHoumerRecord is different location", async () => {
			const dateProviderMock = new Mock<DateProvider>({
				hoursBetweenTwoDates(date1: string, date2: string): number {
					return 4;
				},
				areDatesSameDay(date1: string, date2: string): boolean {
					return true;
				},
			}).Object;
			const presenter = new Mock<MetadataCalculatorPresenter>({
				generateOKResponse: () => {
					return {};
				},
			}).Object;

			const repository: HoumerCoordinatesRepository = {
				getSameDayPreviousCoordinatesInformationRecord: async (houmerID, recordDateIso) => {
					return {
						houmerID: 0,
						latitude: 51.874444,
						longitude: 0.368056,
						recordDateIso: "",
					};
				},
				saveCoordinatesTimeInformation: async (houmerSiteTimeData: HoumerSiteTimeDTO) => {},
				saveSpeedBetweenSitesInformation: async (houmerSpeedInformation: HoumerSpeedInfoDTO) => {},
			};
			spyOn(repository, "saveSpeedBetweenSitesInformation");

			const service = new MetadataCalculatorService(dateProviderMock, repository, presenter);
			const result = await service.generateHoumerRegistryMetadata({
				houmerID: 0,
				latitude: 49.012778,
				longitude: 2.549722,
				recordDateIso: "",
			});
			expect(repository.saveSpeedBetweenSitesInformation).toHaveBeenCalledOnceWith({
				houmerID: 0,
				destiantionArrivalDate: "",
				destinarionLongitude: 2.549722,
				destinationLatitude: 49.012778,
				distanceInKM: 353.68319020300476,
				originDepartureDate: "",
				originLatitude: 51.874444,
				originLongitude: 0.368056,
				speed: 88.42,
				transitTimeInHours: 4,
			});
		});
	});
});
