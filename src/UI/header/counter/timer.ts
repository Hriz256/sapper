import {Counter} from "./counter";
import {ITimer} from "../../../typing/interfaces";

class Timer extends Counter implements ITimer {
    currentDate: number;
    date: number;
    allowUpdate: boolean;
    isStart: boolean; // Нужно для того, чтобы предотвратить запуск таймера после скрытия меню, если таймер не запущен

    constructor(args) {
        super(args);

        this.currentDate = 0;
        this.date = 0;
        this.allowUpdate = false;
        this.isStart = false;
    }

    update(): void {
        const newDate = Math.floor(Date.now() / 1000);

        if (newDate > this.currentDate && this.allowUpdate) {
            this.currentDate = newDate;
            this.date++;
        }

        // Из строки делаем массив и переворачиваем его, чтобы цифры обновлялись справа налево
        const stringDate = `${this.date}`.split('').reverse();

        this.allowUpdate && Array.from(this.numbers, (number, index) => {
            number.gotoAndStop(+stringDate[index] || 0)
        });
    }

    reset(): void {
        this.stop();
        this.isStart = false;
        Array.from(this.numbers, number => number.gotoAndStop(0));
    }

    stop(): void {
        this.allowUpdate = false;
    }

    continue(): void {
        if (this.isStart) {
            this.allowUpdate = true;
        }
    }

    start(): void {
        this.isStart = true;

        if (!this.allowUpdate) {
            this.currentDate = Math.floor(Date.now() / 1000);
            this.date = 0;
            this.allowUpdate = true;
        }
    }
}

export {Timer};
