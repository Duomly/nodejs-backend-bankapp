import { Users } from './user.entity';

export const UsersProviders = {
  provide: 'USERS_REPOSITORY',
  useValue: Users
}