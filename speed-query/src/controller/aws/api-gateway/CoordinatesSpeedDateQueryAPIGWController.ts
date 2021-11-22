import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../utils/Constants";
import { ICoordinatesSpeedDateQueryService } from "../../../service/ICoordinatesSpeedDateQueryService";
import { APIGatewayProxyEvent, APIGatewayProxyEventPathParameters } from "aws-lambda";
import { CoordinatesSpeedDateQueryController } from "../../CoordinatesSpeedDateQueryController";

@injectable()
export class CoordinatesSpeedDateQueryAPIGWController implements CoordinatesSpeedDateQueryController {
	constructor(@inject(TYPES.CoordinatesSpeedDateQueryService) private service: ICoordinatesSpeedDateQueryService) {}
	async handleEvent(event: APIGatewayProxyEvent): Promise<Object> {
		const houmerID: number = parseInt(
			<string>(<APIGatewayProxyEventPathParameters>event.pathParameters).hoummerID,
			10
		);
		// @ts-ignore
		const date: string = event.queryStringParameters.date;
		// @ts-ignore
		const maxspeed: number = parseFloat(event.queryStringParameters.maxspeed);
		return await this.service.getHoumerSpeedDateCoordinatesInformation(houmerID, date, maxspeed);
	}
}
