import * as fs from "fs";
import { Mower } from "./Mower";
import { Point } from "./Point";
import { Executor } from "./Executor";
import { Orientation } from "./Orientation";
import { Instruction } from "./Instruction";

export class Loader {

    /**
    * Load mowers from the file
    * and run the Executor to execute instructions
    */
    public loadMowers(): void {
        let self = this;
        let executor = new Executor();
        fs.readFile('inputs', 'utf8', function (err, data) {
            if (err) throw err;
            const lines = data.toString().split('\n');
            const mowers: Array<Mower> = [];
            let corner: Point;
            let mower: Mower;
            let index = 1;
            for (let line of lines) {
                if (index == 1) corner = self.getCorners(line);
                else {
                    if (index % 2 == 0) mower = self.getMower(line);
                    else {
                        mower.Instructions = self.getCommands(line);
                        mowers.push(mower);
                    }
                } index++;
            } executor.run(mowers, corner);
        });
    }

    /**
    * Get upper right corner of the lawn and the bottom left
    * @param data - String that contain corners as "XY" form
    * @returns A Position object representing the corners.
    */
    private getCorners(data: string): Point {
        let corner: Point = new Point(parseInt(data.charAt(0)), parseInt(data.charAt(1)));
        return corner;
    }

    /**
    * Get the starting position and orientation as "XYO" without space
    * @param data - String that contain mower position and orientation as "XYO" form 
    * @returns New Mower object
    */
    private getMower(data: string): Mower {
        let mower: Mower;
        let position: Point;
        let orientation: Orientation;

        position = new Point(parseInt(data.charAt(0)), parseInt(data.charAt(1)));
        switch (data.charAt(2)) {
            case 'N':
                orientation = Orientation.NORD;
                break;
            case 'S':
                orientation = Orientation.SUD;
                break;
            case 'E':
                orientation = Orientation.EST;
                break;
            case 'W':
                orientation = Orientation.WEST;
                break;
            default:
                break;
        }
        mower = new Mower(position, orientation);
        return mower;
    }

    /**
    * Get Instructions to the mower to go throughout the lawn.
    * @param data - String that contain all instructions without space (GADDAAGD)
    * @returns New Instruction object
    */
    private getCommands(data: string): Array<Instruction> {
        let instructions: Array<Instruction> = [];
        for (let index = 0; index < data.length; index++) {
            const instruction = data[index];
            switch (instruction) {
                case 'G':
                    instructions.push(Instruction.LEFT);
                    break;
                case 'D':
                    instructions.push(Instruction.RIGHT);
                    break;
                case 'A':
                    instructions.push(Instruction.FORWARD);
                    break;
                default:
                    //error
                    break;
            }
        } return instructions;
    }

}