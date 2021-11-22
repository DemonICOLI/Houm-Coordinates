import { Container } from "inversify";

import { TYPES } from "../utils/Constants";
import { MetadataCalculatorController } from "../controller/MetadataCalculatorController";
import { MetadataCalculatorDDBStreamsController } from "../controller/aws/dynamo-streams/MetadataCalculatorDDBStreamsController";
import { MetadataCalculatorService } from "../service/MetadataCalculatorService";
import { IMetadataCalculatorService } from "../service/IMetadataCalculatorService";
import { HoumerCoordinatesRepository } from "../repository/HoumerCoordinatesRepository";
import { HoumerCoordinatesDynamoDBRepository } from "../repository/aws/dynamo-db/HoumerCoordinatesDynamoDBRepository";
import { DateProvider } from "../provider/date/DateProvider";
import { LuxonDateProvider } from "../provider/date/luxon/LuxonDateProvider";
import { MetadataCalculatorPresenter } from "../presenter/MetadataCalculatorPresenter";
import { MetadataCalculatorSimplePresenter } from "../presenter/simple/MetadataCalculatorSimplePresenter";

const AppContainer: Container = new Container();

AppContainer.bind<MetadataCalculatorController>(TYPES.MetadataCalculatorController).to(
	MetadataCalculatorDDBStreamsController
);
AppContainer.bind<IMetadataCalculatorService>(TYPES.MetadataCalculatorService).to(MetadataCalculatorService);

AppContainer.bind<HoumerCoordinatesRepository>(TYPES.HoumerCoordinatesRepository).to(
	HoumerCoordinatesDynamoDBRepository
);

AppContainer.bind<DateProvider>(TYPES.DateProvider).to(LuxonDateProvider);

AppContainer.bind<MetadataCalculatorPresenter>(TYPES.MetadataCalculatorPresenter).to(MetadataCalculatorSimplePresenter);

export { AppContainer };
