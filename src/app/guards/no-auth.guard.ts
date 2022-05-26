import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  CanActivateChild,
  CanLoad,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private router: Router, private auth: AuthService) {}

  checkStatus(): Observable<boolean> {
    return this.auth.isLoggedIn().pipe(
      map(flag => {
        if (flag) {
          return true;
        } else {
          this.router.navigate(['/auth']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/auth']);
        return of(false);
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.checkStatus();
  }

  canActivateChild(): Observable<boolean> {
    return this.checkStatus();
  }

  canLoad(): Observable<boolean> {
    return this.checkStatus();
  }
}
