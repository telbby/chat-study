import { EntityRepository, Repository } from 'typeorm';

import UserEntity from '../entity/user';

@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {
  async findById(id: number) {
    const user = await this.findOne({ where: { id } });
    return user;
  }
}

export default UserRepository;
