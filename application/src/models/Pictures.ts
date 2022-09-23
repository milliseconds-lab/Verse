import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'Pictures' })
export default class Pictures extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID!: number

  @Column({ type: 'varchar', nullable: false, default: '' })
  name!: string

  @Column({ type: 'varchar', nullable: false, default: '' })
  stored_name!: string

  @Column({ type: 'int', nullable: true })
  width!: number

  @Column({ type: 'int', nullable: true })
  height!: number

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  created_at: Date

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updated_at: Date
}
