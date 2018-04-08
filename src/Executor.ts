import { Mower } from './Mower';
import { Point } from './Point';
import { Orientation } from './Orientation';
import { Instruction } from './Instruction';

export class Executor {

    /**
    * Execute the instructions and move the mowers
    * @param (Mowers, Corner)
    * 
    */
    public run(mowers: Array<Mower>, corner: Point): void {
        let instructions: Array<Instruction>;
        let instruction: Instruction;
        let mower: Mower;
        let self = this;
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
    }

    /**
    * Move the mower to the Right, Left or Forward
    * @param (Mower, Instruction, Corner)
    * @returns Mower
    */
    private move(mower: Mower, instruction: Instruction, corner: Point): Mower {
        if (instruction === Instruction.RIGHT) {
            this.moveRight(mower);
        } else if (instruction === Instruction.LEFT) {
            this.moveLeft(mower);
        } else if (instruction === Instruction.FORWARD) {
            this.moveForward(mower, corner);
        } else {
            //error
        } return mower;
    }

    /**
    * Move the mower to the LEFT
    * @param Mower
    * @returns Mower
    */
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

    /**
    * Move the mower to the RIGHT
    * @param Mower
    * @returns Mower
    */
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

    /**
    * Move the mower FORWARD
    * @param (Mower , Corner)
    * @returns Mower
    */
    private moveForward(mower: Mower, corner: Point): Mower {
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

    /**
    * Check if the mower does not exceed the limits when moving X Forward
    * @param (Mower , Corner)
    * @returns True if it's OK to move X Farward
    */
    private checkMovingXForward(mower: Mower, corner: Point): boolean {
        if ((mower.Position.X + 1) > corner.X) return false;
        else return true;
    }

    /**
    * Check if the mower does not exceed the limits when moving X Backward
    * @param (Mower , Corner)
    * @returns True if it's OK to move X Backward
    */
    private checkMovingXBackward(mower: Mower): boolean {
        if (mower.Position.X - 1 < 0) return false;
        else return true;
    }

   /**
    * Check if the mower does not exceed the limits when moving Y Forward
    * @param (Mower , Corner)
    * @returns True if it's OK to move Y Forward
    */
    private checkMovingYForward(mower: Mower, corner: Point): boolean {
        if ((mower.Position.Y + 1) > corner.Y) return false;
        else return true;
    }

    /**
    * Check if the mower does not exceed the limits when moving Y Backward
    * @param (Mower , Corner)
    * @returns True if it's OK to move Y Backward
    */
    private checkMovingYBackward(mower: Mower): boolean {
        if (mower.Position.Y - 1 < 0) return false;
        else return true;
    }

    /**
    * Check collision with other mowers
    * @param Mower
    * @returns True if no collision detected
    **/
    private checkCollision(mower: Mower): boolean {
        return true;
    }
}