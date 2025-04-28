import { IsNotEmpty, IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateDadosConfItemDto {
    @IsNotEmpty()
    @IsString()
    descricao: string = '';

    @IsOptional()
    @IsString()
    manuseioEspecial?: string;
}