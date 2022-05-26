import { Component } from '@angular/core';
import { VendorService } from 'src/app/services/vendor.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})
export class VendorsComponent {
  vendors$ = this.vendorService.getVendorListSubj();

  isAdmin$ = this.auth.isAdmin();

  constructor(
    private vendorService: VendorService,
    private auth: AuthService
  ) {}
}
