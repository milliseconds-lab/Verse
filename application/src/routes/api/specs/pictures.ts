import { Router, Request, Response } from 'express'
import { Container } from 'typedi'
import path from 'path'
import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import config from '../../../../config'
import PicturesEntity from '../../../common/entities/pictures.entity'
import PicturesService from '../../../common/services/pictures.service'
import { APIErrorResult, APIResult } from '../APIResult'
import APIUtils from '../../../utils/APIUtils'

const router = Router()

/*
 * local 경로에 업로드
 */

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, config.PROJECT_DIR + '/public/upload')
//   // },
//   // filename: function (req, file, cb) {
//   //   cb(null, file.originalname)
//   }
// })
//
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }
// })

/*
 * S3 bucket 경로에 업로드
 */
aws.config.update({
  region: config.AWS_REGION,
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY
})

const s3 = new aws.S3()

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp']

const storage = multerS3({
  s3,
  bucket: config.S3_BUCKET,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  metadata: (req, file, callback) => {
    callback(null, { fieldName: file.fieldname })
  },
  key: (req, file, callback) => {
    const directory = config.S3_DIRECTORY
    const extension = path.extname(file.originalname)
    if (!allowedExtensions.includes(extension)) {
      return callback(new Error('Unsupported extension'))
    }
    callback(null, `${directory}/${Date.now()}_${file.originalname}`)
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }
})


/* ---- API - Pictures ---- */
router.post(
  '/upload',
  upload.single('picture'),
  async (req: Request, res: Response) => {
    const service = Container.get(PicturesService)
    try {
      const { id, url } = await service.addUploadFileWithS3(req.file)
      return res.json(APIResult({ image: { id, url } }))
    } catch (error) {
      return res.status(500).json(APIErrorResult(error.message))
    }
  }
)

router.delete('/image/:image_id', (req: Request, res: Response) => {
  const id = APIUtils.numberOrThrow(Number(req.params.image_id))
  const pictureService = Container.get(PicturesService)
  const s3DeleteObject = async () => {
    try {
      const picture = await pictureService.getPictureById(id)
      const { stored_path: storedPath, stored_name: storedName } = picture
      s3.deleteObject(
        {
          Bucket: config.S3_BUCKET,
          Key: `${storedPath}/${storedName}`
        },
        (error) => {
          if (error) {
            return res
              .status(500)
              .json(APIErrorResult('Failed to delete a S3 Bucket file.'))
          }
          return removePicture(picture)
        }
      )
    } catch (_) {
      return res.status(500).json(APIErrorResult('Image not found.'))
    }
  }
  const removePicture = async (picture: PicturesEntity) => {
    try {
      await pictureService.removePicture(picture)
      return res.json(APIResult({ result: true }))
    } catch (error) {
      return res.status(500).json(APIErrorResult(error.message))
    }
  }
  return s3DeleteObject()
})

export default router
