import { EntityRepository, Repository } from 'typeorm';

import UserEntity from '../entity/user';
@EntityRepository(UserEntity)
class UserRepository extends Repository<UserEntity> {
  async findBy(userInfo: Partial<UserEntity>): Promise<UserEntity | undefined> {
    const user = await this.findOne({ where: userInfo });
    return user;
  }

  async createUser(userInfo: Partial<UserEntity>): Promise<UserEntity> {
    userInfo.loggedInAt = Date.now();
    userInfo.createdAt = Date.now();
    const newUser = this.create(userInfo);
    const createdUser = await this.save(newUser);
    return createdUser;
  }

  async removeBy(userInfo: Partial<UserEntity>): Promise<void> {
    const user = await this.findBy(userInfo);
    if (user) {
      await this.remove(user);
    }
  }

  async updateLoggedInAt(user: UserEntity): Promise<UserEntity> {
    user.loggedInAt = Date.now();
    const updatedUser = await this.save(user);
    return updatedUser;
  }
}

export default UserRepository;
