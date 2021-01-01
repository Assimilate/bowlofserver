export interface IFrame {
  frameNr: number;
  score1: number | string | null;
  score2: number | string | null;
  score3?: number | string | null;
  totalScore: number | null;
}
