import { UserEntity } from '@/features/user/domain/entity/user.entity';

export class UserModel extends UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public emailLinked: boolean,
    public preferredCurrency: string
  ) {
    super(id, name, email, emailLinked, preferredCurrency);
  }

  static fromJSON(user: UserEntity): UserModel {
    return new UserModel(
      user.id,
      user.name,
      user.email,
      user.emailLinked,
      user.preferredCurrency
    );
  }
}
