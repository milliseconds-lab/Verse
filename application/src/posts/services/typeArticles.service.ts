import { Service } from 'typedi'
import { dataSource } from '../../dataSource'
import TypeArticlesEntity from '../entities/typeArticles.entity'

@Service()
export default class TypeArticlesService {
  public createTypeArticle(title: string, overview: string, content: any) {
    let typeArticle = new TypeArticlesEntity()
    typeArticle.title = title
    typeArticle.overview = overview
    typeArticle.content = content
    return typeArticle.save()
  }

  public deleteTypeArticle(id: string) {
    return dataSource.getRepository(TypeArticlesEntity).delete(id)
  }
}
