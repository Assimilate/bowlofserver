export interface IFrame {
  frameNr: number;
  score1: number | string | null;
  score1Render: string | null;
  score2: number | string | null;
  score2Render: string | null;
  score3?: number | string | null;
  score3Render?: string | null;
  totalScore: number;
  isFinished: boolean;
}
