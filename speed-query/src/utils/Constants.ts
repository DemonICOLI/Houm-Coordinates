export const CONSTANTS = {
	REPOSITORY_TABLE_NAME: "houm-houmer-coordinates",
	HOUMER_SPEED_INFORMATION_PARTITION_KEY: "HOUMER_SPEED_INFORMATION_PARTITION_KEY",
};

export const TYPES = {
	HoumerCoordinatesRepository: Symbol.for("HoumerCoordinatesRepository"),
	CoordinatesSpeedDateQueryPresenter: Symbol.for("CoordinatesSpeedDateQueryPresenter"),
	CoordinatesSpeedDateQueryService: Symbol.for("CoordinatesSpeedDateQueryService"),
	CoordinatesSpeedDateQueryController: Symbol.for("CoordinatesSpeedDateQueryController"),
};

export const HTTP_CODES = {
	OK: 200,
	INTERNAL_SERVER_ERROR: 500,
};
