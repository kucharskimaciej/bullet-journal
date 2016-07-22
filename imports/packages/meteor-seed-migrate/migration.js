export const DIRECTION = {
    UP: 'up',
    DOWN: 'down'
};

export default class Migration {
    constructor() {

    }

    up() {
        throw new Error('up: not implemented');
    }

    down() {
        throw new Error('down: not implemented');
    }

    change(direction) {
        if (direction === DIRECTION.UP) {
            this.up();
        } else if (direction === DIRECTION.DOWN) {
            this.down();
        }
    }
}