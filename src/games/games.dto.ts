import { IsNumber, IsString } from 'class-validator';
import { CreateGameRequest, GetGameRequest } from './games.pb';

export class CreateGameDto implements CreateGameRequest {

  @IsString()
  name: string;

  @IsString()
  backgroundImages: string;

  @IsString()
  description: string;

  @IsString()
  released: string;

  @IsString()
  metacritic: string;
}
export class GetGameDto implements GetGameRequest {
  @IsNumber({ allowInfinity: false, allowNaN: false })
  id: number;
}
