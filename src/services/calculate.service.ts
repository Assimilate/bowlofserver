import { Injectable } from '@nestjs/common';
import { IFrame } from '../interfaces/frame.interface';
import { BowlingRender, BowlingScore } from './bowling.enum';

@Injectable()
export class CalculateService {
  public calculateScore(history: Array<IFrame>): Array<IFrame> {
    let scoreBoardClone = Object.assign([], history);
    for (const [index, frame] of scoreBoardClone.entries()) {
      let previousIndex = index - 1;
      let nextIndex = index + 1;
      let previousFrame;
      let nextFrame;

      if (previousIndex >= 0) {
        previousFrame = history[index - 1];
      }
      if (nextIndex < scoreBoardClone.length) {
        nextFrame = history[index + 1];
      }

      if (
        frame.score2 === BowlingScore.STRIKE ||
        frame.score1 === BowlingScore.STRIKE
      ) {
        let totalScore = frame.score1 + frame.score2;
        if (frame.score3) {
          totalScore += frame.score3;
        }
        if (previousFrame) {
          totalScore += previousFrame.totalScore;
        }
        if (nextFrame) {
          if (
            typeof nextFrame.score1 === 'number' &&
            typeof nextFrame.score2 === 'number'
          ) {
            totalScore += nextFrame.score1 + nextFrame.score2;
          }
        }
        frame.totalScore = totalScore;
      } else if (frame.score1 + frame.score2 === BowlingScore.SPARE) {
        let totalScore = frame.score1 + frame.score2;
        if (previousFrame) {
          totalScore += previousFrame.totalScore;
        }
        if (nextFrame) {
          if (typeof nextFrame.score1 === 'number') {
            totalScore += nextFrame.score1;
          }
        }
        frame.totalScore = totalScore;
      } else {
        frame.totalScore = frame.score1 + frame.score2;
      }
    }
    return scoreBoardClone;
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
      (renderedFrame.score1 as number) + score === BowlingScore.MAX_SCORE;
    const STRIKE = score === BowlingScore.STRIKE;
    const LAST_FRAME = renderedFrame.frameNr === 9;

    if (IS_FIRST_SCORE) {
      if (STRIKE) {
        if (LAST_FRAME) {
          renderedFrame.score1 = score;
          renderedFrame.score1Render = 'X';
        } else {
          renderedFrame.score1 = score;
          renderedFrame.score1Render = '';
          renderedFrame.score2 = 0;
          renderedFrame.score2Render = 'X';
        }
      } else {
        renderedFrame.score1 = score;
        renderedFrame.score1Render = score.toString();
      }
    } else if (IS_SECOND_SCORE) {
      if (STRIKE) {
        renderedFrame.score2 = score;
        renderedFrame.score2Render = 'X';
      } else if (SPARE) {
        renderedFrame.score1 = frame.score1;
        renderedFrame.score1Render = '';
        renderedFrame.score2 = score;
        renderedFrame.score2Render = '/';
      } else {
        renderedFrame.score2 = score;
        renderedFrame.score2Render = score.toString();
      }
    } else if (IS_THIRD_SCORE) {
      if (renderedFrame.score1 === BowlingScore.STRIKE) {
        if (STRIKE) {
          renderedFrame.score3 = 10;
          renderedFrame.score3Render = 'X';
        } else {
          renderedFrame.score3 = score;
          renderedFrame.score3Render = score.toString();
        }
      }
    }

    return renderedFrame;
  }
}
