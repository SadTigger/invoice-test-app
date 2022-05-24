import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MaterialModule } from '../material/material.module';
import { DashboardComponent } from './dashboard.component';
import { InvoiceTableComponent } from './components/invoice-table/invoice-table.component';
import { InvoicePreviewComponent } from './components/invoice-preview/invoice-preview.component';
import { NewInvoiceComponent } from './components/new-invoice/new-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    InvoiceTableComponent,
    InvoicePreviewComponent,
    NewInvoiceComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
