import {Button} from "./button";
import {IStart} from "../../../typing/interfaces";
import {Container} from "pixi.js";

class Start extends Button implements IStart {
    set(): Container {
        const container = this.create();

        this.button.on('pointerup', () => {
            container.visible = !container.visible;

            this.sendAction({action: 'setInitFrame', to: 'smile'});
            this.sendAction({action: 'restart', to: 'smile'});
        });

        return container;
    }
}

export {Start};
