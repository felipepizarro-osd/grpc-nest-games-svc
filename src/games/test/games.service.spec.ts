import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GamesService } from '../games.service';
import { Game } from '../entity/games.entity';
import { CreateGameDto, GetGameDto } from '../games.dto';
import {
  CreateGameResponse,
  GetGameResponse,
  GetGamesResponse,
} from '../games.pb';
import { HttpStatus } from '@nestjs/common';

describe('GamesService', () => {
  let service: GamesService;
  let repository: Repository<Game>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
      ],
      providers: [
        GamesService,
        {
          provide: getRepositoryToken(Game),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<GamesService>(GamesService);
    repository = module.get<Repository<Game>>(getRepositoryToken(Game));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createGame', () => {
    it('should create a game and return a CreateGameResponse', async () => {
      const game: Game = new Game();
      game.name = 'test';
      game.backgroundImages = 'test';
      game.description = 'test';
      game.released = 'test';
      game.metacritic = 'test';

      const payload: CreateGameDto = {
        name: game.name,
        backgroundImages: game.backgroundImages,
        description: game.description,
        released: game.released,
        metacritic: game.metacritic,
      };

      const result: CreateGameResponse = {
        id: 1,
        status: HttpStatus.CREATED,
        error: [],
      };

      jest.spyOn(repository, 'save').mockResolvedValue(game);
      jest.spyOn(service, 'createGame').mockResolvedValue(result);

      expect(await service.createGame(payload)).toBe(result);
    });
  });

  describe('getAllGames', () => {
    it('should return all games', async () => {
      const game: Game = new Game();
      game.name = 'test';
      game.backgroundImages = 'test';
      game.description = 'test';
      game.released = 'test';
      game.metacritic = 'test';

      const result: GetGamesResponse = {
        games: [game],
        status: HttpStatus.OK,
        error: [],
      };

      jest.spyOn(repository, 'find').mockResolvedValue([game]);
      jest.spyOn(service, 'getAllGames').mockResolvedValue(result);

      expect(await service.getAllGames()).toBe(result);
    });
  });
  describe('getGame', () => {
    it('should return a GetGameResponse', async () => {
      const game: Game = new Game();
      game.id = 1;
      game.name = 'test';
      game.backgroundImages = 'test';
      game.description = 'test';
      game.released = 'test';
      game.metacritic = 'test';

      const result: GetGameResponse = {
        game,
        status: HttpStatus.OK,
        error: [],
      };

      const payload: GetGameDto = {
        id: 1,
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(game);
      jest.spyOn(service, 'getGame').mockResolvedValue(result);

      expect(await service.getGame(payload)).toBe(result);
    });
  });
});
