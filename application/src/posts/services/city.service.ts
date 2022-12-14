import { Service } from 'typedi'
import { dataSource } from '../../dataSource'
import CityEntity from '../entities/city.entity'

@Service()
export default class CityService {
  public getCityById(id: number) {
    // return dataSource.getRepository(CityEntity).findOne({ where: { id } })
    const query = dataSource
      .getRepository(CityEntity)
      .createQueryBuilder('city')
      .select(['city.id', 'city.name'])
      .where({ id })
    return query.getOne()
  }

  public getPreviousCityById(id: number) {
    const query = dataSource
      .getRepository(CityEntity)
      .createQueryBuilder('city')
      .select(['city.id', 'city.name'])
      .where('city.id < :id', { id })
    return query.getOne()
  }

  public getNextCityById(id: number) {
    const query = dataSource
      .getRepository(CityEntity)
      .createQueryBuilder('city')
      .select(['city.id', 'city.name'])
      .where('city.id > :id', { id })
    return query.getOne()
  }

  public getCityByName(name: string) {
    // return dataSource.getRepository(CityEntity).findOne({ where: { name } })
    const query = dataSource
      .getRepository(CityEntity)
      .createQueryBuilder('city')
      .select(['city.id', 'city.name'])
      .where({ name })
    return query.getOne()
  }

  public getCityList(search?: string, offset?: number, limit?: number) {
    const query = dataSource
      .getRepository(CityEntity)
      .createQueryBuilder('city')
      .select(['city.id', 'city.name'])
    if (search !== undefined) {
      query.where('city.name like :name', { name: `%${search}%` })
    }
    query.orderBy('city.id', 'DESC')
    if (
      offset !== undefined &&
      typeof offset === 'number' &&
      offset >= 0 &&
      limit !== undefined &&
      typeof limit === 'number' &&
      limit >= 0
    ) {
      // query.offset(offset)
      // query.limit(limit)
      query.skip(offset)
      query.take(limit)
    }
    return query.getMany()
  }

  public getCityCount() {
    return dataSource.getRepository(CityEntity).count()
  }

  public createCity(name: string) {
    let city = new CityEntity()
    city.name = name
    return city.save()
  }

  public updateCity(id: number, name: string) {
    return dataSource.getRepository(CityEntity).update(id, {
      name
    })
  }

  public deleteCity(id: number) {
    return dataSource.getRepository(CityEntity).delete(id)
  }
}
