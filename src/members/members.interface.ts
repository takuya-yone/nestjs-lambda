import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class Member {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  age: number;
  @IsNotEmpty()
  @IsString()
  mail: string;
}
