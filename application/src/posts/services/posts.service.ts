import { Service } from 'typedi'
import { dataSource } from '../../dataSource'
import PostsEntity from '../entities/posts.entity'

@Service()
export default class PostsService {
  public getPostById(id: number) {
    const query = dataSource
      .getRepository(PostsEntity)
      .createQueryBuilder('posts')
      .where('posts.id = :id', { id })

    return query.getOne()
  }

  public getPostsList(search?: string, offset?: number, limit?: number) {
    const query = dataSource
      .getRepository(PostsEntity)
      .createQueryBuilder('posts')
      .addOrderBy('posts.id', 'DESC')
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

  public getPostsCount() {
    return dataSource.getRepository(PostsEntity).count()
  }

  public createPost() {}

  public deletePost(id: number) {
    return dataSource.getRepository(PostsEntity).delete(id)
  }
}
