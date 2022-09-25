import { DataSource } from 'typeorm'
import config from '../config'
import App from './app'
import UsersEntity from './users/entities/users.entity'
import PicturesEntity from './common/entities/pictures.entity'
import RequestEntity from './request/entities/request.entity'
import TypeImagesEntity from './posts/entities/typeImages.entity'
import TypeVideosEntity from './posts/entities/typeVideos.entity'
import TypeArticlesEntity from './posts/entities/typeArticles.entity'
import PostsEntity from './posts/entities/posts.entity'
import CityEntity from './posts/entities/city.entity'

export const dataSource = new DataSource({
  type: config.DOMAIN_MYSQL_TYPE,
  host: config.DOMAIN_MYSQL_HOST,
  port: config.DOMAIN_MYSQL_PORT,
  database: config.DOMAIN_MYSQL_DB,
  username: config.DOMAIN_MYSQL_USER,
  password: config.DOMAIN_MYSQL_PASSWORD,
  synchronize: true,
  logging: true,
  entities: [
    UsersEntity,
    PicturesEntity,
    RequestEntity,
    TypeImagesEntity,
    TypeVideosEntity,
    TypeArticlesEntity,
    CityEntity,
    PostsEntity
  ],
  migrations: [`${App.PROJECT_DIR}/build/migration/**/*.js`]
})
