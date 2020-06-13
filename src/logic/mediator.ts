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
        if (to) {
            this.subscribers[to].dispatch(action, value)
        } else {
            const subscribersWithoutMeArray = Object.values(this.subscribers).filter(subscriber => subscriber !== this);

            Array.from(subscribersWithoutMeArray, subscriber => subscriber.dispatch(action, value))
        }
    }
}

const mediator = new Mediator();

export {mediator};
