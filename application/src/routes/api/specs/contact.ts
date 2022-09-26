import express, { Request, Response } from 'express'
import { Container } from 'typedi'
import { APIResult } from '../APIResult'
import RequestService from '../../../request/services/request.service'

const router = express.Router()

/* ---- API - Contact ---- */
/**
 * @swagger
 *     components:
 *         schemas:
 *             Request:
 *                 type: object
 *                 required:
 *                     - name
 *                     - email
 *                     - phone
 *                     - company
 *                     - message
 *                 properties:
 *                     name:
 *                         type: string
 *                         description:
 *                     email:
 *                         type: string
 *                         description:
 *                     phone:
 *                         type: boolean
 *                         description:
 *                     company:
 *                         type: string
 *                         description:
 *                     message:
 *                         type: string
 *                         description:
 *                         *
 *                     example:
 *                         title:
 *                         author:
 *                         finished: true
 */
/**
 *  @swagger
 *  tags:
 *    name: Request
 *    description:
 */
/**
 *  @swagger
 *  paths:
 *   /request:
 *     get:
 *       summary: Lists all the requests
 *       tags: [Request]
 *       responses:
 *         "200":
 *           description:
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Request'
 *     post:
 *       summary: Creates a new request
 *       tags: [Request]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Request'
 *       responses:
 *         "200":
 *           description:
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Request'
 */
router.post('/request', async (req: Request, res: Response) => {
  let { name, email, phone, company, message } = req.body
  const service = Container.get(RequestService)
  const request = await service.createRequest(
    name,
    email,
    phone,
    company,
    message
  )
  res.json(APIResult(request))
})

export default router
