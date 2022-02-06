import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { commonError } from '../constants/error';
import UserRepository from '../repositories/user';
import { CreatedUserInfo, AdminUserLoginInfo } from '../types';
import { comparePassword } from '../utils/bcrypt';
import ErrorResponse from '../utils/error-response';

@Service()
class AuthService {
  private userRepository: UserRepository;

  constructor(@InjectRepository(UserRepository) userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async adminLogin({ userId, password }: AdminUserLoginInfo): Promise<CreatedUserInfo> {
    const user = await this.userRepository.findBy({ userId, permission: 'ADMIN' });
    if (!user) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    const isValid = comparePassword(user.password, password);
    if (!isValid) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    await this.userRepository.updateLoggedInAt(user);

    const { uid, permission, loggedInAt, createdAt } = user;
    return {
      uid,
      userId,
      permission,
      loggedInAt: new Date(loggedInAt),
      createdAt: new Date(createdAt),
    };
  }

  async guestLogin(uid: string): Promise<CreatedUserInfo> {
    const user = await this.userRepository.findBy({ uid, permission: 'GUEST' });
    if (!user) {
      throw new ErrorResponse(commonError.unauthorized);
    }

    await this.userRepository.updateLoggedInAt(user);

    const { permission, loggedInAt, createdAt } = user;
    return { uid, permission, loggedInAt: new Date(loggedInAt), createdAt: new Date(createdAt) };
  }
}

export default AuthService;
