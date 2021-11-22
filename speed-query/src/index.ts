import { AppContainer } from "./config/Config";
import { TYPES } from "./utils/Constants";
import { CoordinatesSpeedDateQueryController } from "./controller/CoordinatesSpeedDateQueryController";

let controllerInstance: CoordinatesSpeedDateQueryController;

export async function handler(event: object, context: object): Promise<object> {
	console.debug("Evento Recibido: %o \n Contexto de Ejecución: %o", event, context);
	try {
		console.debug("Resolviendo Dependencias");
		controllerInstance =
			controllerInstance ??
			AppContainer.get<CoordinatesSpeedDateQueryController>(TYPES.CoordinatesSpeedDateQueryController);
		console.debug("Cediendo Ejecucion al Controlador");
		return await controllerInstance.handleEvent(event);
	} catch (error) {
		console.error("Error en la ejecución de la funcion: %o", error);
		throw error;
	} finally {
		console.log("Ejecución Finalizada");
	}
}