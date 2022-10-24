import { Service } from 'typedi'
import { dataSource } from '../../dataSource'
import TypeVideosEntity from '../entities/typeVideos.entity'

@Service()
export default class TypeVideosService {
  public getTypeVideoById(id: number) {
    return dataSource.getRepository(TypeVideosEntity).findOne({ where: { id } })
  }

  public createTypeVideo(title: string, description: string) {
    let typeVideo = new TypeVideosEntity()
    typeVideo.title = title
    typeVideo.description = description
    return typeVideo.save()
  }

  public deleteTypeVideo(id: string) {
    return dataSource.getRepository(TypeVideosEntity).delete(id)
  }
}
