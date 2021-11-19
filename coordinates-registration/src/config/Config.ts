import { Container } from "inversify";

import { CoordinatesRegistrationController } from "../controller/CoordinatesRegistrationController";
import { TYPES } from "../utils/Constants";
import { CoordinatesRegistrationAWSApiGWController } from "../controller/aws/api-gateway/CoordinatesRegistrationAWSApiGWController";
import { ICoordinatesRegistrationService } from "../service/ICoordinatesRegistrationService";
import { CoordinatesRegistrationService } from "../service/CoordinatesRegistrationService";
import { DateProvider } from "../provider/date/DateProvider";
import { LuxonDateProvider } from "../provider/date/luxon/LuxonDateProvider";
import { CoordinatesRegistrationPresenter } from "../presenter/CoordinatesRegistrationPresenter";
import { CoordinatesRegistrationAWSApiGWPresenter } from "../presenter/aws/api-gateway/CoordinatesRegistrationAWSApiGWPresenter";

const AppContainer: Container = new Container();

AppContainer.bind<CoordinatesRegistrationController>(TYPES.CoordinatesRegistrationController).to(
	CoordinatesRegistrationAWSApiGWController
);

AppContainer.bind<ICoordinatesRegistrationService>(TYPES.CoordinatesRegistrationService).to(
	CoordinatesRegistrationService
);

AppContainer.bind<DateProvider>(TYPES.DateProvider).to(LuxonDateProvider);

AppContainer.bind<CoordinatesRegistrationPresenter>(TYPES.CoordinatesRegistrationPresenter).to(
	CoordinatesRegistrationAWSApiGWPresenter
);

export { AppContainer };
