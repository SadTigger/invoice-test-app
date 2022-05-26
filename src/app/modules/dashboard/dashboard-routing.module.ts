import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InvoiceTableComponent } from './components/invoice-table/invoice-table.component';
import { NoAuthGuard } from 'src/app/guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    canLoad: [NoAuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'invoices',
        component: InvoiceTableComponent,
      },
      {
        path: '**',
        redirectTo: 'invoices',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
