import { Router, Request, Response } from 'express'
import { Container } from 'typedi'
import moment from 'moment'
import UsersEntity from '../../../users/entities/users.entity'
import PostsEntity from '../../../posts/entities/posts.entity'
import PostsService from '../../../posts/services/posts.service'
import PicturesService from '../../../common/services/pictures.service'
import CityService from '../../../posts/services/city.service'
import TypeImagesService from '../../../posts/services/typeImages.service'
import TypeVideosService from '../../../posts/services/typeVideos.service'
import TypeArticlesService from '../../../posts/services/typeArticles.service'
import { APIErrorResult, APIResult } from '../APIResult'
import APIUtils from '../../../utils/APIUtils'

const router = Router()

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
  return res.json(APIResult({ posts, total, page }))
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
  if (type === undefined) {
    return res.status(500).json(APIErrorResult('Please select a type.'))
  }
  if (thumbnail === undefined || thumbnail === null) {
    return res.status(500).json(APIErrorResult('Please upload a thumbnail image.'))
  }
  if (title === undefined || title.trim() === '') {
    return res.status(500).json(APIErrorResult('Please enter a title.'))
  }
  if (status === undefined) {
    return res.status(500).json(APIErrorResult('Please select a status.'))
  }
  if (city === undefined) {
    return res.status(500).json(APIErrorResult('Please select a city.'))
  }
  if (type === PostsEntity.TYPE.IMAGE && (image_content === undefined || image_content === null)) {
    return res.status(500).json(APIErrorResult('Please enter image contents.'))
  }
  if (type === PostsEntity.TYPE.VIDEO && (video_content === undefined || video_content === null)) {
    return res.status(500).json(APIErrorResult('Please enter video contents.'))
  }
  if (type === PostsEntity.TYPE.ARTICLE && (article_content === undefined || article_content === null)) {
    return res.status(500).json(APIErrorResult('Please enter article contents.'))
  }
  const postsService = Container.get(PostsService)
  try {
    let _image_content = null
    let _video_content = null
    let _article_content = null
    if (type === PostsEntity.TYPE.IMAGE) {
      const { image, title, description } = image_content
      const typeImagesService = Container.get(TypeImagesService)
      _image_content = await typeImagesService.createTypeImage(image, title, description)
    }
    if (type === PostsEntity.TYPE.VIDEO) {
      const { video_id, poster, title, description } = video_content
      const typeVideosService = Container.get(TypeVideosService)
      _video_content = await typeVideosService.createTypeVideo(video_id, title, description, poster)
    }
    if (type === PostsEntity.TYPE.ARTICLE) {
      const { cover, title, overview, content } = article_content
      const typeArticlesService = Container.get(TypeArticlesService)
      _article_content = await typeArticlesService.createTypeArticle(cover, title, overview, content)
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
    return res.json(APIResult({ id: post.id }))
  } catch (error) {
    return res.status(500).json(APIErrorResult(error.message))
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
    if (post !== undefined && post !== null) {
      return res.json(APIResult({ post, pagination }))
    }
    return res.status(500).json(APIErrorResult('Post not found.'))
  } catch (error) {
    return res.status(500).json(APIErrorResult(error.message))
  }
})

router.patch('/post/:post_id', (req: Request, res: Response) => {
  res.json(APIResult({}))
})

router.delete('/post/:post_id', async (req: Request, res: Response) => {
  const id = APIUtils.numberOrThrow(Number(req.params.post_id))
  const postsService = Container.get(PostsService)
  try {
    await postsService.deletePost(id)
    return res.json(APIResult({ result: true }))
  } catch (error) {
    return res.status(500).json(APIErrorResult(error.message))
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
