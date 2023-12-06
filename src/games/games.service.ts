import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './entity/games.entity';
import {
  CreateGameResponse,
  GetGameResponse,
  GetGamesResponse,
} from './games.pb';
import { CreateGameDto, GetGameDto } from './games.dto';
@Injectable()
export class GamesService {
  @InjectRepository(Game)
  private readonly repository: Repository<Game>;

  public async getGame({ id }: GetGameDto): Promise<GetGameResponse> {
    const game: Game = await this.repository.findOne({ where: { id } });
    if (!game) {
      return {
        game: null,
        status: HttpStatus.NOT_FOUND,
        error: [`Game with id ${id} not found`],
      };
    }
    return {
      game,
      status: HttpStatus.OK,
      error: [],
    };
  }
  public async createGame(payload: CreateGameDto): Promise<CreateGameResponse> {
    const game: Game = new Game();
    game.name = payload.name;
    game.backgroundImages = payload.backgroundImages;
    game.description = payload.description;
    game.released = payload.released;
    game.metacritic = payload.metacritic;
    await this.repository.save(game);
    return {
      id: game.id,
      status: HttpStatus.CREATED,
      error: [],
    };
  }
  //get all games
  public async getAllGames(): Promise<GetGamesResponse> {
    const games: Game[] = await this.repository.find();
    if (!games) {
      return {
        games: null,
        status: HttpStatus.NOT_FOUND,
        error: [`Games does not exist`],
      };
    }
    return {
      games,
      status: HttpStatus.OK,
      error: [],
    };
  }
}
