import * as fs from 'fs'
import config from '../../../config'
import { dataSource } from '../../dataSource'
import PicturesEntity from '../entities/pictures.entity'

export default class PicturesRepository {
  public getPicture(id: number) {
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

  public addUploadFile(uploadFiles: any, fieldName: string) {
    // TODO :: S3 bucket 에 업로드 필요.
    if (uploadFiles.length > 0) {
      let imageFile = uploadFiles.find((file) => file.fieldname === fieldName)
      if (imageFile !== undefined) {
        let url = `${imageFile.destination}/${imageFile.filename}`
        let idx = imageFile.destination.lastIndexOf('public/')
        if (idx >= 0) {
          url = url.substring(idx + 6)
        }
        return this.addPicture(
          imageFile.originalname,
          imageFile.filename,
          imageFile.destination,
          url,
          imageFile.mimetype
        )
      }
    }
  }

  public removePicture(picture: PicturesEntity) {
    fs.unlink(`${config.PROJECT_DIR}/${picture.stored_name}`, (res) => {
      console.log(res)
    })
    return dataSource.getRepository(PicturesEntity).remove(picture)
  }
}
