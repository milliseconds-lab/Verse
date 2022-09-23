import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import Pictures from './Pictures'

@Entity({ name: 'Type_videos' })
export default class TypeVideos extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID!: number

  @Column({ type: 'varchar', nullable: false, default: '' })
  video_id!: string

  @ManyToOne(() => Pictures, { onDelete: 'SET NULL', cascade: true })
  poster!: Pictures

  @Column({ type: 'varchar', nullable: false, default: '' })
  title!: string

  @Column({ type: 'longtext', nullable: false })
  description!: string

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  created_at!: Date

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updated_at!: Date
}
