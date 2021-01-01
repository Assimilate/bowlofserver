import { Test, TestingModule } from '@nestjs/testing';
import { CalculateService } from '../services/calculate.service';
import { IFrame } from '../interfaces/frame.interface';
import { BowlingRender, BowlingScore, renderToScore } from './bowling.enum';
import { AppController } from '../app/app.controller';

function scoreBoardFactory(): Array<IFrame> {
  return [
    {
      frameNr: 0,
      score1: null,
      score1Render: '',
      score2: null,
      score2Render: '',
      totalScore: null,
    },
    {
      frameNr: 1,
      score1: null,
      score1Render: '',
      score2: null,
      score2Render: '',
      totalScore: null,
    },
    {
      frameNr: 2,
      score1: null,
      score1Render: '',
      score2: null,
      score2Render: '',
      totalScore: null,
    },
    {
      frameNr: 3,
      score1: null,
      score1Render: '',
      score2: null,
      score2Render: '',
      totalScore: null,
    },
    {
      frameNr: 4,
      score1: null,
      score1Render: '',
      score2: null,
      score2Render: '',
      totalScore: null,
    },
    {
      frameNr: 5,
      score1: null,
      score1Render: '',
      score2: null,
      score2Render: '',
      totalScore: null,
    },
    {
      frameNr: 6,
      score1: null,
      score1Render: '',
      score2: null,
      score2Render: '',
      totalScore: null,
    },
    {
      frameNr: 7,
      score1: null,
      score1Render: '',
      score2: null,
      score2Render: '',
      totalScore: null,
    },
    {
      frameNr: 8,
      score1: null,
      score1Render: '',
      score2: null,
      score2Render: '',
      totalScore: null,
    },
    {
      frameNr: 9,
      score1: null,
      score1Render: '',
      score2: null,
      score2Render: '',
      score3: null,
      score3Render: '',
      totalScore: null,
    },
  ];
}

function frameFactory(frameNr: number): IFrame {
  return {
    frameNr: frameNr,
    score1: null,
    score1Render: '',
    score2: null,
    score2Render: '',
    score3: null,
    score3Render: '',
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
    expect(renderedFrame.score1Render).toBe('4');
    score = 4;
    renderedFrame = calculateService.renderFrame(renderedFrame, score);
    expect(renderedFrame.score2Render).toBe('4');
  });

  it('should render the first frame when the first score is a STRIKE', async () => {
    const frame = frameFactory(0); // Create 0th frame
    const score = BowlingScore.STRIKE;
    let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
    expect(renderedFrame.score1Render).toBe('');
    expect(renderedFrame.score2Render).toBe('X');
  });

  it('should render the first frame when the second score makes a SPARE', async () => {
    const frame = frameFactory(0); // Create 0th frame
    frame.score1 = 5;
    const score = 5;
    let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
    expect(renderedFrame.score1Render).toBe('');
    expect(renderedFrame.score2Render).toBe('/');
  });

  it('should render the last frame when the first score is a STRIKE', async () => {
    const frame = frameFactory(9); // Create last frame
    const score = BowlingScore.STRIKE;
    let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
    expect(renderedFrame.score1Render).toBe('X');
  });

  it('should render the nth frame when the first score is not a STRIKE', async () => {
    for (let i = 0; i < 9; i++) {
      const frame = frameFactory(i); // Create nth frame
      const score = getRandomNr(9); // Create random nr up to 9
      let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
      expect(renderedFrame.frameNr).toBe(i);
      expect(renderedFrame.score1Render).toBe(score.toString());
    }
  });

  it('should render the last frame when the first score is a STRIKE and the second score is a STRIKE', async () => {
    const frame = frameFactory(9); // Create nth frame
    frame.score1 = 'X';
    const score = BowlingScore.STRIKE; // Create random nr up to 9
    let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
    expect(renderedFrame.score2Render).toBe('X');
  });

  it('should render the last frame when the first score and second are STRIKES', async () => {
    const frame = frameFactory(9);
    let score = BowlingScore.STRIKE;
    let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
    expect(renderedFrame.score1Render).toBe('X');
    score = BowlingScore.STRIKE;
    renderedFrame = calculateService.renderFrame(renderedFrame, score);
    expect(renderedFrame.score2Render).toBe('X');
    score = BowlingScore.STRIKE;
    renderedFrame = calculateService.renderFrame(renderedFrame, score);
    expect(renderedFrame.score3Render).toBe('X');
  });

  it('should render the last frame when the first score is a STRIKE, the second a 5 and the third a 5', async () => {
    const frame = frameFactory(9);
    let score = BowlingScore.STRIKE;
    let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
    expect(renderedFrame.score1Render).toBe('X');
    score = 5;
    renderedFrame = calculateService.renderFrame(renderedFrame, score);
    expect(renderedFrame.score2Render).toBe('5');
    score = 5;
    renderedFrame = calculateService.renderFrame(renderedFrame, score);
    expect(renderedFrame.score3Render).toBe('5');
  });
  it('should render the last frame when the first score is a 5, the second a 5 and on the third score it should not render anything', async () => {
    const frame = frameFactory(9);
    let score = 5;
    let renderedFrame: IFrame = calculateService.renderFrame(frame, score);
    expect(renderedFrame.score1Render).toBe('5');
    score = 5;
    renderedFrame = calculateService.renderFrame(renderedFrame, score);
    expect(renderedFrame.score2Render).toBe('/');
    score = 5;
    renderedFrame = calculateService.renderFrame(renderedFrame, score);
    expect(renderedFrame.score3Render).toBe('');
  });
});

