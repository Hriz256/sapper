import {IMediator, ISubscriber} from "../typing/interfaces";
import {ActionData} from "../typing/types";

class Mediator implements IMediator {
    subscribers: object;

    constructor() {
        this.subscribers = {};
    }

    register(subscriber: ISubscriber, name: string): void {
        this.subscribers[name] = subscriber;

        subscriber.setMediator(this);
    }

    notify({action, to, value}: ActionData): void {
        this.subscribers[to].dispatch(action, value)
    }
}

const mediator = new Mediator();

export {mediator};
