import { Test, TestingModule } from '@nestjs/testing';
import { CustomisationController } from './customisation.controller';
import { CustomisationService } from './customisation.service';

describe('CustomisationController', () => {
  let controller: CustomisationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomisationController],
      providers: [CustomisationService],
    }).compile();

    controller = module.get<CustomisationController>(CustomisationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
