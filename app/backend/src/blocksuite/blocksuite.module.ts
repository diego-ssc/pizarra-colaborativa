import { Module } from '@nestjs/common';
import { RedisPersistence } from 'y-redis';
import { BlocksuiteGateway } from './blocksuite.gateway';


@Module({
    providers: [RedisPersistence, BlocksuiteGateway],
    exports: [RedisPersistence],
})
export class BlocksuiteModule {}
