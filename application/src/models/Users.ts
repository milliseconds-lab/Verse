import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity({ name: 'Users' })
export default class Users extends BaseEntity {
  public static STATUS = {
    CLIENT: 0,
    OWNER: 1
  }

  @PrimaryGeneratedColumn()
  ID!: number

  @Column({ type: 'varchar', nullable: false, default: '' })
  user_id!: string

  @Column({ type: 'varchar', nullable: false, default: '' })
  password!: string

  @Column({ type: 'varchar', nullable: false, default: '' })
  name!: string

  @Column({ type: 'varchar', nullable: false, default: '' })
  nickname!: string

  @Column({ type: 'varchar', nullable: false, default: '' })
  email!: string

  @Column({ type: 'int', nullable: false, default: Users.STATUS.CLIENT })
  status!: number

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
