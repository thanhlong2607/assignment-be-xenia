import { Module } from '@nestjs/common';

import { PostgresqlModule } from './database/postgresql.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { CarsModule } from './modules/cars/cars.module';
import { BookingsModule } from './modules/bookings/bookings.module';

@Module({
  imports: [UsersModule, PostgresqlModule, AuthModule, CarsModule, BookingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
