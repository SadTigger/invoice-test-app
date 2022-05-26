import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorsComponent } from './vendors.component';
import { NoAuthGuard } from 'src/app/guards/no-auth.guard';
import { VendorComponent } from './components/vendor/vendor.component';

const routes: Routes = [
  {
    path: '',
    component: VendorsComponent,
  },
  {
    path: ':id',
    canActivate: [NoAuthGuard],
    component: VendorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorsRoutingModule {}
