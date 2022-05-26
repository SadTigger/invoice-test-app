import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vendor } from '../../../../models/vendor';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendor-edit-dialog',
  templateUrl: './vendor-edit-dialog.component.html',
  styleUrls: ['./vendor-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorEditDialogComponent implements OnInit {
  vendorForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<VendorEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public vendor: Vendor
  ) {}

  ngOnInit(): void {
    this.vendorForm = new FormGroup({
      id: new FormControl(this.vendor.id, [Validators.required]),
      name: new FormControl(this.vendor.name, [Validators.required]),
      address: new FormControl(this.vendor.address.city, [Validators.required]),
    });
  }

  onSave() {
    const vendor: Vendor = {
      id: this.vendorForm.value.id,
      name: this.vendorForm.value.name,
      address: { city: this.vendorForm.value.address },
    };
    this.dialogRef.close(vendor);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
