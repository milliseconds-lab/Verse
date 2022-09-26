import express, { Request, Response } from 'express'
import { APIResult } from '../APIResult'

const router = express.Router()

// const COUNT_PER_PAGE = 20

/* ---- API - Posts ---- */
router.get('/archive', async (req: Request, res: Response) => {
  // const page = req.query.page !== undefined ? Number(req.query.page) : 1
  // const offset = page > 1 ? COUNT_PER_PAGE * (page - 1) : 0
  res.json(APIResult([]))
})

router.post('/post', (req: Request, res: Response) => {
  res.json(APIResult({}))
})

router.get('/post/:post_id', (req: Request, res: Response) => {
  res.json(APIResult({}))
})

router.post('/post/:post_id', (req: Request, res: Response) => {
  res.json(APIResult({}))
})

router.delete('/post/:post_id', (req: Request, res: Response) => {
  res.json(APIResult({}))
})

/**
 * @swagger
 *  components:
 *    schemas:
 *      Posts:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - phone
 *          - company
 *          - message
 *        properties:
 *          name:
 *            type: string
 *            description:
 *         email:
 *            type: string
 *            description:
 *         phone:
 *            type: boolean
 *            description:
 *         company:
 *            type: string
 *            description:
 *         message:
 *            type: string
 *            description:
 *            *
 *         example:
 *            title:
 *            author:
 *            finished: true
 */
/**
 * @swagger
 *  tags:
 *    name: Posts
 *    description:
 */
/**
 * @swagger
 *  paths:
 *  /archive:
 *    get:
 *      summary: Archive - Lists all the posts
 *      tags: [Posts]
 *      responses:
 *        "200":
 *          description:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Posts'
 *  /post:
 *    get:
 *      summary: Archive - Lists all the posts
 *      tags: [Posts]
 *      responses:
 *        "200":
 *          description:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Posts'
 *    post:
 *      summary: Creates a new post
 *      tags: [Posts]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Posts'
 *      responses:
 *        "200":
 *          description:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Posts'
 */
export default router