describe('calculateScore', () => {
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

  it('should calculate the score board when the second out of three frames has a first score of strike', async () => {
    let scoreBoard = scoreBoardFactory();
    let frame0: IFrame = scoreBoard[0];
    frame0.score1 = 3;
    frame0.score2 = 5;
    frame0.totalScore = 8;
    let frame1: IFrame = scoreBoard[1];
    frame1.score1 = 0;
    frame1.score2 = 10;
    let frame2: IFrame = scoreBoard[2];
    frame2.score1 = 5;
    frame2.score2 = 4;
    scoreBoard[0] = frame0;
    scoreBoard[1] = frame1;
    scoreBoard[2] = frame2;

    let calculatedScoreBoard: Array<IFrame> = calculateService.calculateScore(
      scoreBoard,
    );
    let totalScore =
      frame0.totalScore +
      frame1.score1 +
      frame1.score2 +
      frame2.score1 +
      frame2.score2;
    expect(calculatedScoreBoard[1].totalScore).toBe(totalScore);
  });

  it('should calculate the score board when the second out of three frames is a spare', async () => {
    let scoreBoard = scoreBoardFactory();
    let frame0: IFrame = scoreBoard[0];
    frame0.score1 = 3;
    frame0.score2 = 5;
    frame0.totalScore = 8;
    let frame1: IFrame = scoreBoard[1];
    frame1.score1 = 5;
    frame1.score2 = 5;
    let frame2: IFrame = scoreBoard[2];
    frame2.score1 = 5;
    frame2.score2 = 4;
    scoreBoard[0] = frame0;
    scoreBoard[1] = frame1;
    scoreBoard[2] = frame2;

    let calculatedScoreBoard: Array<IFrame> = calculateService.calculateScore(
      scoreBoard,
    );
    let totalScore =
      frame0.totalScore + frame1.score1 + frame1.score2 + frame2.score1;
    expect(calculatedScoreBoard[1].totalScore).toBe(totalScore);
  });

  it('should calculate the score board when the second out of three frames has no spare nor strike', async () => {
    let scoreBoard = scoreBoardFactory();
    let frame0: IFrame = scoreBoard[0];
    frame0.score1 = 3;
    frame0.score2 = 5;
    frame0.totalScore = 8;
    let frame1: IFrame = scoreBoard[1];
    frame1.score1 = 3;
    frame1.score2 = 5;
    let frame2: IFrame = scoreBoard[2];
    frame2.score1 = 5;
    frame2.score2 = 4;
    scoreBoard[0] = frame0;
    scoreBoard[1] = frame1;
    scoreBoard[2] = frame2;

    let calculatedScoreBoard: Array<IFrame> = calculateService.calculateScore(
      scoreBoard,
    );
    let totalScore = frame1.score1 + frame1.score2;
    expect(calculatedScoreBoard[1].totalScore).toBe(totalScore);
  });

  it('should calculate the score for the last frame when the last frame has a strike as a first score, strike as a second and strike as a third', async () => {
    let scoreBoard = scoreBoardFactory();
    let frame9: IFrame = scoreBoard[9];
    frame9.score1 = BowlingScore.STRIKE;
    frame9.score2 = BowlingScore.STRIKE;
    frame9.score3 = BowlingScore.STRIKE;
    let frame8: IFrame = scoreBoard[8];
    frame8.score1 = 3;
    frame8.score2 = 5;
    frame8.totalScore = 8;
    scoreBoard[9] = frame9;
    scoreBoard[8] = frame8;

    let calculatedScoreBoard: Array<IFrame> = calculateService.calculateScore(
      scoreBoard,
    );
    let totalScore =
      frame8.totalScore + frame9.score1 + frame9.score2 + frame9.score3;
    expect(calculatedScoreBoard[9].totalScore).toBe(totalScore);
  });

  it('should calculate the score for the last frame when the last frame has a strike as a first score and receiving a strike as a second', async () => {
    let scoreBoard = scoreBoardFactory();
    let frame9: IFrame = scoreBoard[9];
    frame9.score1 = BowlingScore.STRIKE;
    let frame8: IFrame = scoreBoard[8];
    frame8.score1 = 3;
    frame8.score2 = 5;
    frame8.totalScore = 8;
    scoreBoard[9] = frame9;
    scoreBoard[8] = frame8;

    let calculatedScoreBoard: Array<IFrame> = calculateService.calculateScore(
      scoreBoard,
    );
    let totalScore = frame8.totalScore + frame9.score1;
    expect(calculatedScoreBoard[9].totalScore).toBe(totalScore);

    calculatedScoreBoard[9].score2 = BowlingScore.STRIKE;

    calculatedScoreBoard = calculateService.calculateScore(scoreBoard);
    totalScore = frame8.totalScore + frame9.score1 + BowlingScore.STRIKE;
    expect(calculatedScoreBoard[9].totalScore).toBe(totalScore);
  });
});
