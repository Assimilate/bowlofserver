import { Body, Controller, Post, Header } from '@nestjs/common';
import ScoreBoard from '../models/ScoreBoard';
import { CalculateService } from '../services/calculate.service';
import { FramesDTO } from './frames.dto';
import { FrameDTO } from './frame.dto';
import { IFrame } from '../interfaces/frame.interface';

@Controller('/calculate')
export class AppController {
  constructor(private readonly calculateService: CalculateService) {}

  @Post('/frame')
  @Header('content-type', 'application/json')
  renderFrame(@Body() frameDTO: FrameDTO, bowl: number): string {
    let renderedFrame: IFrame = this.calculateService.renderFrame(
      frameDTO.frame,
      frameDTO.bowl,
    );
    return `${JSON.stringify(renderedFrame)}`;
  }

  @Post('/scoreBoard')
  @Header('content-type', 'application/json')
  calculateScoreBoard(@Body() framesDTO: FramesDTO): string {
    let scoreBoard: Array<IFrame> = this.calculateService.calculateScore(
      framesDTO.history,
    );
    return `${JSON.stringify(scoreBoard)}`;
  }
}
