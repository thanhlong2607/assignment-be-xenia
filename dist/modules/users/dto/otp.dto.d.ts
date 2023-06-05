export declare class SendOTPDto {
    email: string;
    hash: string;
}
export declare class VerifyOTPDto {
    otp: string;
    hash: string;
}
export declare class ForgetPasswordDto {
    newPassword: string;
    hash: string;
}
