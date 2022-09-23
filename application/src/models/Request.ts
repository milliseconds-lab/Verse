import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity({ name: 'Request' })
export default class Request extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID!: number

  @Column({ type: 'varchar', nullable: false, default: '' })
  name!: string

  @Column({ type: 'varchar', nullable: false, default: '' })
  email!: string

  @Column({ type: 'varchar', nullable: false, default: '' })
  phone!: string

  @Column({ type: 'varchar', nullable: false, default: '' })
  company!: string

  @Column({ type: 'longtext', nullable: false })
  message!: string

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  created_at: Date
}
