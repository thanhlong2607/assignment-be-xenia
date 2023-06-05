import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IResponse } from '../../interfaces';
export declare class TransformInterceptor<T> implements NestInterceptor<T, IResponse> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<IResponse>;
}
