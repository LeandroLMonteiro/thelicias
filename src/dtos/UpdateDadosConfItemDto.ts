import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateDadosConfItemDto {
    @IsOptional()
    @IsString()
    descricao?: string;

    @IsOptional()
    @IsString()
    manuseioEspecial?: string;
}