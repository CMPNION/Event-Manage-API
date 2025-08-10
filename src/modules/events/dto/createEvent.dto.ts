import {
  IsString,
  IsInt,
  IsDateString,
  IsUrl,
  IsBoolean,
} from "class-validator";

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsDateString()
  date: Date;

  @IsUrl()
  bannerurl: string;
}
