import { Container } from "inversify";

import { TYPES } from "../utils/Constants";
import { CoordinatesTimeQueryController } from "../controller/CoordinatesTimeQueryController";
import { CoordinatesTimeQueryAPIGWController } from "../controller/aws/api-gateway/CoordinatesTimeQueryAPIGWController";
import { ICoordinatesTimeQueryService } from "../service/ICoordinatesTimeQueryService";
import { CoordinatesTimeQueryService } from "../service/CoordinatesTimeQueryService";
import { HoumerCoordinatesRepository } from "../repository/HoumerCoordinatesRepository";
import { HoumerCoordinatesDynamoDBRepository } from "../repository/aws/dynamo-db/HoumerCoordinatesDynamoDBRepository";
import { CoordinatesTimeQueryPresenter } from "../presenter/CoordinatesTimeQueryPresenter";
import { CoordinatesTimeQueryAWSApiGWPresenter } from "../presenter/aws/api-gateway/CoordinatesTimeQueryAWSApiGWPresenter";

const AppContainer: Container = new Container();

AppContainer.bind<CoordinatesTimeQueryController>(TYPES.CoordinatesTimeQueryController).to(
	CoordinatesTimeQueryAPIGWController
);

AppContainer.bind<ICoordinatesTimeQueryService>(TYPES.CoordinatesTimeQueryService).to(CoordinatesTimeQueryService);

AppContainer.bind<HoumerCoordinatesRepository>(TYPES.HoumerCoordinatesRepository).to(
	HoumerCoordinatesDynamoDBRepository
);

AppContainer.bind<CoordinatesTimeQueryPresenter>(TYPES.CoordinatesTimeQueryPresenter).to(
	CoordinatesTimeQueryAWSApiGWPresenter
);

export { AppContainer };
