import { IsString, IsDate, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly until?: Date;
}
