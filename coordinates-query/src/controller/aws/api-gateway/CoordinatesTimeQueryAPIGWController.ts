import { CoordinatesTimeQueryController } from "../../CoordinatesTimeQueryController";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../utils/Constants";
import { ICoordinatesTimeQueryService } from "../../../service/ICoordinatesTimeQueryService";
import { APIGatewayProxyEvent, APIGatewayProxyEventPathParameters } from "aws-lambda";

@injectable()
export class CoordinatesTimeQueryAPIGWController implements CoordinatesTimeQueryController {
	constructor(@inject(TYPES.CoordinatesTimeQueryService) private service: ICoordinatesTimeQueryService) {}
	async handleEvent(event: APIGatewayProxyEvent): Promise<Object> {
		const houmerID: number = parseInt(
			<string>(<APIGatewayProxyEventPathParameters>event.pathParameters).hoummerID,
			10
		);
		// @ts-ignore
		const date: string = event.queryStringParameters.date;
		return await this.service.getHoumerDateCoordinatesInformation(houmerID, date);
	}
}
