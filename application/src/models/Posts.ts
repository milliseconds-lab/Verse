import {
  BaseEntity,
  Column,
  CreateDateColumn,
  ManyToOne, RelationId,
  UpdateDateColumn
} from 'typeorm'
import Pictures from './Pictures'
import TypeImages from './TypeImages'
import TypeVideos from './TypeVideos'
import TypeArticles from './TypeArticles'
import City from "./City";

export default class Posts extends BaseEntity {
  public static TYPE = {
    IMAGE: 'image',
    VIDEO: 'video',
    ARTICLE: 'article'
  }

  public static STATUS = {
    // DRAFT: 'draft',
    PRIVATE: 'private',
    PUBLISH: 'publish'
  }

  ID!: number

  @Column({ type: 'varchar', nullable: false, default: Posts.TYPE.IMAGE })
  type!: string

  @ManyToOne(() => Pictures, { onDelete: 'SET NULL', cascade: true })
  thumbnail!: Pictures

  @Column({ type: 'varchar', nullable: false, default: '' })
  title!: string

  @RelationId(() => City)
  city!: number

  @ManyToOne(() => TypeImages, { onDelete: 'SET NULL', cascade: true })
  image_content: TypeImages

  @ManyToOne(() => TypeVideos, { onDelete: 'SET NULL', cascade: true })
  video_content: TypeVideos

  @ManyToOne(() => TypeArticles, { onDelete: 'SET NULL', cascade: true })
  article_content: TypeArticles

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  published_at: Date

  @Column({ type: 'string', nullable: false, default: Posts.STATUS.PRIVATE })
  status!: string

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
