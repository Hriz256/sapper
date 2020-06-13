import {IMediator, ISubscriber} from "../typing/interfaces";
import {ActionData} from "../typing/types";

class Subscriber implements ISubscriber {
    mediator: IMediator | null;

    constructor() {
        this.mediator = null;
    }

    dispatch(action: string, value?: any): void {
        this[action](value);
    }

    sendAction(data: ActionData): void {
        this.mediator.notify(data)
    }

    setMediator(mediator: IMediator): void {
        this.mediator = mediator;
    }
}

export {Subscriber};
