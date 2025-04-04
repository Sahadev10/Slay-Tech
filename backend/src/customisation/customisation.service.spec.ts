import { Test, TestingModule } from '@nestjs/testing';
import { CustomisationService } from './customisation.service';

describe('CustomisationService', () => {
  let service: CustomisationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomisationService],
    }).compile();

    service = module.get<CustomisationService>(CustomisationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
