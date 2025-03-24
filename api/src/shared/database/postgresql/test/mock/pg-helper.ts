import { DataType, IBackup, IMemoryDb, ISchema, newDb } from 'pg-mem';
import { DataSource } from 'typeorm';
import { EntityTarget } from 'typeorm/common/EntityTarget';
import { Repository } from 'typeorm/repository/Repository';
import { v4 } from 'uuid';

import { ShortUrlEntity } from '@/modules/short-url/infra/repo/entities/short-url.entity';

export const PgTestHelper = {
  db: null as unknown as IMemoryDb,
  connection: null as DataSource,
  backup: null as unknown as IBackup,
  async connect(): Promise<void> {
    this.db = newDb();
    this.db.registerExtension('uuid-ossp', (schema: ISchema) => {
      schema.registerFunction({
        name: 'uuid_generate_v4',
        returns: DataType.uuid,
        implementation: () => v4(),
        impure: true,
      });
    });
    this.db.public.registerFunction({ implementation: () => 'local', name: 'current_database' });
    this.db.public.registerFunction({ implementation: () => 'v1', name: 'version' });
    this.connection = await this.db.adapters.createTypeormDataSource({
      type: 'postgres',
      entities: [ShortUrlEntity],
      logging: false,
    });
    await this.initialize();
    await this.sync();
    this.backup = this.db.backup();
  },
  getRepository<Entity>(name: EntityTarget<Entity>): Repository<Entity> {
    return this.connection.getRepository(name);
  },
  async initialize(): Promise<void> {
    await this.connection.initialize();
  },
  async disconnect(): Promise<void> {
    await this.connection.destroy();
  },
  restore(): void {
    this.backup.restore();
  },
  async sync(): Promise<void> {
    await this.connection.synchronize();
  },
};
