import { Mower } from './Mower';
import { Position } from './Position';
import { Orientation } from './Orientation';
import { Instruction } from './Instruction';
import { CommandsReader } from './CommandsReader';


//redandency in Y-1, X+1, .. and Position_max
export class Main {
    private _self = this;
    public main(): void {
        var self = this._self;
        let commandsReader: CommandsReader = new CommandsReader();
        commandsReader.getMowers(function(value: Mower[]){
            let mowers: Mower[]; 
            mowers = value;
            let mower: Mower;
            let instruction: Instruction;
            for (let i = 0; i < mowers.length; i++) {
                mower = mowers[i];
                for (let j = 0; j < mower.Instruction.length; j++) {
                    instruction = mower.Instruction[j];
                    mower = self.move(mower, instruction, commandsReader.Position_max);
                }
                console.log('X : ' + mower.Position.X+ ' Y : '+mower.Position.Y+' Orientation : '+ mower.Orientation);
            }
        });
    }

    public move(mower: Mower, instruction: Instruction, position_max:Position): Mower{
        // verify if no other mower in the next position 
        // if yes throw new exception
        if(instruction == Instruction.RIGHT){
            this.moveRight(mower);
        }else if(instruction == Instruction.LEFT){
                    this.moveLeft(mower);
              }else if(instruction == Instruction.FORWARD){
                         this.moveForward(mower, position_max);
                    }        
        
        return mower;
    }

    public moveLeft(mower: Mower): Mower{
        if(mower.Orientation === Orientation.NORD){
            mower.Orientation = Orientation.WEST;
        }else if(mower.Orientation === Orientation.SUD){
                    mower.Orientation = Orientation.EST;
              }else if(mower.Orientation === Orientation.WEST){
                        mower.Orientation = Orientation.SUD;
                    }else if(mower.Orientation === Orientation.EST){
                                mower.Orientation = Orientation.NORD;
                          }
        return mower;
    }

    public moveRight(mower: Mower): Mower{
        if(mower.Orientation === Orientation.NORD){
            mower.Orientation = Orientation.EST;
        }else if(mower.Orientation === Orientation.SUD){
                    mower.Orientation = Orientation.WEST;
              }else if(mower.Orientation === Orientation.WEST){
                        mower.Orientation = Orientation.NORD;
                    }else if(mower.Orientation === Orientation.EST){
                                mower.Orientation = Orientation.SUD;
                          }
        return mower;
    }

    public moveForward(mower: Mower, position_max:Position): Mower{
        if(mower.Orientation === Orientation.NORD){
            if(this.checkMovingXForward(mower, position_max))
                mower.Position.Y = mower.Position.Y + 1;
        }else if(mower.Orientation === Orientation.SUD){
                    if(this.checkMovingYBackward(mower))
                        mower.Position.Y = mower.Position.Y - 1;
              }else if(mower.Orientation === Orientation.WEST){
                        if(this.checkMovingXBackward(mower))
                            mower.Position.X = mower.Position.X - 1;
                    }else if(mower.Orientation === Orientation.EST){
                                if(this.checkMovingYForward(mower, position_max))
                                    mower.Position.X = mower.Position.X + 1;
                          }
        return mower;
    }
    
    public checkMovingXForward(mower: Mower, position_max:Position): boolean{
        if((mower.Position.X + 1) > position_max.X)
            return false;
        else
            return true;
    }
    public checkMovingXBackward(mower: Mower): boolean{
        if(mower.Position.X - 1 < 0)
            return false;
        else
            return true;
    }
    public checkMovingYForward(mower: Mower, position_max:Position): boolean{
        if((mower.Position.Y + 1) > position_max.Y)
            return false;
        else
            return true;
    }
    public checkMovingYBackward(mower: Mower): boolean{
        if(mower.Position.Y - 1 < 0)
            return false;
        else
            return true;
    }
    public checkCollision(mower: Mower): boolean{
        return true;
    }

}