import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class Member {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  age: number;
  @IsNotEmpty()
  @IsString()
  mail: string;
}
