import { CoordinatesRegistrationPresenter } from "../../CoordinatesRegistrationPresenter";
import { HTTP_CODES } from "../../../utils/Constants";
import { injectable } from "inversify";
import "reflect-metadata";
import { APIGatewayProxyResult } from "aws-lambda";

@injectable()
export class CoordinatesRegistrationAWSApiGWPresenter implements CoordinatesRegistrationPresenter {
	public generateInternalServerErrorResponse(): APIGatewayProxyResult {
		return this.generateResponse(HTTP_CODES.INTERNAL_SERVER_ERROR);
	}

	public generateOKResponse(): APIGatewayProxyResult {
		return this.generateResponse(HTTP_CODES.OK);
	}

	private generateResponse(statusCode: number): APIGatewayProxyResult {
		return {
			statusCode,
			body: "",
		};
	}
}
