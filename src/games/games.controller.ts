import { Controller, HttpStatus } from '@nestjs/common';
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
