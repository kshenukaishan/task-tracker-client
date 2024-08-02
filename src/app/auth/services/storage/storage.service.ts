import { Injectable } from '@angular/core';

const TOKEN = 'token';
const USER = 'user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getTtoken(): string | any {
    return localStorage.getItem(TOKEN);
  }

  static getUser(): any | null {
    let newUser = localStorage.getItem(USER);
    if (newUser != null) {
      return JSON.parse(newUser);
    } else {
      return null;
    }
  }

  static getUserRole(): string {
    let user = this.getUser();

    if (user == null) {
      return '';
    } else {
      return user.role;
    }
  }

  static isAdminLogged(): boolean {
    if (this.getTtoken() === null) {
      return false;
    } else {
      const role: string = this.getTtoken();
      return role == 'ADMIN';
    }
  }

  static isUserLogged(): boolean {
    if (this.getTtoken() === null) {
      return false;
    } else {
      const role: string = this.getTtoken();
      return role == 'USER';
    }
  }

  static getUserId(): string {
    const user = this.getUser();

    if (user === null) {
      return '';
    } else {
      return user.id;
    }
  }

  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
