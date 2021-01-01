import { Injectable } from '@nestjs/common';
import { IFrame } from '../interfaces/frame.interface';
import { Bowling } from './bowlingEnum';

@Injectable()
export class CalculateService {
  public calculateScore(history: Array<IFrame>, score: number): Array<IFrame> {
    let scoreBoard: Array<IFrame> = [];
    return scoreBoard;
  }
  public renderFrame(frame: IFrame, score: number): IFrame {
    const renderedFrame: IFrame = {
      frameNr: 0,
      score1: null,
      score2: null,
      totalScore: null,
    };
    return renderedFrame;
  }
}
