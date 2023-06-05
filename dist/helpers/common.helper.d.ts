export declare class CommonHelper {
    static generateOTP(): string;
    static hashData(data: string): string;
    static checkHashData(hash: string): string;
    static random(min: number, max: number): number;
    static generateRandomString(length: number): string;
}
