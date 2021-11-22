export const CONSTANTS = {
	EARTH_RADIUS_IN_KILOMETERS: 6371,
	REPOSITORY_TABLE_NAME: "houm-houmer-coordinates",
	HOUMER_COORDINATES_INFORMATION_PARTITION_KEY: "HOUMER_COORDINATES_INFORMATION",
	HOUMER_COORD_TIME_INFORMATION_PARTITION_KEY: "HOUMER_COORD_TIME_INFORMATION_PARTITION_KEY",
	HOUMER_SPEED_INFORMATION_PARTITION_KEY: "HOUMER_SPEED_INFORMATION_PARTITION_KEY",
};

export const TYPES = {
	DateProvider: Symbol.for("DateProvider"),
	HoumerCoordinatesRepository: Symbol.for("HoumerCoordinatesRepository"),
	MetadataCalculatorPresenter: Symbol.for("MetadataCalculatorPresenter"),
	MetadataCalculatorController: Symbol.for("MetadataCalculatorController"),
	MetadataCalculatorService: Symbol.for("MetadataCalculatorService"),
};
