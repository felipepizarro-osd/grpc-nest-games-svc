// // import { Controller, Inject } from '@nestjs/common';
// import { GrpcMethod } from '@nestjs/microservices';
// import { CreateGameDto, GetGameDto } from './games.dto';
// import { CreateGameResponse, GetGameResponse } from './games.pb';
// import { GamesService } from './games.service';
// import { Controller, Inject } from '@nestjs/common';

// @Controller('games')
// export class GamesController {
//   constructor(
//     @Inject(GamesService)
//     private readonly gamesService: GamesService,
//   ) {}
//   @GrpcMethod('GamesService', 'GetGame')
//   public async getGame(payload: GetGameDto): Promise<GetGameResponse> {
//     return this.gamesService.getGame(payload);
//   }
//   @GrpcMethod('GamesService', 'CreateGame')
//   public async createGame(payload: CreateGameDto): Promise<CreateGameResponse> {
//     return this.gamesService.createGame(payload);
//   }
// }
import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GamesService } from './games.service';
import {
  CreateGameResponse,
  GAMES_SERVICE_NAME,
  GetGameResponse,
} from './games.pb';
import { CreateGameDto, GetGameDto } from './games.dto';

@Controller()
export class GamesController {
  @Inject(GamesService)
  private readonly service: GamesService;

  @GrpcMethod(GAMES_SERVICE_NAME, 'CreateGame')
  private createGame(payload: CreateGameDto): Promise<CreateGameResponse> {
    console.log(payload);
    return this.service.createGame(payload);
  }

  @GrpcMethod(GAMES_SERVICE_NAME, 'GetGame')
  private getGame(payload: GetGameDto): Promise<GetGameResponse> {
    return this.service.getGame(payload);
  }
}
