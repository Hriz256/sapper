import {Counter} from "./counter";
import {ITimer} from "../../../typing/interfaces";

class Timer extends Counter implements ITimer {
    date: number;
    allowUpdate: boolean;

    constructor(args) {
        super(args);

        this.date = Date.now();
        this.allowUpdate = false;
    }

    update(): void {
        const newDate = `${Math.floor((Date.now() - this.date) / 1000)}`.split('').reverse();

        this.allowUpdate && Array.from(this.numbers, (number, index) => {
            number.gotoAndStop(+newDate[index] || 0)
        });
    }

    reset(): void {
        this.stop();
        Array.from(this.numbers, number => number.gotoAndStop(0));
    }

    stop(): void {
        this.allowUpdate = false;
    }

    continue(): void {
        this.allowUpdate = true;
    }

    start(): void {
        if (!this.allowUpdate) {
            this.date = Date.now();
            this.continue();
        }
    }
}

export {Timer};
