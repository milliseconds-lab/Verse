import { Service } from 'typedi'
import { passwordHash } from '../../utils/passwordHash'
import { dataSource } from '../../dataSource'
import UsersEntity from '../entities/users.entity'

@Service()
export default class UsersService {
  public getUserById(id: number) {
    return dataSource.getRepository(UsersEntity).findOne({ where: { id } })
  }

  public getUserByIdWithActiveStatus(id: number) {
    const query = dataSource
      .getRepository(UsersEntity)
      .createQueryBuilder('users')
      .select([
        'users.id',
        'users.user_id',
        'users.name',
        'users.nickname',
        'users.email',
        'users.role'
      ])
      .where({ status: UsersEntity.STATUS.ACTIVE })
      .andWhere({ id })
    return query.getOne()
  }

  public getUsersList(search?: string, offset?: number, limit?: number) {
    const query = dataSource
      .getRepository(UsersEntity)
      .createQueryBuilder('users')
      .select([
        'users.id',
        'users.user_id',
        'users.name',
        'users.nickname',
        'users.email',
        'users.role'
      ])
      .where({ status: UsersEntity.STATUS.ACTIVE })
    if (search !== undefined) {
      query.andWhere('users.name like :name', { name: `%${search}%` })
    }
    query.orderBy('users.id', 'DESC')
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

  public getUsersCount(search?: string) {
    const query = dataSource
      .getRepository(UsersEntity)
      .createQueryBuilder('users')
      .where({ status: UsersEntity.STATUS.ACTIVE })
    if (search !== undefined) {
      query.andWhere('users.name like :name', { name: `%${search}%` })
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

  public removeUser(user: UsersEntity) {
    return dataSource.getRepository(UsersEntity).remove(user)
  }

  public withdrawUser(id: number) {
    return dataSource
      .getRepository(UsersEntity)
      .update(id, { status: UsersEntity.STATUS.WITHDRAW })
  }
}
