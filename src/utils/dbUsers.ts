import { User } from 'types/user.type';

export class dbUsers {
  private static users: User[] = [];

  static getUsers(id?: string): User | User[] | undefined {
    return id ? this.users.find((user) => user.id === id) : this.users;
  }

  static addUsers(user: User): User {
    this.users.push(user);
    return user;
  }

  static updateUser(user: User): User | void {
    const userId = user.id;
    let idxOfUserInArray;
    this.users.forEach((dbUser, idx) => {
      if (dbUser.id === userId) {
        idxOfUserInArray = idx;
      }
    });

    if (idxOfUserInArray) {
      this.users[idxOfUserInArray] = user;
      return this.users[idxOfUserInArray];
    }
  }
}
