import { IFrame } from '../interfaces/frame.interface';

// Temporary database

let scoreBoard: Array<IFrame> = [];
export default class ScoreBoard {
  static getScoreBoard() {
    return scoreBoard;
  }
  static setScoreBoard(scoreBoard: Array<IFrame>) {
    scoreBoard = scoreBoard;
  }
}
