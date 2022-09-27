import { Service } from 'typedi'
import { passwordHash } from '../../utils/passwordHash'
import { dataSource } from '../../dataSource'
import UsersEntity from '../entities/users.entity'

@Service()
export default class UserService {
  public getUserById(id: number) {
    const query = dataSource
      .getRepository(UsersEntity)
      .createQueryBuilder('users')
      .where('users.id = :id', { id })
    return query.getOne()
  }

  public getUsersList(search?: string, offset?: number, limit?: number) {
    const query = dataSource
      .getRepository(UsersEntity)
      .createQueryBuilder('users')
      .orderBy('users.id', 'DESC')
    if (search !== undefined) {
      query.where('users.name like :name', { name: `%${search}%` })
    }
    if (
      offset !== undefined &&
      typeof offset === 'number' &&
      offset >= 0 &&
      limit !== undefined &&
      typeof limit === 'number' &&
      limit >= 0
    ) {
      query.offset(offset)
      query.limit(limit)
    }
    return query.getMany()
  }

  public getUsersCount(search?: string) {
    const query = dataSource
      .getRepository(UsersEntity)
      .createQueryBuilder('users')
    if (search !== undefined) {
      query.where('users.name like :name', { name: `%${search}%` })
    }
    return query.getCount()
  }

  public async login(id: string, password: string) {
    let user = await dataSource.getRepository(UsersEntity).findOne({
      where: { user_id: id }
    })
    if (!user) {
      return Promise.reject('No such user_id')
    }
    if (user.password === passwordHash(password)) {
      return Promise.resolve(user)
    } else {
      return Promise.reject('Password not match')
    }
  }

  public createUser(
    userId: string,
    password: string,
    name: string,
    nickname?: string,
    email?: string
  ) {
    let user = new UsersEntity()
    user.user_id = userId
    user.password = passwordHash(password)
    user.name = name
    if (nickname !== undefined && typeof nickname === 'string') {
      user.nickname = nickname
    }
    if (email !== undefined && typeof email === 'string') {
      user.email = email
    }
    return user.save()
  }

  public deleteUser(id: number) {
    return dataSource.getRepository(UsersEntity).delete(id)
  }
}
