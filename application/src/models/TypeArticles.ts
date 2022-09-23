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

@Entity({ name: 'Type_articles' })
export default class TypeArticles extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID!: number

  @ManyToOne(() => Pictures, { onDelete: 'SET NULL', cascade: true })
  cover!: Pictures

  @Column({ type: 'varchar', nullable: false, default: '' })
  title!: string

  @Column({ type: 'longtext', nullable: false })
  overview!: string

  // TODO :: content json type 구성 필요
  @Column({ type: 'json', nullable: false})
  content!: any

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
