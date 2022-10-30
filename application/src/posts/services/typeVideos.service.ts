import { Service } from 'typedi'
import { dataSource } from '../../dataSource'
import PicturesEntity from '../../common/entities/pictures.entity'
import TypeVideosEntity from '../entities/typeVideos.entity'

@Service()
export default class TypeVideosService {
  public getTypeVideoById(id: number) {
    return dataSource.getRepository(TypeVideosEntity).findOne({ where: { id } })
  }

  public createTypeVideo(
    video_id: string,
    title: string,
    description: string,
    poster?: PicturesEntity
  ) {
    let typeVideo = new TypeVideosEntity()
    typeVideo.video_id = video_id
    typeVideo.poster = poster
    typeVideo.title = title
    typeVideo.description = description
    return typeVideo.save()
  }

  public deleteTypeVideo(id: string) {
    return dataSource.getRepository(TypeVideosEntity).delete(id)
  }
}
