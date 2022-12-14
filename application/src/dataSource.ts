import { DataSource } from 'typeorm'
import config from '../config'
import UsersEntity from './users/entities/users.entity'
import PicturesEntity from './common/entities/pictures.entity'
import RequestEntity from './request/entities/request.entity'
import CityEntity from './posts/entities/city.entity'
import TypeImagesEntity from './posts/entities/typeImages.entity'
import TypeVideosEntity from './posts/entities/typeVideos.entity'
import TypeArticlesEntity from './posts/entities/typeArticles.entity'
import PostsEntity from './posts/entities/posts.entity'

export const dataSource = new DataSource({
  type: config.DOMAIN_MYSQL_TYPE,
  host: config.DOMAIN_MYSQL_HOST,
  port: config.DOMAIN_MYSQL_PORT,
  database: config.DOMAIN_MYSQL_DB,
  username: config.DOMAIN_MYSQL_USER,
  password: config.DOMAIN_MYSQL_PASSWORD,
  synchronize: false,
  logging: false,
  entities: [
    UsersEntity,
    PicturesEntity,
    RequestEntity,
    CityEntity,
    TypeImagesEntity,
    TypeVideosEntity,
    TypeArticlesEntity,
    PostsEntity
  ],
  migrations: []
})
