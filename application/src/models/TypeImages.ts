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

@Entity({ name: 'Type_images' })
export default class TypeImages extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID!: number

  @ManyToOne(() => Pictures, { onDelete: 'SET NULL', cascade: true })
  image!: Pictures

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
