import { IsNotEmpty } from 'class-validator';

export class CreateWhiteBoardDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    documentBlob: boolean;

    @IsNotEmpty()
    createdAt: Date;

    @IsNotEmpty()
    updatedAt: Date;
}
