import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from
'@nestjs/websockets';
import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'ws';
import { RedisPersistence } from 'y-redis';
import * as Y from 'yjs';

/* The BlocksuiteGateway class. */
@WebSocketGateway()
@Injectable()
export class BlocksuiteGateway implements OnGatewayConnection,
OnGatewayDisconnect {

    constructor(private readonly redisPersistence: RedisPersistence) {}

    /* The server. */
    server: Server;

    async handleConnection(client: Socket, ...data: any[]) {
        /* Handle connection. */
        console.log('Client connected:', client.id);

        /* Create or associate a Y.doc instance with a PersistenceDoc. */
        const yDoc = new Y.Doc();
        const persistenceDoc = await
        this.redisPersistence.bindState('document_name', yDoc);

        /* Process initial data or handle updates from PersistenceDoc. */
    }

    async handleDisconnect(client: Socket) {
        console.log('Client disconnected:', client.id);
    }

    /* ToDo: Handle updates related to BlockSuite. */
}
