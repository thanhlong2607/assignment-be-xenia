import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class CronjobGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<any>;
    checkHashCronjob(hash: string): Promise<boolean>;
}
