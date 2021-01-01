export enum BowlingScore {
  STRIKE = 10,
  SPARE = 10,
  MAX_SCORE = 10,
}

export enum BowlingRender {
  STRIKE = 'X',
  SPARE = '/',
}

export function renderToScore(render: number | string) {
  if (typeof render === 'number') {
    return render;
  } else if (typeof render === 'string') {
    if (render === BowlingRender.STRIKE) {
      return BowlingScore.STRIKE;
    } else if (render === BowlingRender.SPARE) {
      return BowlingScore.SPARE;
    } else {
      return 0;
    }
  }
}
