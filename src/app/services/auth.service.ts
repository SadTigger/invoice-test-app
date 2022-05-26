import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private admin: User = { login: 'admin', password: 'admin', role: 'Admin' };

  private guest: User = { login: 'guest', password: 'guest', role: 'Guest' };

  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  isAdmin$ = new BehaviorSubject<boolean>(false);

  isGuest$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private localStorage: LocalStorageService
  ) {}

  isLoggedIn(): Observable<boolean> {
    this.isLoggedIn$.next(!!this.localStorage.getData('logged'));
    return this.isLoggedIn$.asObservable();
  }

  isAdmin(): Observable<boolean> {
    const user = JSON.parse(
      this.localStorage.getData('logged') || '{}'
    ) as User;
    if (user && user.role === 'Admin') {
      this.isAdmin$.next(true);
    }
    return this.isAdmin$.asObservable();
  }

  isGuest(): Observable<boolean> {
    const user = JSON.parse(
      this.localStorage.getData('logged') || '{}'
    ) as User;
    if (user && user.role === 'Guest') {
      this.isGuest$.next(true);
    }
    return this.isGuest$.asObservable();
  }

  login(user: User): Observable<unknown> {
    if (this.isUserValid(user)) {
      this.isLoggedIn$.next(true);
    }
    this.localStorage.setData('logged', JSON.stringify(user));
    this.router.navigate(['/dashboard']);
    return of(null);
  }

  loginAsAdmin() {
    return this.login(this.admin);
  }

  loginAsGuest() {
    return this.login(this.guest);
  }

  logout() {
    this.isLoggedIn$.next(false);
    this.isAdmin$.next(false);
    this.isGuest$.next(false);
    this.localStorage.removeData('logged');
    this.router.navigate(['/auth']);
  }

  isUserValid(user: User) {
    let userValidation = true;
    switch (user.login) {
      case 'admin':
        user.role = 'Admin';
        this.isAdmin$.next(true);
        break;
      case 'guest':
        user.role = 'Guest';
        this.isGuest$.next(true);
        break;
      case 'user':
        user.role = 'Regular_User';
        break;
      default:
        console.log('invalid login');
        userValidation = false;
        break;
    }

    return userValidation ? user : userValidation;
  }
}
