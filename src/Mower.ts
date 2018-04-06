import { Orientation } from './Orientation';
import { Position } from './Position';
import { Instruction } from './Instruction';

export class Mower {

    private instructions :Instruction[];
    constructor(private position:Position, private orientation:Orientation) { } 

    /**
     * Instruction
     */
    public get Instruction(): Instruction[] {
        return this.instructions;
    }
    public get Position(){
        return this.position;
    }
    public get Orientation(){
        return this.orientation;
    }

    public set Position(value:Position){
        this.position = value;
    }
    public set Orientation(value:Orientation){
        this.orientation = value;
    }
    public set Instruction(value:Instruction[]){
        this.instructions = value;
    }
}