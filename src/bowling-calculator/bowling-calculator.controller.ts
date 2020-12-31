import { Body, Controller, Get, Param, Post, Header } from '@nestjs/common';
import { FramesDTO } from './frames.dto';
import { FrameDTO } from './frame.dto';
import ScoreBoard from '../models/ScoreBoard';
import { IFrame } from './frame.interface';
@Controller('/calculate')
export class BowlingCalculatorController {
  @Post('scoreBoard')
  @Header('content-type', 'application/json')
  calculateScoreBoard(@Body() framesDTO: FramesDTO, bowl: number): string {
    let scoreBoard: Array<IFrame> = ScoreBoard.calculateScoreBoard(
      framesDTO.history,
      framesDTO.bowl,
    );
    return `${JSON.stringify(scoreBoard)}`;
  }
  @Post('/frame')
  @Header('content-type', 'application/json')
  calculateFrame(@Body() frameDTO: FrameDTO, bowl: number): string {
    let scoreFrame: IFrame = ScoreBoard.calculateFrame(
      frameDTO.frame,
      frameDTO.bowl,
    );
    return `${JSON.stringify(scoreFrame)}`;
  }
}
