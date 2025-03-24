import { MigrationInterface, QueryRunner } from 'typeorm';

export class ShortUrlTable1741212294615 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS short_url (
        id              UUID PRIMARY KEY NOT NULL,
        short_url       VARCHAR(150) NOT NULL UNIQUE,
        original_url    VARCHAR(150) NOT NULL,
        created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE IF EXISTS short_url');
  }
}
