import { Service } from 'typedi'
import { dataSource } from '../../dataSource'
import PicturesEntity from '../../common/entities/pictures.entity'
import CityEntity from '../entities/city.entity'
import TypeImagesEntity from '../entities/typeImages.entity'
import TypeVideosEntity from '../entities/typeVideos.entity'
import TypeArticlesEntity from '../entities/typeArticles.entity'
import PostsEntity from '../entities/posts.entity'

@Service()
export default class PostsService {
  public getPostById(id: number) {
    return dataSource.getRepository(PostsEntity).findOne({ where: { id } })
  }

  public getPostsList(search?: string, offset?: number, limit?: number) {
    const query = dataSource
      .getRepository(PostsEntity)
      .createQueryBuilder('posts')
      .orderBy('posts.id', 'DESC')
    if (search !== undefined) {
      query.where('posts.title like :title', { title: `%${search}%` })
    }
    if (
      offset !== undefined &&
      typeof offset === 'number' &&
      offset >= 0 &&
      limit !== undefined &&
      typeof limit === 'number' &&
      limit >= 0
    ) {
      query.offset(offset)
      query.limit(limit)
    }
    return query.getMany()
  }

  public getPostsCount(search?: string) {
    const query = dataSource
      .getRepository(PostsEntity)
      .createQueryBuilder('posts')
    if (search !== undefined) {
      query.where('posts.title like :title', { title: `%${search}%` })
    }
    return query.getCount()
  }

  public createPost(
    type: string,
    thumbnail: PicturesEntity,
    title: string,
    status: string,
    city?: CityEntity,
    image_content?: TypeImagesEntity,
    video_content?: TypeVideosEntity,
    article_content?: TypeArticlesEntity
  ) {
    const post = new PostsEntity()
    post.type = type
    if (thumbnail !== undefined) {
      post.thumbnail = thumbnail
    }
    post.title = title
    if (city !== undefined) {
      post.city = city
    }
    if (type === PostsEntity.TYPE.IMAGE && image_content !== undefined) {
      post.image_content = image_content
    }
    if (type === PostsEntity.TYPE.VIDEO && video_content !== undefined) {
      post.video_content = video_content
    }
    if (type === PostsEntity.TYPE.ARTICLE && article_content !== undefined) {
      post.article_content = article_content
    }
    post.status = status
    return post.save()
  }

  public deletePost(id: number) {
    return dataSource.getRepository(PostsEntity).delete(id)
  }
}
