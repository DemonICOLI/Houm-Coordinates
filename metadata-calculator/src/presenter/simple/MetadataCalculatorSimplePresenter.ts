import { MetadataCalculatorPresenter } from "../MetadataCalculatorPresenter";
import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class MetadataCalculatorSimplePresenter implements MetadataCalculatorPresenter {
	generateOKResponse(): object {
		return {
			status: "OK",
		};
	}
}
