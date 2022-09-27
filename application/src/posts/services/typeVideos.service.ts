import { Service } from 'typedi'
import { dataSource } from '../../dataSource'
import TypeVideosEntity from '../entities/typeVideos.entity'

@Service()
export default class TypeVideosService {
  public getTypeVideoById(id: number) {
    const query = dataSource
      .getRepository(TypeVideosEntity)
      .createQueryBuilder('type_videos')
      .where('type_videos.id = :id', { id })
    return query.getOne()
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
