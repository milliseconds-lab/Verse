import express, { Request, Response } from 'express'
import { Container } from 'typedi'
import moment from 'moment'
import UsersEntity from '../../../users/entities/users.entity'
import PostsEntity from '../../../posts/entities/posts.entity'
import TypeImagesEntity from '../../../posts/entities/typeImages.entity'
import TypeVideosEntity from '../../../posts/entities/typeVideos.entity'
import TypeArticlesEntity from '../../../posts/entities/typeArticles.entity'
import PostsService from '../../../posts/services/posts.service'
import PicturesService from '../../../common/services/pictures.service'
import CityService from '../../../posts/services/city.service'
// import TypeImagesService from '../../../posts/services/typeImages.service'
// import TypeVideosService from '../../../posts/services/typeVideos.service'
// import TypeArticlesService from '../../../posts/services/typeArticles.service'
import { APIErrorResult, APIResult } from '../APIResult'
import APIUtils from '../../../utils/APIUtils'

const router = express.Router()

enum MODE {
  NEW = 'new',
  EDIT = 'edit'
}

enum CONTENT_TYPE {
  PARAGRAPH = 'paragraph',
  FIGURE = 'figure'
}

const COUNT_PER_PAGE = 20

/* ---- API - Posts ---- */
router.get('/posts/list', async (req: Request, res: Response) => {
  const page =
    req.query.page !== undefined
      ? APIUtils.numberOrThrow(Number(req.query.page))
      : 1
  const offset = page > 1 ? COUNT_PER_PAGE * (page - 1) : 0
  const status =
    req.query.role !== undefined &&
    Number(req.query.role) === UsersEntity.ROLE.OWNER
      ? [PostsEntity.STATUS.PUBLIC, PostsEntity.STATUS.PRIVATE]
      : [PostsEntity.STATUS.PUBLIC]
  const postsService = Container.get(PostsService)
  const posts: PostsEntity[] = await postsService.getPostsList(
    undefined,
    offset,
    COUNT_PER_PAGE,
    status
  )
  const total = await postsService.getPostsCount(undefined, status)
  res.json(APIResult({ posts, total, page }))
})

router.post('/post/create', async (req: Request, res: Response) => {
  const {
    type,
    thumbnail,
    title,
    status,
    city,
    image_content,
    video_content,
    article_content
  } = await setPostsData(req.body)
  const postsService = Container.get(PostsService)
  try {
    let _image_content = null
    let _video_content = null
    let _article_content = null
    if (type === PostsEntity.TYPE.IMAGE) {
      const typeImage = new TypeImagesEntity()
      typeImage.image = image_content.image
      typeImage.title = image_content.title
      typeImage.description = image_content.description
      _image_content = await typeImage.save()
    }
    if (type === PostsEntity.TYPE.VIDEO) {
      const typeVideo = new TypeVideosEntity()
      typeVideo.video_id = video_content.video_id
      typeVideo.poster = video_content.poster
      typeVideo.title = video_content.title
      typeVideo.description = video_content.description
      _video_content = await typeVideo.save()
    }
    if (type === PostsEntity.TYPE.ARTICLE) {
      const typeArticle = new TypeArticlesEntity()
      typeArticle.cover = article_content.cover
      typeArticle.title = article_content.title
      typeArticle.overview = article_content.overview
      typeArticle.content = article_content.content
      _article_content = await typeArticle.save()
    }
    const post = await postsService.createPost(
      type,
      thumbnail,
      title,
      status,
      city,
      _image_content,
      _video_content,
      _article_content
    )
    res.json(APIResult({ id: post.id }))
  } catch (error) {
    res.status(500).json(APIErrorResult(error.message))
  }
})

router.get('/post/:post_id', async (req: Request, res: Response) => {
  const id = APIUtils.numberOrThrow(Number(req.params.post_id))
  const status =
    req.query.role !== undefined &&
    Number(req.query.role) === UsersEntity.ROLE.OWNER
      ? [PostsEntity.STATUS.PUBLIC, PostsEntity.STATUS.PRIVATE]
      : [PostsEntity.STATUS.PUBLIC]
  const postsService = Container.get(PostsService)
  try {
    const post = await postsService.getPostById(id, status)
    const previousPost = await postsService.getPreviousPostById(id, status)
    const nextPost = await postsService.getNextPostById(id, status)
    const pagination = {
      previous: previousPost,
      next: nextPost
    }
    if (post) {
      res.json(APIResult({ post, pagination }))
    } else {
      res.status(500).json(APIErrorResult('Post not found.'))
    }
  } catch (error) {
    res.status(500).json(APIErrorResult(error.message))
  }
})

router.patch('/post/:post_id', (req: Request, res: Response) => {
  res.json(APIResult({}))
})

router.delete('/post/:post_id', async (req: Request, res: Response) => {
  const { post_id } = req.params
  const id = Number(post_id)
  const postsService = Container.get(PostsService)
  try {
    await postsService.deletePost(id)
    res.json(APIResult({ result: true }))
  } catch (error) {
    res.status(500).json(APIErrorResult(error.message))
  }
})

const setPostsData = async (body: any, mode: MODE = MODE.NEW) => {
  const {
    type = PostsEntity.TYPE.IMAGE,
    thumbnail: thumbnail_id,
    title,
    city: city_id,
    image_content: image_content_data = null,
    video_content: video_content_data = null,
    article_content: article_content_data = null,
    published_at = moment().unix(),
    status
  } = body
  if (mode === MODE.NEW) {
  }
  const picturesService = Container.get(PicturesService)
  const thumbnail = await picturesService.getPictureById(thumbnail_id)
  const cityService = Container.get(CityService)
  const city = await cityService.getCityById(city_id)
  let image_content = null
  let video_content = null
  let article_content = null
  if (image_content_data !== null) {
    const image = await picturesService.getPictureById(image_content_data.image)
    image_content = {
      id: image_content_data.id || null,
      image,
      title: image_content_data.title,
      description: image_content_data.description
    }
  }
  if (video_content_data !== null) {
    const poster = await picturesService.getPictureById(
      video_content_data.poster
    )
    video_content = {
      id: video_content_data.id || null,
      video_id: video_content_data.video_id,
      poster,
      title: video_content_data.title,
      description: video_content_data.description
    }
  }
  if (article_content_data !== null) {
    const cover = await picturesService.getPictureById(
      article_content_data.cover
    )
    const content = await Promise.all(
      article_content_data.content.map(async (item) => {
        const { type, image } = item
        // const image = await picturesService.getPictureById(image_id)
        if (type === CONTENT_TYPE.FIGURE) {
          return {
            ...item,
            image
          }
        }
        return item
      })
    )
    article_content = {
      id: article_content_data.id || null,
      cover,
      title: article_content_data.title,
      overview: article_content_data.overview,
      content
    }
  }
  return {
    type,
    thumbnail,
    title,
    city,
    image_content,
    video_content,
    article_content,
    published_at,
    status
  }
}

export default router
