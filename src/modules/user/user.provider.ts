import { Users } from './user.entity';

export const UsersProvider = {
  provide: 'USERS_REPOSITORY',
  useValue: Users
}