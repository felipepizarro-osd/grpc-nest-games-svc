/*import { Controller, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './entity/games.entity';
import { Repository } from 'typeorm';
import {
  CreateGameRequest,
  CreateGameResponse,
  GetGameResponse,
} from './games.pb';
import { GetGameDto } from './games.dto';

@Controller('games')
export class GamesController {
  @InjectRepository(Game)
  private readonly repository: Repository<Game>;
  public async getGame({ id }: GetGameDto): Promise<GetGameResponse> {
    const game: Game = await this.repository.findOne({ where: { id } });

    if (!game) {
      return {
        game: null,
        status: 404,
        error: [`Game with id ${id} not found`],
      };
    }
    return {
      game: game,
      status: HttpStatus.OK,
      error: [],
    };
  }
  public async createGame(
    payload: CreateGameRequest,
  ): Promise<CreateGameResponse> {
    const game: Game = new Game();
    game.name = payload.name;
    game.backgroundImages = payload.backgroundImages;
    game.description = payload.description;
    game.released = payload.released;
    game.metacritic = payload.metacritic;
    await this.repository.save(game);
    return {
      id: game.id,
      status: HttpStatus.OK,
      error: [],
    };
  }
}
*/

import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateGameDto, GetGameDto} from "./games.dto";
import { CreateGameResponse, GetGameResponse } from "./games.pb"; 
import { GamesService } from './games.service'; 

@Controller('games')
export class GamesController {
  constructor(
    @Inject(GamesService)
    private readonly gamesService: GamesService,
  ) {}
  @GrpcMethod('GamesService', 'GetGame')
  public async getGame(payload: GetGameDto): Promise<GetGameResponse> {
    return this.gamesService.getGame(payload);
  }
  @GrpcMethod('GamesService', 'CreateGame')
  public async createGame(payload: CreateGameDto): Promise<CreateGameResponse> {
    return this.gamesService.createGame(payload);
  } 
}