import * as fs from "fs";
import { Mower } from "./Mower";
import { Position } from "./Position";
import { Orientation } from "./Orientation";
import { Instruction } from "./Instruction";

export class CommandsReader {

    public getMowers(callback): void {
        // check file for validity
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

    private getCorners(data: string): Position {
        // check data
        let corner: Position = new Position(parseInt(data.charAt(0)), parseInt(data.charAt(1)));
        return corner;
    }

    private getMower(data: string): Mower {
        //check data
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

    private getCommands(data: string): Instruction[] {
        //check data
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