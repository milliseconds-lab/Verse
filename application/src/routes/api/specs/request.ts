import { Router, Request, Response } from 'express'
import { Container } from 'typedi'
import RequestService from '../../../request/services/request.service'
import { APIErrorResult, APIResult } from '../APIResult'
import APIUtils from '../../../utils/APIUtils'

const router = Router()

const COUNT_PER_PAGE = 20

/* ---- API - Requests ---- */
router.get('/request/list', async (req: Request, res: Response) => {
  const page =
    req.query.page !== undefined
      ? APIUtils.numberOrThrow(Number(req.query.page))
      : 1
  const offset = page > 1 ? COUNT_PER_PAGE * (page - 1) : 0
  const requestsService = Container.get(RequestService)
  const requests = await requestsService.getRequestList(
    undefined,
    offset,
    COUNT_PER_PAGE
  )
  const total = await requestsService.getRequestCount()
  return res.json(APIResult({ requests, total, page }))
})

router.post('/request/new', async (req: Request, res: Response) => {
  let { name, email, phone, company, message } = req.body
  if (name === undefined || name.trim() === '') {
    return res.status(500).json(APIErrorResult('Please enter a name.'))
  }
  if (email === undefined || email.trim() === '') {
    return res.status(500).json(APIErrorResult('Please enter a email.'))
  }
  if (phone === undefined || phone.trim() === '') {
    return res.status(500).json(APIErrorResult('Please enter a phone.'))
  }
  if (message === undefined || message.trim() === '') {
    return res.status(500).json(APIErrorResult('Please enter a message.'))
  }
  const requestsService = Container.get(RequestService)
  const request = await requestsService.createRequest(
    name,
    email,
    phone,
    message,
    company
  )
  return res.json(APIResult({ id: request.id }))
})

router.get('/request/:request_id', async (req: Request, res: Response) => {
  const id = APIUtils.numberOrThrow(Number(req.params.request_id))
  const requestsService = Container.get(RequestService)
  try {
    const request = await requestsService.getRequestById(id)
    if (request !== undefined && request !== null) {
      return res.json(APIResult({ request }))
    }
    return res.status(500).json(APIErrorResult('Request not found.'))
  } catch (error) {
    return res.status(500).json(APIErrorResult(error.message))
  }
})

router.delete('/request/:request_id', async (req: Request, res: Response) => {
  const id = APIUtils.numberOrThrow(Number(req.params.request_id))
  const requestsService = Container.get(RequestService)
  try {
    await requestsService.deleteRequest(id)
    return res.json(APIResult({ result: true }))
  } catch (error) {
    return res.status(500).json(APIErrorResult(error.message))
  }
})

export default router
