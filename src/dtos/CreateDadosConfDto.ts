import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { CreateDadosConfItemDto } from "./createDadosConfItemDto";

export class CreateDadosConfDto {
  @IsNotEmpty()
  @IsString()
  tipo: string = "";

  @ValidateNested({ each: true })
  @Type(() => CreateDadosConfItemDto)
  @IsOptional()
  itens: CreateDadosConfItemDto[] = [];
}
