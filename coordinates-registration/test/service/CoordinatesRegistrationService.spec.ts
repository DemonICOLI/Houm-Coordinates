import { Mock } from "ts-mocks";
import { CoordinatesRegistrationPresenter } from "../../src/presenter/CoordinatesRegistrationPresenter";
import { HoumerCoordinatesRepository } from "../../src/repository/HoumerCoordinatesRepository";
import { HoumerCoordinatesDTO } from "../../src/model/HoumerCoordinatesDTO";
import { CoordinatesRegistrationService } from "../../src/service/CoordinatesRegistrationService";
import {DateProvider} from "../../src/provider/date/DateProvider";

describe("CoordinatesRegistrationService Test Suite", () => {
	describe("Success Test Cases", () => {
		it("registerCoordinates should call getCurrentDate on DateProvider", async () => {
			const dateProviderMock = {
				getCurrentDate: (timezone: string) => "Mock_Date",
			};
			spyOn(dateProviderMock, "getCurrentDate");
			const presenter = new Mock<CoordinatesRegistrationPresenter>({
				generateOKResponse: () => {
					return {};
				},
			}).Object;

			const repository = new Mock<HoumerCoordinatesRepository>({
				registerCoordinates: async (data: HoumerCoordinatesDTO) => {
					return;
				},
			}).Object;

			const service = new CoordinatesRegistrationService(dateProviderMock, repository, presenter);
			await service.registerCoordinates(1, 2, 3);
			expect(dateProviderMock.getCurrentDate).toHaveBeenCalled();
		});

		it("registerCoordinates should call registerCoordinates in repository", async () => {
			const repositoryMock = {
				registerCoordinates: async (data: HoumerCoordinatesDTO) => {
					return;
				},
			};
			spyOn(repositoryMock, "registerCoordinates");
			const presenter = new Mock<CoordinatesRegistrationPresenter>({
				generateOKResponse: () => {
					return {};
				},
			}).Object;

			const dateProviderMock = new Mock<DateProvider>({
				getCurrentDate: (timezone: string) => "Mock_Date",
			}).Object;

			const service = new CoordinatesRegistrationService(dateProviderMock, repositoryMock, presenter);
			await service.registerCoordinates(1, 2, 3);
			expect(repositoryMock.registerCoordinates).toHaveBeenCalled();
		});

		it("registerCoordinates should call generateOKResponse in presenter if saving ok", async () => {
			const presenterMock = {
				generateOKResponse: () => {
					return {};
				},
				generateInternalServerErrorResponse: () => {
					return {};
				},
			};
			spyOn(presenterMock, "generateOKResponse");

			const dateProviderMock = new Mock<DateProvider>({
				getCurrentDate: (timezone: string) => "Mock_Date",
			}).Object;

			const repositoryMock = new Mock<HoumerCoordinatesRepository>({
				registerCoordinates: async (data: HoumerCoordinatesDTO) => {
					return;
				},
			}).Object;

			const service = new CoordinatesRegistrationService(dateProviderMock, repositoryMock, presenterMock);
			await service.registerCoordinates(1, 2, 3);
			expect(presenterMock.generateOKResponse).toHaveBeenCalled();
		});

		it("registerCoordinates should call generateInternalServerErrorResponse in presenter if saving fails", async () => {
			const presenterMock = {
				generateOKResponse: () => {
					return {};
				},
				generateInternalServerErrorResponse: () => {
					return {};
				},
			};
			spyOn(presenterMock, "generateInternalServerErrorResponse");

			const dateProviderMock = new Mock<DateProvider>({
				getCurrentDate: (timezone: string) => "Mock_Date",
			}).Object;

			const repositoryMock = new Mock<HoumerCoordinatesRepository>({
				registerCoordinates: async (data: HoumerCoordinatesDTO) => {
					throw new Error("Error");
				},
			}).Object;

			const service = new CoordinatesRegistrationService(dateProviderMock, repositoryMock, presenterMock);
			await service.registerCoordinates(1, 2, 3);
			expect(presenterMock.generateInternalServerErrorResponse).toHaveBeenCalled();
		});
	});
});
