import { Injectable } from '@nestjs/common';
import { IUserProfile } from './interfaces/user-profile.interface';
import FetchBaseService from './fetch-base.service';

@Injectable()
export class FetchUserProfileService extends FetchBaseService {
  fetch(): Promise<IUserProfile> {
    try {
      return this.makeHttpRequest<unknown, IUserProfile>(
        'get',
        '/users/profile',
      );
    } catch (error) {
      this.logger.error(`Fetch profile failed: ${error}`);
      throw error;
    }
  }
}
