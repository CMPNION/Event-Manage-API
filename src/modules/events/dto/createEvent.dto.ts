import { IsString, IsDateString, IsUrl, IsOptional } from "class-validator";

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;

  @IsUrl()
  bannerurl: string;

  @IsOptional()
  ownerId: number;
}
