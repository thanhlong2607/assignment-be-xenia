export declare const multerOptions: {
    imageFilter: {
        limits: {
            files: number;
            fileSize: number;
        };
        fileFilter: (req: Request, file: any, cb: any) => void;
    };
    multerSaver: {
        storage: import("multer").StorageEngine;
    };
};
