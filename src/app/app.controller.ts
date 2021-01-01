import { Body, Controller, Post, Header } from '@nestjs/common';
import ScoreBoard from '../models/ScoreBoard';
import { CalculateService } from '../services/calculate.service';
import { FramesDTO } from './frames.dto';
import { FrameDTO } from './frame.dto';
import { IFrame } from '../interfaces/frame.interface';

@Controller('/calculate')
export class AppController {
  constructor(private readonly calculateService: CalculateService) {}

  @Post('/scoreBoard')
  @Header('content-type', 'application/json')
  calculateScoreBoard(@Body() framesDTO: FramesDTO, bowl: number): string {
    let scoreBoard: Array<IFrame> = this.calculateService.calculateScore(
      framesDTO.history,
      framesDTO.bowl,
    );
    return `${JSON.stringify(scoreBoard)}`;
  }
}
