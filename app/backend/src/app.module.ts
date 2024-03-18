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
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSRGRES_DB,
      entities: [],
      synchronize: true, // TODO: Don't synchronize prod db.
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
