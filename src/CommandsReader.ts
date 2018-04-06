import * as fs from "fs";
import { Mower } from "./Mower";
import { Position } from "./Position";
import { Orientation } from "./Orientation";
import { Instruction } from "./Instruction";

export class CommandsReader {

    private position_max: Position;
    private mowers: Mower[] = []; 
    private mower: Mower;
    private _self = this;

    public getMowers(callback): void{
        // check file for validity
        var self = this._self;
        fs.readFile('./inputs', 'utf8', function(err, data) {  
            if (err) throw err;
            let i = 1;
            const lines = data.toString().split('\n');
            for (let line of lines){
                if(i == 1){
                    self.position_max = self.getCorners(line);
                }else{
                    if(i%2 == 0){
                        self.mower = self.getMower(line);
                    }else{
                        self.mower.Instruction = self.getCommands(line).slice(0);
                        self.mowers.push(self.mower);
                    }
                }
                i++;
            }
            callback(self.mowers);
        });
    }

    private getCorners(data:string): Position {
        // check data
        let position : Position = new Position(parseInt(data.charAt(0)), parseInt(data.charAt(1)));
        return position;
    }

    private getMower(data:string): Mower {
        //check data
        let mower: Mower;
        let orientation:Orientation;
        let position: Position;

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

    private getCommands(data:string): Instruction[] {
        //check data
        let instruction:Instruction[] = [];
        let errors : string;
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
                    break;
            }
        }
        return instruction;
    }

    public get Position_max() :Position{
        return this.position_max;
    }
}