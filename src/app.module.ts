import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(require('../ormconfig.js')), SharedModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
