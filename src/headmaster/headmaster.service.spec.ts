import { Test, TestingModule } from '@nestjs/testing';
import { HeadmasterService } from './headmaster.service';

describe('HeadmasterService', () => {
  let service: HeadmasterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeadmasterService],
    }).compile();

    service = module.get<HeadmasterService>(HeadmasterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
