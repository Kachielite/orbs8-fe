import { UserEntity } from '@/features/user/domain/entity/user.entity';

export type UserSlice = {
  //state
  user: UserEntity | null;
  //actions
  setUser: (user: UserEntity) => void;
};
