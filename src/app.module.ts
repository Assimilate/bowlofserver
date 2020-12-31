import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BowlingCalculatorController } from './bowling-calculator/bowling-calculator.controller';

@Module({
  imports: [],
  controllers: [BowlingCalculatorController],
  providers: [AppService],
})
export class AppModule {}
