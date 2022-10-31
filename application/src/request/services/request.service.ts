import { Service } from 'typedi'
import { dataSource } from '../../dataSource'
import RequestEntity from '../entities/request.entity'

@Service()
export default class RequestService {
  public getRequestById(id: number) {
    // return dataSource.getRepository(RequestEntity).findOne({ where: { id } })
    const query = dataSource
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .select([
        'request.id',
        'request.name',
        'request.email',
        'request.phone',
        'request.company',
        'request.message'
      ])
      .where({ id })
    return query.getOne()
  }

  public getRequestList(search?: string, offset?: number, limit?: number) {
    const query = dataSource
      .getRepository(RequestEntity)
      .createQueryBuilder('request')
      .select([
        'request.id',
        'request.name',
        'request.email',
        'request.phone'
      ])
    if (search !== undefined) {
      query.where('request.name like :name', { name: `%${search}%` })
      query.orWhere('request.message like :message', { message: `%${search}%` })
    }
    query.orderBy('request.id', 'DESC')
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

  public getRequestCount() {
    return dataSource.getRepository(RequestEntity).count()
  }

  public createRequest(
    name: string,
    email: string,
    phone: string,
    message: string,
    company?: string
  ) {
    let request = new RequestEntity()
    request.name = name
    request.email = email
    request.phone = phone
    request.company = company
    request.message = message
    return request.save()
  }

  public deleteRequest(id: number) {
    return dataSource.getRepository(RequestEntity).delete(id)
  }
}
