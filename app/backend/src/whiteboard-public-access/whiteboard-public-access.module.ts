import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WhiteboardPublicAccessService } from 'src/whiteboard-public-access/whiteboard-public-access.service';
import { WhiteboardPublicAccessController } from 'src/whiteboard-public-access/whiteboard-public-access.controller';
import { WhiteboardPublicAccess } from 'src/whiteboard-public-access/whiteboard-public-access.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WhiteboardPublicAccess])],
  controllers: [WhiteboardPublicAccessController],
  providers: [WhiteboardPublicAccessService],
})
export class WhiteboardPublicAccessModule { }
