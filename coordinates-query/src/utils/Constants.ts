import { CoordinatesTimeQueryPresenter } from "../presenter/CoordinatesTimeQueryPresenter";
import { HoumerCoordinatesRepository } from "../repository/HoumerCoordinatesRepository";
import { CoordinatesTimeQueryService } from "../service/CoordinatesTimeQueryService";
import { CoordinatesTimeQueryController } from "../controller/CoordinatesTimeQueryController";

export const CONSTANTS = {
	REPOSITORY_TABLE_NAME: "houm-houmer-coordinates",
	HOUMER_COORD_TIME_INFORMATION_PARTITION_KEY: "HOUMER_COORD_TIME_INFORMATION_PARTITION_KEY",
};

export const TYPES = {
	HoumerCoordinatesRepository: Symbol.for("HoumerCoordinatesRepository"),
	CoordinatesTimeQueryPresenter: Symbol.for("CoordinatesTimeQueryPresenter"),
	CoordinatesTimeQueryService: Symbol.for("CoordinatesTimeQueryService"),
	CoordinatesTimeQueryController: Symbol.for("CoordinatesTimeQueryController"),
};

export const HTTP_CODES = {
	OK: 200,
	INTERNAL_SERVER_ERROR: 500,
};
