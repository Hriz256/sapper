import {Counter} from "./counter";
import {IMinesCounter} from "../../../typing/interfaces";

class MinesCounter extends Counter implements IMinesCounter {
    update(count: number): void {
        const formatCount = this.format(count);
        const indexesArray = this.getFrameIndex(formatCount);

        Array.from(this.numbers, (number, index) => number.gotoAndStop(indexesArray[index]));
    }

    format(count: number): string {
        // Добавляем нужное число 0 перед числом
        return `${'0'.repeat(3 - `${count}`.length)}${count}`;
    }

    getFrameIndex(formatCount: string): Array<number> {
        // Цифры от 0 до 9 соответствуют названиям фреймов, 10 - '-'
        return Array.from(formatCount, letter => letter !== '-' ? +letter : +10)
    }
}

export {MinesCounter};
