import { Container } from "inversify";

import { TYPES } from "../utils/Constants";
import { CoordinatesSpeedDateQueryController } from "../controller/CoordinatesSpeedDateQueryController";
import { CoordinatesSpeedDateQueryAPIGWController } from "../controller/aws/api-gateway/CoordinatesSpeedDateQueryAPIGWController";
import { ICoordinatesSpeedDateQueryService } from "../service/ICoordinatesSpeedDateQueryService";
import { CoordinatesSpeedDateQueryService } from "../service/CoordinatesSpeedDateQueryService";
import { HoumerCoordinatesRepository } from "../repository/HoumerCoordinatesRepository";
import { HoumerCoordinatesDynamoDBRepository } from "../repository/aws/dynamo-db/HoumerCoordinatesDynamoDBRepository";
import { CoordinatesSpeedDateQueryPresenter } from "../presenter/CoordinatesSpeedDateQueryPresenter";
import { CoordinatesSpeedDateQueryAWSApiGWPresenter } from "../presenter/aws/api-gateway/CoordinatesSpeedDateQueryAWSApiGWPresenter";

const AppContainer: Container = new Container();

AppContainer.bind<CoordinatesSpeedDateQueryController>(TYPES.CoordinatesSpeedDateQueryController).to(
	CoordinatesSpeedDateQueryAPIGWController
);

AppContainer.bind<ICoordinatesSpeedDateQueryService>(TYPES.CoordinatesSpeedDateQueryService).to(CoordinatesSpeedDateQueryService);

AppContainer.bind<HoumerCoordinatesRepository>(TYPES.HoumerCoordinatesRepository).to(
	HoumerCoordinatesDynamoDBRepository
);

AppContainer.bind<CoordinatesSpeedDateQueryPresenter>(TYPES.CoordinatesSpeedDateQueryPresenter).to(
	CoordinatesSpeedDateQueryAWSApiGWPresenter
);

export { AppContainer };
