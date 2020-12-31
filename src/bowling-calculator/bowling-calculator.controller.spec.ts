import { Test, TestingModule } from '@nestjs/testing';
import { BowlingCalculatorController } from './bowling-calculator.controller';

describe('BowlingCalculatorController', () => {
  let controller: BowlingCalculatorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BowlingCalculatorController],
    }).compile();

    controller = module.get<BowlingCalculatorController>(BowlingCalculatorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
