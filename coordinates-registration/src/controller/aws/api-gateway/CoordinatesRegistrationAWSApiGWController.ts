import { CoordinatesRegistrationController } from "../../CoordinatesRegistrationController";
import { APIGatewayProxyEvent, APIGatewayProxyEventPathParameters } from "aws-lambda";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../../../utils/Constants";
import { ICoordinatesRegistrationService } from "../../../service/ICoordinatesRegistrationService";

@injectable()
export class CoordinatesRegistrationAWSApiGWController implements CoordinatesRegistrationController {
	constructor(@inject(TYPES.CoordinatesRegistrationService) private service: ICoordinatesRegistrationService) {}

	async handleEvent(event: APIGatewayProxyEvent): Promise<object> {
		const eventBody = JSON.parse(<string>event.body),
			houmerID: number = parseInt(
				<string>(<APIGatewayProxyEventPathParameters>event.pathParameters).hoummerID,
				10
			),
			latitude: number = eventBody.latitude,
			longitude: number = eventBody.longitude;
		return await this.service.registerCoordinates(houmerID, latitude, longitude);
	}
}
