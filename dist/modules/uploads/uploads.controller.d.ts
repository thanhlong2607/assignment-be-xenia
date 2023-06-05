import { UploadService } from './uploads.service';
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    multerUpload(file: any): Promise<import("../../interfaces").ICommonUploadFile>;
    amazonUpload(file: any): Promise<import("../../interfaces").ICommonUploadFile>;
}
