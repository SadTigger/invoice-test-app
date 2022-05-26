import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  isAdmin$ = this.auth.isAdmin();
  isGuest$ = this.auth.isGuest();

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }

  settings() {
    console.log('In Development');
  }
}
