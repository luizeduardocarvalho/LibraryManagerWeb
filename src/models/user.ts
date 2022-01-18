export class User {
    email: string;
    password: string;
    token: string;
    user: {};

  constructor(email: string, password: string, token: string, user: {}) {
    this.email = email
    this.password = password
    this.token = token
    this.user = user
    }
}