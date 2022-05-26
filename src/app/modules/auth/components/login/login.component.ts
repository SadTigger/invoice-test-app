import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  rememberUser: boolean = false;

  loginForm: FormGroup = new FormGroup({
    userLogin: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    userPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    rememberChoice: new FormControl(false),
  });

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    const user: User = {
      login: this.loginForm.value.userLogin,
      password: this.loginForm.value.userPassword,
    };
    this.authService.login(user).subscribe();
  }

  loginAsAdmin() {
    this.authService.loginAsAdmin().subscribe();
  }

  loginAsGuest() {
    this.authService.loginAsGuest().subscribe();
  }
}
