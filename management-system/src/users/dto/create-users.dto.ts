import { IsString, IsInt, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;
}
