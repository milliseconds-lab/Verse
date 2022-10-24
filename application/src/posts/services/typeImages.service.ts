import { Service } from 'typedi'
import { dataSource } from '../../dataSource'
import TypeImagesEntity from '../entities/typeImages.entity'

@Service()
export default class TypeImagesService {
  public getTypeImageById(id: number) {
    return dataSource.getRepository(TypeImagesEntity).findOne({ where: { id } })
  }

  public createTypeImage(title: string, description: string) {
    let typeImage = new TypeImagesEntity()
    typeImage.title = title
    typeImage.description = description
    return typeImage.save()
  }

  public deleteTypeImage(id: string) {
    return dataSource.getRepository(TypeImagesEntity).delete(id)
  }
}
