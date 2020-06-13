import {Field} from "./field";
import {Container, LoaderResource} from "pixi.js";
import {createFrame} from "./frame";
import {mediator} from "../../logic/mediator";
import {ConfigType} from "../../typing/types";

const createBody = (config: ConfigType, resources: Partial<Record<string, LoaderResource>>): Container => {
    const bodyContainer = new Container();

    const field = new Field({
        textures: {
            ...resources.numbersSheet.textures,
            ...resources.minesSheet.textures,
            ...resources.tilesSheet.textures
        },
        tileSize: config.tileSize,
        fieldHeight: config.fieldHeight,
        fieldWidth: config.fieldWidth,
        mineQuantity: config.mineQuantity
    });

    const frameContainer: Container = createFrame({
        textures: resources.wallsSheet.textures,
        tileSize: config.tileSize,
        fieldWidth: config.fieldWidth,
        fieldHeight: config.fieldHeight
    });

    mediator.register(field, 'field');

    bodyContainer.addChild(frameContainer, field.create());

    return bodyContainer;
};

export {createBody};
