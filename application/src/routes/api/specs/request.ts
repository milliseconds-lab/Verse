import express, { Request, Response } from 'express'
import { Container } from 'typedi'
import RequestService from '../../../request/services/request.service'
import RequestEntity from '../../../request/entities/request.entity'
import { APIErrorResult, APIResult } from '../APIResult'
import APIUtils from '../../../utils/APIUtils'

const router = express.Router()

const COUNT_PER_PAGE = 20

/* ---- API - Contact ---- */
router.get('/request/list', async (req: Request, res: Response) => {
  const page =
    req.query.page !== undefined
      ? APIUtils.numberOrThrow(Number(req.query.page))
      : 1
  const offset = page > 1 ? COUNT_PER_PAGE * (page - 1) : 0
  const requestsService = Container.get(RequestService)
  const requests: RequestEntity[] = await requestsService.getRequestList(
    undefined,
    offset,
    COUNT_PER_PAGE
  )
  const total = await requestsService.getRequestCount()
  res.json(APIResult({ requests, total, page }))
})

router.post('/request/new', async (req: Request, res: Response) => {
  let { name, email, phone, company, message } = req.body
  const requestsService = Container.get(RequestService)
  const request = await requestsService.createRequest(
    name,
    email,
    phone,
    company,
    message
  )
  res.json(APIResult({ id: request.id }))
})

router.get('/request/:request_id', async (req: Request, res: Response) => {
  const id = APIUtils.numberOrThrow(Number(req.params.request_id))
  const requestsService = Container.get(RequestService)
  try {
    const request = await requestsService.getRequestById(id)
    if (request) {
      res.json(APIResult({ request }))
    } else {
      res.status(500).json(APIErrorResult('Request not found.'))
    }
  } catch (error) {
    res.status(500).json(APIErrorResult(error.message))
  }
})

router.delete('/request/:request_id', async (req: Request, res: Response) => {
  const id = APIUtils.numberOrThrow(Number(req.params.request_id))
  const requestsService = Container.get(RequestService)
  try {
    await requestsService.deleteRequest(id)
    res.json(APIResult({ result: true }))
  } catch (error) {
    res.status(500).json(APIErrorResult(error.message))
  }
})
export default router
