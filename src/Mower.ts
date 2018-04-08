import { Position } from './Position';
import { Orientation } from './Orientation';
import { Instruction } from './Instruction';

export class Mower {

    private instructions: Instruction[];

    constructor(private position: Position, private orientation: Orientation) { }

    public get Instructions(): Array<Instruction> {
        return this.instructions;
    }
    public get Position() {
        return this.position;
    }
    public get Orientation() {
        return this.orientation;
    }
    public set Position(value: Position) {
        this.position = value;
    }
    public set Orientation(value: Orientation) {
        this.orientation = value;
    }
    public set Instructions(value: Instruction[]) {
        this.instructions = value;
    }
}