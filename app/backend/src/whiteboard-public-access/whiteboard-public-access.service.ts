import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { WhiteBoard } from 'src/white-board/white-board.entity'
import { WhiteboardPublicAccess } from 'src/whiteboard-public-access/whiteboard-public-access.entity';
import { HasPermission } from 'src/has-permission/has-permission.entity';

@Injectable()
export class WhiteboardPublicAccessService {
  constructor(
    @InjectRepository(WhiteboardPublicAccess)
    private whiteboardPublicAccessRepository: Repository<WhiteboardPublicAccess>,
    @InjectRepository(WhiteBoard)
    private readonly whiteboardRepository: Repository<WhiteBoard>,
  ) { }

  async setPublicAccessLevel(whiteboardId: number, accessLevel:
    HasPermission.Action) {
    const whiteboard = await this.whiteboardRepository
      .findOne({
        where: {
          whiteBoardId: whiteboardId
        }
      })

    if (!whiteboard)
      throw new NotFoundException('whiteboard not found');

    const existingAccess = await this.whiteboardPublicAccessRepository.findOne
      ({
        where: {
          id: whiteboardId,
        },
      });

    if (existingAccess) {
      existingAccess.accessLevel = accessLevel;
      await this.whiteboardPublicAccessRepository.save(existingAccess);
    } else {
      const newAccess = new WhiteboardPublicAccess();
      newAccess.accessLevel = accessLevel;
      newAccess.whiteboard = whiteboard;
      await this.whiteboardPublicAccessRepository.save(newAccess);
    }
  }

  async getPublicAccessLevel(whiteboardId: number): Promise<HasPermission.Action | undefined> {
    const access = await this.whiteboardPublicAccessRepository
      .findOne({ where: { whiteboard: { whiteBoardId: whiteboardId } } });
    return access?.accessLevel;
  }
}
