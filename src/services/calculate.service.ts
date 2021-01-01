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
    const renderedFrame: IFrame = Object.assign({}, frame);
    const IS_FIRST_SCORE = renderedFrame.score1 === null;
    const IS_SECOND_SCORE =
      renderedFrame.score1 !== null && renderedFrame.score2 === null;
    const IS_THIRD_SCORE =
      renderedFrame.score1 !== null &&
      renderedFrame.score2 !== null &&
      renderedFrame.score3 === null;
    const SPARE =
      (renderedFrame.score1 as number) + score === Bowling.MAX_SCORE;
    const STRIKE = score === Bowling.STRIKE;
    const LAST_FRAME = renderedFrame.frameNr === 9;

    if (IS_FIRST_SCORE) {
      if (STRIKE) {
        if (LAST_FRAME) {
          renderedFrame.score1 = 'X';
        } else {
          renderedFrame.score1 = '';
          renderedFrame.score2 = 'X';
        }
      } else {
        renderedFrame.score1 = score;
      }
    } else if (IS_SECOND_SCORE) {
      if (STRIKE) {
        renderedFrame.score2 = 'X';
      } else if (SPARE) {
        renderedFrame.score1 = '';
        renderedFrame.score2 = '/';
      } else {
        renderedFrame.score2 = score;
      }
    } else if (IS_THIRD_SCORE) {
      if (STRIKE) {
        renderedFrame.score3 = 'X';
      } else {
        renderedFrame.score3 = score;
      }
    }

    return renderedFrame;
  }
}
