import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  checkStatus(): Observable<boolean> {
    return this.auth.isLoggedIn().pipe(
      map(flag => {
        if (flag) {
          this.router.navigate(['/dashboard/invoices']);
          return false;
        } else {
          return true;
        }
      }),
      catchError(() => {
        this.router.navigate(['/dashboard']);
        return of(false);
      })
    );
  }

  canActivate(): Observable<boolean> {
    return this.checkStatus();
  }
}
