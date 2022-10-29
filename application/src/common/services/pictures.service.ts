import { Service } from 'typedi'
import * as fs from 'fs'
import config from '../../../config'
import { dataSource } from '../../dataSource'
import PicturesEntity from '../entities/pictures.entity'

@Service()
export default class PicturesService {
  public getPictureById(id: number) {
    return dataSource.getRepository(PicturesEntity).findOne({ where: { id } })
  }

  public addPicture(
    name: string,
    storedName: string,
    storedPath: string,
    url: string,
    mimeType: string
  ) {
    if (!storedPath.startsWith('public/')) {
      let idx = storedPath.lastIndexOf('public/')
      storedPath = storedPath.substring(idx)
    }
    let picture = new PicturesEntity()
    picture.name = name
    picture.stored_name = storedName
    picture.stored_path = storedPath
    picture.url = url
    picture.mime_type = mimeType
    return picture.save()
  }

  /*
   * local 경로에 업로드
   */
  // public addUploadFile(uploadFile: any) {
  //   if (uploadFile !== undefined) {
  //     let url = `${uploadFile.destination}/${uploadFile.filename}`
  //     let idx = uploadFile.destination.lastIndexOf('public/')
  //     if (idx >= 0) {
  //       url = url.substring(idx + 6)
  //     }
  //     return this.addPicture(
  //       uploadFile.originalname,
  //       uploadFile.filename,
  //       uploadFile.destination,
  //       url,
  //       uploadFile.mimetype
  //     )
  //   }
  // }

  /*
   * S3 bucket 경로에 업로드
   */
  public addUploadFile(uploadFile: any) {
    if (uploadFile !== undefined) {
      const { originalname: name, key, location: url, mimetype } = uploadFile
      const storedPath = config.S3_DIRECTORY
      const storedName = key.replace(`${storedPath}/`, '')
      return this.addPicture(name, storedName, storedPath, url, mimetype)
    }
  }

  public removePicture(picture: PicturesEntity) {
    return dataSource.getRepository(PicturesEntity).remove(picture)
  }
}
