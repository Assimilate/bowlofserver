import { Test, TestingModule } from '@nestjs/testing';
import { CalculateService } from '../services/calculate.service';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;
  let calculateService: CalculateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [CalculateService],
    }).compile();
    calculateService = module.get<CalculateService>(CalculateService);
    appController = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
