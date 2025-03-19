import { IsNotEmpty, IsOptional} from 'class-validator'
import {IsString} from 'class-validator'

export class CreateFolderDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    description: string;

}