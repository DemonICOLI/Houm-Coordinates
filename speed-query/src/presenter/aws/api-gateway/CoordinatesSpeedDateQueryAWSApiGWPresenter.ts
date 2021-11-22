import { CoordinatesSpeedDateQueryPresenter } from "../../CoordinatesSpeedDateQueryPresenter";
import { HTTP_CODES } from "../../../utils/Constants";
import { injectable } from "inversify";
import "reflect-metadata";
import { APIGatewayProxyResult } from "aws-lambda";

@injectable()
export class CoordinatesSpeedDateQueryAWSApiGWPresenter implements CoordinatesSpeedDateQueryPresenter {
	public generateInternalServerErrorResponse(): APIGatewayProxyResult {
		return this.generateResponse(HTTP_CODES.INTERNAL_SERVER_ERROR, undefined);
	}

	public generateOKResponse(bodyObject: object): APIGatewayProxyResult {
		return this.generateResponse(HTTP_CODES.OK, bodyObject);
	}

	private generateResponse(statusCode: number, body: object | undefined): APIGatewayProxyResult {
		return {
			statusCode,
			body: body ? JSON.stringify(body) : "",
		};
	}
}
