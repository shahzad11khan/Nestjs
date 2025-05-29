import { Test, TestingModule } from '@nestjs/testing';
import { HeadmasterController } from './headmaster.controller';

describe('HeadmasterController', () => {
  let controller: HeadmasterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeadmasterController],
    }).compile();

    controller = module.get<HeadmasterController>(HeadmasterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
