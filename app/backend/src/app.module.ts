import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'app-db',
      entities: [],
      synchronize: true, // TODO: Don't synchronize prod db.
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
