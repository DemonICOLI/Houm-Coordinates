import { Mock } from "ts-mocks";
import { CoordinatesSpeedDateQueryService } from "../../src/service/CoordinatesSpeedDateQueryService";
import { HoumerCoordinatesRepository } from "../../src/repository/HoumerCoordinatesRepository";
import { CoordinatesSpeedDateQueryPresenter } from "../../src/presenter/CoordinatesSpeedDateQueryPresenter";

describe("CoordinatesSpeedDateQueryService Test Suite", () => {
	describe("Success Test Cases", () => {
		it("getHoumerDateCoordinatesInformation should call generateInternalServerErrorResponse if an error occurs", async () => {
			const presenterMock = {
				generateInternalServerErrorResponse: () => {
					return {};
				},
				generateOkResponse: (bodyObject: object) => {
					return {};
				},
			};
			spyOn(presenterMock, "generateInternalServerErrorResponse");
			const presenter = new Mock<CoordinatesSpeedDateQueryPresenter>(presenterMock).Object;
			const repository = new Mock<HoumerCoordinatesRepository>({
				getHoumerSpeedDateCoordinatesInformation: async (houmerID, dateIso) => {
					throw "ERROR MOCK";
				},
			}).Object;
			const service = new CoordinatesSpeedDateQueryService(repository, presenter);
			await service.getHoumerSpeedDateCoordinatesInformation(1, "2", 40);
			expect(presenter.generateInternalServerErrorResponse).toHaveBeenCalled();
		});

		it("getMutantCountAndRatio should call generateOkResponse if no error occurs", async () => {
			const presenterMock = {
				generateInternalServerErrorResponse: () => {
					return {};
				},
				generateOKResponse: (bodyObject: object) => {
					return {};
				},
			};
			spyOn(presenterMock, "generateOKResponse");
			const presenter = new Mock<CoordinatesSpeedDateQueryPresenter>(presenterMock).Object;
			const repository = new Mock<HoumerCoordinatesRepository>({
				getHoumerSpeedDateCoordinatesInformation: async (houmerID, dateIso) => {
					return [];
				},
			}).Object;
			const service = new CoordinatesSpeedDateQueryService(repository, presenter);
			await service.getHoumerSpeedDateCoordinatesInformation(1, "2", 40);
			expect(presenter.generateOKResponse).toHaveBeenCalled();
		});

		it("getMutantCountAndRatio should call getHoumerDateCoordinatesInformation", async () => {
			const repositoryMock = {
				getHoumerSpeedDateCoordinatesInformation: async () => [],
			};
			spyOn(repositoryMock, "getHoumerSpeedDateCoordinatesInformation");
			const presenter = new Mock<CoordinatesSpeedDateQueryPresenter>({
				generateOKResponse: (bodyObject: object) => {
					return {};
				},
				generateInternalServerErrorResponse: () => {
					return {};
				},
			}).Object;
			const repository = new Mock<HoumerCoordinatesRepository>(repositoryMock).Object;
			const service = new CoordinatesSpeedDateQueryService(repository, presenter);
			await service.getHoumerSpeedDateCoordinatesInformation(1, "2", 40);
			expect(repositoryMock.getHoumerSpeedDateCoordinatesInformation).toHaveBeenCalled();
		});
	});
});
