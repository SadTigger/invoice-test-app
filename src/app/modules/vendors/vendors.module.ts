import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorsComponent } from './vendors.component';
import { VendorComponent } from './components/vendor/vendor.component';
import { VendorEditDialogComponent } from './components/vendor-edit-dialog/vendor-edit-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [VendorsComponent, VendorComponent, VendorEditDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    VendorsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class VendorsModule {}
