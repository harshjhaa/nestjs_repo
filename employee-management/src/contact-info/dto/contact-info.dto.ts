import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ContactInfoDto {
  @IsOptional()
  id: number;

  @IsOptional()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  employeeId: number;
}

export class CreateContactInfoDTO extends ContactInfoDto {}

export class UpdateContactInfoDto extends ContactInfoDto {}
