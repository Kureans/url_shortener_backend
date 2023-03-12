import { IsString, IsNotEmpty } from 'class-validator';

export class ShortenUrlDto {
  @IsString()
  @IsNotEmpty()
  longUrl: string;
}
