import express, { Request, Response } from 'express'
import { Container } from 'typedi'
import { APIResult } from '../APIResult'
import RequestService from '../../../request/services/request.service'

const router = express.Router()

/* ---- API - Contact ---- */
router.get('/requests', async (req: Request, res: Response) => {
  res.json(APIResult([]))
})

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

router.get('/request/:request_id', (req: Request, res: Response) => {
  res.json(APIResult({}))
})

router.delete('/request/:request_id', (req: Request, res: Response) => {
  res.json(APIResult({}))
})
export default router
