import { Service } from 'typedi'
import { dataSource } from '../../dataSource'
import PicturesEntity from '../../common/entities/pictures.entity'
import TypeArticlesEntity from '../entities/typeArticles.entity'

@Service()
export default class TypeArticlesService {
  public getTypeArticleById(id: number) {
    // return dataSource
    //   .getRepository(TypeArticlesEntity)
    //   .findOne({ where: { id } })
    const query = dataSource
      .getRepository(TypeArticlesEntity)
      .createQueryBuilder('type_articles')
      .leftJoinAndSelect('type_articles.cover', 'cover')
      .where({ id })
    return query.getOne()
  }

  public createTypeArticle(
    cover: PicturesEntity,
    title: string,
    overview: string,
    content: any
  ) {
    let typeArticle = new TypeArticlesEntity()
    typeArticle.cover = cover
    typeArticle.title = title
    typeArticle.overview = overview
    typeArticle.content = content
    return typeArticle.save()
  }

  public updateTypeArticle(
    id: number,
    cover: PicturesEntity,
    title: string,
    overview: string,
    content: any
  ) {
    return dataSource.getRepository(TypeArticlesEntity).update(id, {
      cover,
      title,
      overview,
      content
    })
  }

  public deleteTypeArticle(id: string) {
    return dataSource.getRepository(TypeArticlesEntity).delete(id)
  }
}
