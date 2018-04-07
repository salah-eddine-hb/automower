import * as fs from "fs";
import { Mower } from "./Mower";
import { Position } from "./Position";
import { Orientation } from "./Orientation";
import { Instruction } from "./Instruction";

export class CommandsReader {

    /**
    * Get an array of mowers from the file
    * @param callback - A callback that get the mowers for further processing
    * @returns Array of Mower.
    */
    public getMowers(callback): void {
        let self = this;
        fs.readFile('./inputs', 'utf8', function (err, data) {
            if (err) throw err;
            let mowers: Mower[] = [];
            let corner: Position;
            let mower: Mower;
            let index = 1;
            const lines = data.toString().split('\n');
            for (let line of lines) {
                if (index == 1) corner = self.getCorners(line);
                else {
                    if (index % 2 == 0) mower = self.getMower(line);
                    else {
                        mower.Instructions = self.getCommands(line).slice(0);
                        mowers.push(mower);
                    }
                } index++;
            } callback(mowers, corner);
        });
    }

    /**
    * Get upper right corner of the lawn and the bottom left
    * @param data - String that contain corners as "XY" form
    * @returns A Position object representing the corners.
    */
    private getCorners(data: string): Position {
        let corner: Position = new Position(parseInt(data.charAt(0)), parseInt(data.charAt(1)));
        return corner;
    }

    /**
    * Get the starting position and orientation as "XYO" without space
    * @param data - String that contain mower position and orientation as "XYO" form 
    * @returns New Mower object
    */
    private getMower(data: string): Mower {
        let mower: Mower;
        let position: Position;
        let orientation: Orientation;

        position = new Position(parseInt(data.charAt(0)), parseInt(data.charAt(1)));
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
    private getCommands(data: string): Instruction[] {
        let instruction: Instruction[] = [];
        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            switch (element) {
                case 'G':
                    instruction.push(Instruction.LEFT);
                    break;
                case 'D':
                    instruction.push(Instruction.RIGHT);
                    break;
                case 'A':
                    instruction.push(Instruction.FORWARD);
                    break;
                default:
                    //error
                    break;
            }
        } return instruction;
    }

}