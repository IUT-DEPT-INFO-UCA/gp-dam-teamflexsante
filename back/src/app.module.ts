import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './controllers/user/user.module';
import { TransformInterceptor } from './utils/transform.interceptor';

@Module({
  imports: [
    // Import env variables
    ConfigModule.forRoot(),
    // Database connexion
    MongooseModule.forRoot(process.env.DATABASE_URL),
    // Custom Modules
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
