import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from '../games.controller';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GamesService } from '../games.service';
import { Game } from '../entity/games.entity';
import { HttpStatus } from '@nestjs/common';
import { CreateGameDto, GetGameDto } from '../games.dto';
import { GetGamesResponse, GetGameResponse } from '../games.pb';

describe('GamesController', () => {
  let controller: GamesController;
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
        GamesController,
        GamesService,
        {
          provide: getRepositoryToken(Game),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<GamesController>(GamesController);
    service = module.get<GamesService>(GamesService);
    repository = module.get<Repository<Game>>(getRepositoryToken(Game));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createGame', () => {
    it('should return a CreateGameResponse', async () => {
      const result = {
        id: expect.any(Number),
        status: HttpStatus.CREATED,
        error: [],
      };
      const payload: CreateGameDto = {
        name: 'test',
        backgroundImages: 'test',
        description: 'test',
        released: 'test',
        metacritic: 'test',
      };

      jest.spyOn(service, 'createGame').mockResolvedValue(result);

      expect(await controller.createGame(payload)).toBe(result);
    });
  });

  describe('getGame', () => {
    it('should return a GetGameResponse', async () => {
      // Crear un juego de prueba
      const game: Game = new Game();
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

      jest.spyOn(service, 'getGame').mockResolvedValue(result);

      expect(await controller.getGame(payload)).toBe(result);
    });
  });

  describe('getAllGames', () => {
    it('should return a GetGamesResponse', async () => {
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

      jest.spyOn(service, 'getAllGames').mockResolvedValue(result);

      expect(await controller.getAllGames()).toBe(result);
    });
  });
});
