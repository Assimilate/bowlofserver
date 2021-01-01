import { Test, TestingModule } from '@nestjs/testing';
import { CalculateService } from '../services/calculate.service';
import { IFrame } from '../interfaces/frame.interface';
import { Bowling } from './bowlingEnum';

function scoreBoardFactory(): Array<IFrame> {
  return [
    {
      frameNr: 0,
      score1: null,
      score2: null,
      totalScore: null,
    },
    {
      frameNr: 1,
      score1: null,
      score2: null,
      totalScore: null,
    },
    {
      frameNr: 2,
      score1: null,
      score2: null,
      totalScore: null,
    },
    {
      frameNr: 3,
      score1: null,
      score2: null,
      totalScore: null,
    },
    {
      frameNr: 4,
      score1: null,
      score2: null,
      totalScore: null,
    },
    {
      frameNr: 5,
      score1: null,
      score2: null,
      totalScore: null,
    },
    {
      frameNr: 6,
      score1: null,
      score2: null,
      totalScore: null,
    },
    {
      frameNr: 7,
      score1: null,
      score2: null,
      totalScore: null,
    },
    {
      frameNr: 8,
      score1: null,
      score2: null,
      totalScore: null,
    },
    {
      frameNr: 9,
      score1: null,
      score2: null,
      score3: null,
      totalScore: null,
    },
  ];
}

function frameFactory(frameNr: number): IFrame {
  return {
    frameNr: frameNr,
    score1: null,
    score2: null,
    score3: null,
    totalScore: null,
  };
}

describe('calculateFrame', () => {
  let app: TestingModule;
  let calculateService: CalculateService;

  it('should render the first frame when the first score is a STRIKE', async () => {
    const frame = frameFactory(0);
    const score = Bowling.STRIKE;
    let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
    expect(renderedFrame.score1).toBe('');
    expect(renderedFrame.score2).toBe('X');
  });
});
