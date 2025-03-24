import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'short_url' })
export class ShortUrlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true, name: 'short_url' })
  shortUrl: string;

  @Column({ nullable: true, name: 'original_url' })
  originalUrl: string;

  @CreateDateColumn({ type: 'timestamp without time zone', name: 'created_at' })
  createdAt: Date;
}
