import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { WhiteBoardModule } from './white-board/white-board.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { UserGroupModule } from './user-group/user-group.module';
import { HasPermissionModule } from './has-permission/has-permission.module';
import { MinioModule } from './minio/minio.module';
import { ImageModule } from './image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MINIO_HOST: Joi.string().required(),
        MINIO_PORT: Joi.number().required(),
        MINIO_USE_SSL: Joi.boolean().required(),
        MINIO_ROOT_USER: Joi.string().required(),
        MINIO_ROOT_PASSWORD: Joi.string().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    WhiteBoardModule,
    WorkspaceModule,
    UserGroupModule,
    HasPermissionModule,
    MinioModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
