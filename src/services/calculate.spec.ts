import { Test, TestingModule } from '@nestjs/testing';
import { CalculateService } from '../services/calculate.service';
import { IFrame } from '../interfaces/frame.interface';
import { Bowling } from './bowlingEnum';
import { AppController } from '../app/app.controller';

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

function getRandomNr(maxNr: number) {
  const minNR = 0;
  return Math.floor(Math.random() * maxNr + 1) + minNR;
}

describe('renderFrame', () => {
  let app: TestingModule;
  let calculateService: CalculateService;
  let appController: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [CalculateService],
    }).compile();
    calculateService = module.get<CalculateService>(CalculateService);
    appController = module.get<AppController>(AppController);
  });

  it('should render the first frame when the first score is a 4 and second score is a 4', async () => {
    const frame = frameFactory(0); // Create 0th frame
    let score = 4;
    let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
    expect(renderedFrame.score1).toBe(4);
    score = 4;
    renderedFrame = calculateService.renderFrame(renderedFrame, score);
    expect(renderedFrame.score2).toBe(4);
  });

  it('should render the first frame when the first score is a STRIKE', async () => {
    const frame = frameFactory(0); // Create 0th frame
    const score = Bowling.STRIKE;
    let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
    expect(renderedFrame.score1).toBe('');
    expect(renderedFrame.score2).toBe('X');
  });

  it('should render the first frame when the second score makes a SPARE', async () => {
    const frame = frameFactory(0); // Create 0th frame
    frame.score1 = 5;
    const score = 5;
    let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
    expect(renderedFrame.score1).toBe('');
    expect(renderedFrame.score2).toBe('/');
  });

  it('should render the last frame when the first score is a STRIKE', async () => {
    const frame = frameFactory(9); // Create last frame
    const score = Bowling.STRIKE;
    let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
    expect(renderedFrame.score1).toBe('X');
  });

  it('should render the nth frame when the first score is not a STRIKE', async () => {
    for (let i = 0; i < 9; i++) {
      const frame = frameFactory(i); // Create nth frame
      const score = getRandomNr(9); // Create random nr up to 9
      let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
      expect(renderedFrame.frameNr).toBe(i);
      expect(renderedFrame.score1).toBe(score);
    }
  });

  it('should render the last frame when the first score is a STRIKE and the second score is a STRIKE', async () => {
    const frame = frameFactory(9); // Create nth frame
    frame.score1 = 'X';
    const score = Bowling.STRIKE; // Create random nr up to 9
    let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
    expect(renderedFrame.score2).toBe('X');
  });

  it('should render the last frame when the first score and second are STRIKES', async () => {
    const frame = frameFactory(9);
    let score = Bowling.STRIKE;
    let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
    expect(renderedFrame.score1).toBe('X');
    score = Bowling.STRIKE;
    renderedFrame = calculateService.renderFrame(renderedFrame, score);
    expect(renderedFrame.score2).toBe('X');
    score = Bowling.STRIKE;
    renderedFrame = calculateService.renderFrame(renderedFrame, score);
    expect(renderedFrame.score3).toBe('X');
  });

  it('should render the last frame when the first score is a STRIKE, the second a 5 and the third a 5', async () => {
    const frame = frameFactory(9);
    let score = Bowling.STRIKE;
    let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
    expect(renderedFrame.score1).toBe('X');
    score = 5;
    renderedFrame = calculateService.renderFrame(renderedFrame, score);
    expect(renderedFrame.score2).toBe(5);
    score = 5;
    renderedFrame = calculateService.renderFrame(renderedFrame, score);
    expect(renderedFrame.score3).toBe(5);
  });
});
