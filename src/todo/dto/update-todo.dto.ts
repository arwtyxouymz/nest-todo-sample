import { IsString, IsBoolean, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  readonly until?: Date;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  readonly isDone?: boolean;
}
