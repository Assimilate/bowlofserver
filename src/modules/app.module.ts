import { Module } from '@nestjs/common';
import { CalculateService } from '../services/calculate.service';
import { AppController } from '../app/app.controller';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [CalculateService],
})
export class AppModule {}
