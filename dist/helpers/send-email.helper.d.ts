export declare class SendEmailHelper {
    private static sendMail;
    static sendOTP({ to, subject, OTP }: {
        to: any;
        subject: any;
        OTP: any;
    }): Promise<string>;
}
