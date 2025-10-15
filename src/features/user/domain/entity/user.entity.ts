export class UserEntity {
  public id: string;
  public email: string;
  public name: string;
  public emailLinked: boolean;
  public preferredCurrency: string;

  constructor(
    id: string,
    email: string,
    name: string,
    emailLinked: boolean,
    preferredCurrency: string
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.emailLinked = emailLinked;
    this.preferredCurrency = preferredCurrency;
  }
}
