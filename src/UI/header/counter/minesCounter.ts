import {Counter} from "./counter";
import {IMinesCounter} from "../../../typing/interfaces";

class MinesCounter extends Counter implements IMinesCounter {
    update(count: number): void {
        const formatCount = this.format(count);
        const indexesArray = this.getFrameIndex(formatCount);

        Array.from(this.numbers, (number, index) => number.gotoAndStop(indexesArray[index]));
    }

    format(count: number): string {
        return `${'0'.repeat(3 - `${count}`.length)}${count}`;
    }

    getFrameIndex(formatCount: string): Array<number> {
        return Array.from(formatCount, letter => letter !== '-' ? +letter : +10)
    }
}

export {MinesCounter};
