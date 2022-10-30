import { Router, Request, Response } from 'express'
import { Container } from 'typedi'
import CityService from '../../../posts/services/city.service'
import { APIErrorResult, APIResult } from '../APIResult'
import APIUtils from '../../../utils/APIUtils'

const router = Router()

const COUNT_PER_PAGE = 20

/* ---- API - City ---- */
router.get('/city/list', async (req: Request, res: Response) => {
  const page =
    req.query.page !== undefined
      ? APIUtils.numberOrThrow(Number(req.query.page))
      : 1
  const offset = page > 1 ? COUNT_PER_PAGE * (page - 1) : 0
  const cityService = Container.get(CityService)
  const city = await cityService.getCityList(undefined, offset, COUNT_PER_PAGE)
  const total = await cityService.getCityCount()
  return res.json(APIResult({ city, total, page }))
})

router.post('/city/create', async (req: Request, res: Response) => {
  const { name } = req.body
  if (name === undefined || name.trim() === '') {
    return res.status(500).json(APIErrorResult('Please enter a name.'))
  }
  const cityService = Container.get(CityService)
  const existCity = await cityService.getCityByName(name)
  if (existCity !== undefined && existCity !== null) {
    return res.status(500).json(APIErrorResult('The city already exists.'))
  }
  try {
    const city = await cityService.createCity(name)
    return res.json(APIResult({ id: city.id }))
  } catch (error) {
    return res.status(500).json(APIErrorResult(error.message))
  }
})

router.get('/city/:city_id', async (req: Request, res: Response) => {
  const id = APIUtils.numberOrThrow(Number(req.params.city_id))
  const cityService = Container.get(CityService)
  try {
    const city = await cityService.getCityById(id)
    if (city !== undefined && city !== null) {
      return res.json(APIResult({ city }))
    }
    return res.status(500).json(APIErrorResult('City not found.'))
  } catch (error) {
    return res.status(500).json(APIErrorResult(error.message))
  }
})

router.patch('/city/:city_id', async (req: Request, res: Response) => {
  const { name } = req.body
  const id = APIUtils.numberOrThrow(Number(req.params.city_id))
  if (name === undefined || name.trim() === '') {
    return res.status(500).json(APIErrorResult('Please enter a name.'))
  }
  const cityService = Container.get(CityService)
  const existCity = await cityService.getCityByName(name)
  if (existCity !== undefined && existCity !== null && existCity.id !== id) {
    return res.status(500).json(APIErrorResult('The same city exists.'))
  }
  try {
    await cityService.updateCity(id, name)
    return res.json(APIResult({ result: true }))
  } catch (error) {
    return res.status(500).json(APIErrorResult(error.message))
  }
})

router.delete('/city/:city_id', async (req: Request, res: Response) => {
  const id = APIUtils.numberOrThrow(Number(req.params.city_id))
  const cityService = Container.get(CityService)
  try {
    await cityService.deleteCity(id)
    return res.json(APIResult({ result: true }))
  } catch (error) {
    return res.status(500).json(APIErrorResult(error.message))
  }
})

export default router
