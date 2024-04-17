import { Injectable } from '@nestjs/common';
import { Client } from 'y-redis';

@Injectable()
/* The RedisService class. */
export class RedisService {
    /* The client class. It is used to establish a connection. */
    private client: Client;

    /* The class constructor. */
    constructor() {
        this.client = new Client({
            /* Redis server host. */
            host: 'localhost',
            /* Redis server port. */
            port: 6379,
        });
    }

    /* Initializes de connection asynchronously. */
    async connect(): Promise<void> {
        await this.client.connect();
    }

    /* Retrieval operation. */
    async get(key: string): Promise<string | null> {
        return await this.client.get(key);
    }

    /* Storage operation. */
    async set(key:string, value: string): Promise<boolean> {
        return await this.client.set(key, value);
    }

}
