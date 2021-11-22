import { Mock } from "ts-mocks";
import { CoordinatesTimeQueryService } from "../../src/service/CoordinatesTimeQueryService";
import { HoumerCoordinatesRepository } from "../../src/repository/HoumerCoordinatesRepository";
import { CoordinatesTimeQueryPresenter } from "../../src/presenter/CoordinatesTimeQueryPresenter";

describe("CoordinatesTimeQueryService Test Suite", () => {
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
			const presenter = new Mock<CoordinatesTimeQueryPresenter>(presenterMock).Object;
			const repository = new Mock<HoumerCoordinatesRepository>({
				getHoumerDateCoordinatesInformation: async (houmerID, dateIso) => {
					throw "ERROR MOCK";
				},
			}).Object;
			const service = new CoordinatesTimeQueryService(repository, presenter);
			await service.getHoumerDateCoordinatesInformation(1, "2");
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
			const presenter = new Mock<CoordinatesTimeQueryPresenter>(presenterMock).Object;
			const repository = new Mock<HoumerCoordinatesRepository>({
				getHoumerDateCoordinatesInformation: async (houmerID, dateIso) => {
					return [];
				},
			}).Object;
			const service = new CoordinatesTimeQueryService(repository, presenter);
			await service.getHoumerDateCoordinatesInformation(1, "2");
			expect(presenter.generateOKResponse).toHaveBeenCalled();
		});

		it("getMutantCountAndRatio should call getHoumerDateCoordinatesInformation", async () => {
			const repositoryMock = {
				getHoumerDateCoordinatesInformation: async () => [],
			};
			spyOn(repositoryMock, "getHoumerDateCoordinatesInformation");
			const presenter = new Mock<CoordinatesTimeQueryPresenter>({
				generateOKResponse: (bodyObject: object) => {
					return {};
				},
				generateInternalServerErrorResponse: () => {
					return {};
				},
			}).Object;
			const repository = new Mock<HoumerCoordinatesRepository>(repositoryMock).Object;
			const service = new CoordinatesTimeQueryService(repository, presenter);
			await service.getHoumerDateCoordinatesInformation(1, "2");
			expect(repositoryMock.getHoumerDateCoordinatesInformation).toHaveBeenCalled();
		});
	});
});
