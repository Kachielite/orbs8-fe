export class UserEntity {
    public id: string;
    public email: string;
    public name: string;
    public emailLinked: boolean;

    constructor(id: string, email: string, name: string, emailLinked: boolean) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.emailLinked = emailLinked;
    }
}