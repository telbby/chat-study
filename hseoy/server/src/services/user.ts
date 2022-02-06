import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import UserRepository from '../repositories/user';
import ErrorResponse from '../utils/error-response';
import { commonError } from '../constants/error';
import { CreatedUserInfo, UserInfo } from '../types';
import { generateHash } from '../utils/bcrypt';

@Service()
class UserService {
  private userRepository: UserRepository;

  constructor(@InjectRepository(UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAdminUser(userId: string): Promise<CreatedUserInfo> {
    const user = await this.userRepository.findBy({ userId, permission: 'ADMIN' });
    if (!user) {
      throw new ErrorResponse(commonError.unauthorized);
    }
    const { uid, permission, loggedInAt, createdAt } = user;
    return {
      userId,
      uid,
      permission,
      loggedInAt: new Date(loggedInAt),
      createdAt: new Date(createdAt),
    };
  }

  async createAdminUser(userInfo: UserInfo): Promise<CreatedUserInfo> {
    const alreadyRegisteredUser = await this.userRepository.findBy({
      userId: userInfo.userId,
      permission: 'ADMIN',
    });
    if (alreadyRegisteredUser) {
      throw new ErrorResponse(commonError.conflict);
    }

    const hashedPassword = generateHash(userInfo.password);

    const userInfoToCreate: UserInfo = { ...userInfo, password: hashedPassword };
    const { userId, uid, permission, loggedInAt, createdAt } = await this.userRepository.createUser(
      {
        ...userInfoToCreate,
        permission: 'ADMIN',
      },
    );

    return {
      userId,
      uid,
      permission,
      loggedInAt: new Date(loggedInAt),
      createdAt: new Date(createdAt),
    };
  }

  async createGuestUser(): Promise<CreatedUserInfo> {
    const { uid, permission, loggedInAt, createdAt } = await this.userRepository.createUser({
      permission: 'GUEST',
    });
    return { uid, permission, loggedInAt: new Date(loggedInAt), createdAt: new Date(createdAt) };
  }

  async deleteAdminUser(userId: string): Promise<void> {
    const user = await this.userRepository.findBy({ userId, permission: 'ADMIN' });
    if (!user) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    await this.userRepository.removeBy({ userId });
  }

  async deleteGuestUser(uid: string): Promise<void> {
    const user = await this.userRepository.findBy({ uid, permission: 'GUEST' });
    if (!user) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    await this.userRepository.removeBy({ uid });
  }
}

export default UserService;
