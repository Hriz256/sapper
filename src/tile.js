import * as PIXI from "pixi.js";

class Tile {
    constructor({tileSize, textures, x, y, openDispatchCallback, timer}) {
        this.tileSize = tileSize;
        this.textures = [...textures[0], ...textures[1], ...textures[2]];
        this.x = x;
        this.y = y;
        this.state = 0;
        this.openDispatchCallback = openDispatchCallback;
        this.timer = timer;
    }

    create() {
        this.tile = new PIXI.AnimatedSprite(this.textures);

        this.tile.gotoAndStop(this.textures.length - 1);
        this.tile.anchor.set(0);
        this.tile.width = this.tileSize;
        this.tile.height = this.tileSize;
        this.tile.x = this.tileSize * 0.7 + this.tileSize * this.x;
        this.tile.y = this.tileSize * 0.7 * 2 + this.tileSize * (this.y + 2);
        this.tile.interactive = true;
        this.tile.buttonMode = true;
        this.tile.on('pointerdown', this.buttonDown.bind(this))
    }

    buttonDown(e) {
        !this.timer.allowUpdate && this.timer.start();
        !e.data.originalEvent.button ? this.open() : this.setFlag();
    }

    setValue(value) {
        this.state = value;
    }

    setFlag() {
        this.tile.gotoAndStop(this.tile.currentFrame !== 12 ? 12 : 13);
    }

    getValue() {
        return this.state;
    }

    isOpened() {
        return this.tile.currentFrame === this.state;
    }

    open() {
        this.tile.gotoAndStop(this.state);
        this.tile.interactive = false;

        if (this.getValue() === 9 || this.getValue() === 0) {
            this.openDispatchCallback({isMine: !!this.getValue(), tile: this});
        }
    };
}

export {Tile};
