import { IsOptional, IsString } from 'class-validator';

export class UpdateDadosConfDto {
    @IsOptional()
    @IsString()
    tipo?: string;
}