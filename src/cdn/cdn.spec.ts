import { Test, TestingModule } from '@nestjs/testing';
import { Cdn } from './cdn';

describe('Cdn', () => {
  let provider: Cdn;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Cdn],
    }).compile();

    provider = module.get<Cdn>(Cdn);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
