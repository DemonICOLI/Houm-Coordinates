import { ICoordinatesSpeedDateQueryService } from "./ICoordinatesSpeedDateQueryService";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { CoordinatesSpeedDateQueryPresenter } from "../presenter/CoordinatesSpeedDateQueryPresenter";
import { TYPES } from "../utils/Constants";
import { HoumerCoordinatesRepository } from "../repository/HoumerCoordinatesRepository";
import { HoumerSpeedDateDTO } from "../model/HoumerSpeedDateDTO";

@injectable()
export class CoordinatesSpeedDateQueryService implements ICoordinatesSpeedDateQueryService {
	constructor(
		@inject(TYPES.HoumerCoordinatesRepository) private repository: HoumerCoordinatesRepository,
		@inject(TYPES.CoordinatesSpeedDateQueryPresenter) private presenter: CoordinatesSpeedDateQueryPresenter
	) {}
	async getHoumerSpeedDateCoordinatesInformation(
		houmerID: number,
		dateIso: string,
		maxspeed: number
	): Promise<object> {
		try {
			const houmerDateCoordinatesInfo: HoumerSpeedDateDTO[] =
				await this.repository.getHoumerSpeedDateCoordinatesInformation(houmerID, dateIso, maxspeed);
			return this.presenter.generateOKResponse(houmerDateCoordinatesInfo);
		} catch (error) {
			console.error("Ocurrio un error: %o", error);
			return this.presenter.generateInternalServerErrorResponse();
		}
	}
}
