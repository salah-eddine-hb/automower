import { Mower } from './Mower';
import { Position } from './Position';
import { Orientation } from './Orientation';
import { Instruction } from './Instruction';
import { CommandsReader } from './CommandsReader';

export class Main {

    public main(): void {
        let self = this;
        let commandsReader = new CommandsReader();
        commandsReader.getMowers(function (mowers: Mower[], corner: Position) {
            let instructions: Instruction[];
            let instruction: Instruction;
            let mower: Mower;
            for (let i = 0; i < mowers.length; i++) {
                mower = mowers[i];
                instructions = mower.Instructions;
                for (let j = 0; j < instructions.length; j++) {
                    instruction = instructions[j];
                    mower = self.move(mower, instruction, corner);
                }
                console.log('X : ' + mower.Position.X);
                console.log('Y : ' + mower.Position.Y);
                console.log('Orientation : ' + mower.Orientation);
                console.log('##################################');
            }
        });
    }

    private move(mower: Mower, instruction: Instruction, corner: Position): Mower {
        if (instruction == Instruction.RIGHT) {
            this.moveRight(mower);
        } else if (instruction == Instruction.LEFT) {
            this.moveLeft(mower);
        } else if (instruction == Instruction.FORWARD) {
            this.moveForward(mower, corner);
        } else {
            //error
        } return mower;
    }

    private moveLeft(mower: Mower): Mower {
        if (mower.Orientation === Orientation.NORD) {
            mower.Orientation = Orientation.WEST;
        } else if (mower.Orientation === Orientation.SUD) {
            mower.Orientation = Orientation.EST;
        } else if (mower.Orientation === Orientation.WEST) {
            mower.Orientation = Orientation.SUD;
        } else if (mower.Orientation === Orientation.EST) {
            mower.Orientation = Orientation.NORD;
        } else {
            //error
        } return mower;
    }

    private moveRight(mower: Mower): Mower {
        if (mower.Orientation === Orientation.NORD) {
            mower.Orientation = Orientation.EST;
        } else if (mower.Orientation === Orientation.SUD) {
            mower.Orientation = Orientation.WEST;
        } else if (mower.Orientation === Orientation.WEST) {
            mower.Orientation = Orientation.NORD;
        } else if (mower.Orientation === Orientation.EST) {
            mower.Orientation = Orientation.SUD;
        } else {
            //error
        } return mower;
    }

    private moveForward(mower: Mower, corner: Position): Mower {
        if (mower.Orientation === Orientation.NORD) {
            if (this.checkMovingXForward(mower, corner))
                mower.Position.Y = mower.Position.Y + 1;
        } else if (mower.Orientation === Orientation.SUD) {
            if (this.checkMovingYBackward(mower))
                mower.Position.Y = mower.Position.Y - 1;
        } else if (mower.Orientation === Orientation.WEST) {
            if (this.checkMovingXBackward(mower))
                mower.Position.X = mower.Position.X - 1;
        } else if (mower.Orientation === Orientation.EST) {
            if (this.checkMovingYForward(mower, corner))
                mower.Position.X = mower.Position.X + 1;
        } else {
            //error
        } return mower;
    }

    private checkMovingXForward(mower: Mower, corner: Position): boolean {
        if ((mower.Position.X + 1) > corner.X) return false;
        else return true;
    }
    private checkMovingXBackward(mower: Mower): boolean {
        if (mower.Position.X - 1 < 0) return false;
        else return true;
    }
    private checkMovingYForward(mower: Mower, corner: Position): boolean {
        if ((mower.Position.Y + 1) > corner.Y) return false;
        else return true;
    }
    private checkMovingYBackward(mower: Mower): boolean {
        if (mower.Position.Y - 1 < 0) return false;
        else return true;
    }
    private checkCollision(mower: Mower): boolean {
        return true;
    }
}