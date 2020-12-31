import { IFrame } from '../bowling-calculator/frame.interface';
enum Bowling {
  STRIKE = 10,
  SPARE = 10,
  LAST_FRAME = 9,
}

export default class ScoreBoard {
  static calculateScoreBoard(history: IFrame[], bowl: number) {
    const clonedHistory: Array<IFrame> = Object.assign([], history);
    for (let frame of clonedHistory) {
      if (frame.score1 && frame.score2) continue;
      if (bowl === Bowling.STRIKE) {
        console.log('STRIKE');
        if (frame.score1 === null) {
          if (frame.frameNr === 9) {
            frame.score1 === 'X';
          } else {
            frame.score1 === '';
            frame.score2 === 'X';
          }
        }
        break;
      } else {
        if (frame.score1 === null) {
          frame.score1 = bowl;
        } else if (frame.score2 === null) {
          if (typeof frame.score1 === 'number') {
            const totalScore = bowl + frame.score1;
            if (totalScore === Bowling.SPARE) {
              frame.score1 = '';
              frame.score2 = '/';
            } else {
              frame.score2 = bowl;
            }
          }
        } else if (frame.score3 === null) {
          if (frame.score3 === Bowling.STRIKE) {
            frame.score3 = 'X';
          } else {
            frame.score3 = bowl;
          }
        }
        continue;
      }
    }
    console.log('Returning cloned history:', clonedHistory);
    return clonedHistory;
  }
  static calculateFrame(frame: IFrame, bowl: number) {
    const clonedFrame: IFrame = Object.assign({}, frame);

    if (bowl === Bowling.STRIKE) {
      if (clonedFrame.frameNr === Bowling.LAST_FRAME) {
        if (clonedFrame.score1 === null) {
          clonedFrame.score1 = 'X';
        } else if (clonedFrame.score2 === null) {
          clonedFrame.score2 = 'X';
        } else if (clonedFrame.score3 === null) {
          clonedFrame.score3 = 'X';
        }
      } else {
        clonedFrame.score1 = '';
        clonedFrame.score2 = 'X';
      }
    } else {
      if (clonedFrame.score1 === null) {
        clonedFrame.score1 = bowl;
      } else if (clonedFrame.score2 === null) {
        let totalScore = (clonedFrame.score1 as number) + bowl;
        if (totalScore === Bowling.SPARE) {
          clonedFrame.score1 = '';
          clonedFrame.score2 = '/';
        } else {
          clonedFrame.score2 = bowl;
        }
      } else if (clonedFrame.score3 === null) {
        clonedFrame.score3 = bowl;
      }
    }
    console.log('Cloned frame:', clonedFrame);
    return clonedFrame;
  }
}
