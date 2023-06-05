/// <reference types="multer" />
import { ICommonUploadFile } from 'src/interfaces';
export declare class UploadService {
    private S3;
    private BUCKET;
    constructor();
    multerUpload(file: Express.Multer.File): ICommonUploadFile;
    amazonUpload(file: Express.Multer.File): Promise<ICommonUploadFile>;
}
