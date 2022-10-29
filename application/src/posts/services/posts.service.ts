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
  public getPostById(id: number, status = [PostsEntity.STATUS.PUBLIC]) {
    // return dataSource.getRepository(PostsEntity).findOne({ where: { id } })
    const query = dataSource
      .getRepository(PostsEntity)
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.thumbnail', 'thumbnail')
      .leftJoinAndSelect('posts.city', 'city')
      .leftJoinAndSelect('posts.image_content', 'image_content')
      .leftJoinAndSelect('posts.video_content', 'video_content')
      .leftJoinAndSelect('posts.article_content', 'article_content')
      .where({ id })
      .andWhere('posts.status IN(:status)', { status })
      .select([
        'posts.id',
        'posts.type',
        'posts.title',
        'thumbnail.id',
        'thumbnail.url',
        'city.id',
        'city.name',
        'image_content.id',
        'image_content.title',
        'image_content.description',
        'image_content.image',
        'video_content.id',
        'video_content.video_id',
        'video_content.title',
        'video_content.description',
        'video_content.poster',
        'article_content.id',
        'article_content.title',
        'article_content.overview',
        'article_content.content',
        'article_content.cover',
        'posts.published_at',
        'posts.status'
      ])
    return query.getOne()
  }

  public getPreviousPostById(id: number, status = [PostsEntity.STATUS.PUBLIC]) {
    const query = dataSource
      .getRepository(PostsEntity)
      .createQueryBuilder('posts')
      .select(['posts.id', 'posts.title'])
      .where('posts.status IN(:status)', { status })
      .andWhere('posts.id < :id', { id })
    return query.getOne()
  }

  public getNextPostById(id: number, status = [PostsEntity.STATUS.PUBLIC]) {
    const query = dataSource
      .getRepository(PostsEntity)
      .createQueryBuilder('posts')
      .select(['posts.id', 'posts.title'])
      .where('posts.status IN(:status)', { status })
      .andWhere('posts.id > :id', { id })
    return query.getOne()
  }

  public getPreviousPostByIdWithOrderByPublishedAt(
    id: number,
    status = [PostsEntity.STATUS.PUBLIC]
  ) {
    const query = dataSource
      .getRepository(PostsEntity)
      .createQueryBuilder('posts')
      .where('posts.status IN(:status)', { status })
      .andWhere('posts.id < :id', { id })
      .orderBy('posts.published_at', 'DESC')
    return query.getOne()
  }

  public getNextPostByIdWithOrderByPublishedAt(
    id: number,
    status = [PostsEntity.STATUS.PUBLIC]
  ) {
    const query = dataSource
      .getRepository(PostsEntity)
      .createQueryBuilder('posts')
      .where('posts.status IN(:status)', { status })
      .andWhere('posts.id > :id', { id })
      .orderBy('posts.published_at', 'DESC')
    return query.getOne()
  }

  public getPostsList(
    search?: string,
    offset?: number,
    limit?: number,
    status = [PostsEntity.STATUS.PUBLIC]
  ) {
    const query = dataSource
      .getRepository(PostsEntity)
      .createQueryBuilder('posts')
      .leftJoinAndSelect('posts.thumbnail', 'thumbnail')
      .leftJoinAndSelect('posts.city', 'city')
      // .orderBy('posts.id', 'DESC')
      .orderBy('posts.published_at', 'DESC')
      .where('posts.status IN(:status)', { status })
    if (search !== undefined) {
      query.orWhere('posts.title like :title', { title: `%${search}%` })
    }
    query.select([
      'posts.id',
      'posts.type',
      'posts.title',
      'thumbnail.id',
      'thumbnail.url',
      'city.id',
      'city.name',
      'posts.published_at'
    ])
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

  public getPostsCount(search?: string, status = [PostsEntity.STATUS.PUBLIC]) {
    const query = dataSource
      .getRepository(PostsEntity)
      .createQueryBuilder('posts')
      .where('posts.status IN(:status)', { status })
    if (search !== undefined) {
      query.andWhere('posts.title like :title', { title: `%${search}%` })
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
