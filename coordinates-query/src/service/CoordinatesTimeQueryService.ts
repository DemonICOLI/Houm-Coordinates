import { ICoordinatesTimeQueryService } from "./ICoordinatesTimeQueryService";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { CoordinatesTimeQueryPresenter } from "../presenter/CoordinatesTimeQueryPresenter";
import { TYPES } from "../utils/Constants";
import { HoumerCoordinatesRepository } from "../repository/HoumerCoordinatesRepository";
import { HoumerSiteTimeDTO } from "../model/HoumerSiteTimeDTO";

@injectable()
export class CoordinatesTimeQueryService implements ICoordinatesTimeQueryService {
	constructor(
		@inject(TYPES.HoumerCoordinatesRepository) private repository: HoumerCoordinatesRepository,
		@inject(TYPES.CoordinatesTimeQueryPresenter) private presenter: CoordinatesTimeQueryPresenter
	) {}
	async getHoumerDateCoordinatesInformation(houmerID: number, dateIso: string): Promise<object> {
		try {
			const houmerDateCoordinatesInfo: HoumerSiteTimeDTO[] =
				await this.repository.getHoumerDateCoordinatesInformation(houmerID, dateIso);
			return this.presenter.generateOKResponse(houmerDateCoordinatesInfo);
		} catch (error) {
			console.error("Ocurrio un error: %o", error);
			return this.presenter.generateInternalServerErrorResponse();
		}
	}
}
