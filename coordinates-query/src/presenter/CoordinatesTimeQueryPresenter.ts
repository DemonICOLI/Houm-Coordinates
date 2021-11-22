export interface CoordinatesTimeQueryPresenter {
	generateOKResponse(bodyObject: object): object;
	generateInternalServerErrorResponse(): object;
}
