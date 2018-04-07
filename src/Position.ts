
export class Position {

    constructor(private x: number, private y: number) { }

    public get X() {
        return this.x;
    }
    public get Y() {
        return this.y;
    }
    public set X(value: number) {
        this.x = value;
    }
    public set Y(value: number) {
        this.y = value;
    }
}