export declare class EncryptHelper {
    static hash(str: any, saltRounds?: number): Promise<string>;
    static compare(str: any, hash: any): boolean;
}
