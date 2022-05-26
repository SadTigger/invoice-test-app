import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InvoiceTableComponent } from './components/invoice-table/invoice-table.component';
import { NoAuthGuard } from 'src/app/guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [NoAuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'invoices',
        pathMatch: 'full',
      },
      {
        path: 'invoices',
        component: InvoiceTableComponent,
      },
      {
        path: 'vendors',
        canActivate: [NoAuthGuard],
        loadChildren: () =>
          import('./../vendors/vendors.module').then(m => m.VendorsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
