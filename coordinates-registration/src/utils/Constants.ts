export const CONSTANTS = {
	TIMEZONE: "America/Bogota",
	REPOSITORY_TABLE_NAME: "houm-houmer-coordinates",
	HOUMER_COORDINATES_INFORMATION_PARTITION_KEY: "HOUMER_COORDINATES_INFORMATION",
};

export const HTTP_CODES = {
	OK: 200,
	INTERNAL_SERVER_ERROR: 500,
};

export const TYPES = {
	CoordinatesRegistrationController: Symbol.for("CoordinatesRegistrationController"),
	CoordinatesRegistrationService: Symbol.for("CoordinatesRegistrationService"),
	CoordinatesRegistrationPresenter: Symbol.for("CoordinatesRegistrationPresenter"),
	HoumerCoordinatesRepository: Symbol.for("HoumerCoordinatesRepository"),
	DateProvider: Symbol.for("DateProvider"),
};
