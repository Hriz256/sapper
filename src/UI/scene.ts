import {Application, LoaderResource, Container} from 'pixi.js'
import {ConfigType} from "../typing/types";
import {createHeader} from "./header/header";
import {createMenu} from "./menu/menu";
import {createBody} from "./main/main";

const config: ConfigType = {
    tileSize: 40,
    fieldWidth: 9,
    fieldHeight: 9,
    mineQuantity: 10
};

const centerContainer = (app: Application, container: Container): void => {
    container.position.x = app.view.width / 2;
    container.position.y = app.view.height / 2;

    container.pivot.x = container.width / 2;
    container.pivot.y = container.height / 2;
};

const resize = (app: Application, container: Container): void => {
    app.view.width = window.innerWidth;
    app.view.height = window.innerHeight;

    centerContainer(app, container)
};

const createScene = (app: Application, resources: Partial<Record<string, LoaderResource>>): void => {
    const mainContainer = new Container();

    const {headerContainer, timer} = createHeader(config, resources); // Создаём шапку (2 счётчика и кнопку)
    const menuContainer = createMenu(config); // Создаём интерфейс меню
    const bodyContainer = createBody(config, resources); // Создаём игровое поле

    mainContainer.addChild(bodyContainer, headerContainer, menuContainer);

    app.stage.addChild(mainContainer);
    app.ticker.add(() => timer.update()); // Обновляем значение таймера

    // центрируем контейнер при создании и каждом ресайзе экрана

    centerContainer(app, mainContainer);
    window.addEventListener('resize', () => resize(app, mainContainer))
};

export {createScene};
