import { Injectable } from '@nestjs/common';
import { IUserProfile } from './interfaces/user-profile.interface';
import FetchBaseService from './fetch-base.service';

@Injectable()
export class FetchUserProfileService extends FetchBaseService {
  fetch(): Promise<IUserProfile> {
    return this.makeHttpRequest<void, IUserProfile>('get', '/users/profile');
  }
}
