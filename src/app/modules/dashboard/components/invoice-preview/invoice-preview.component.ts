import { Component, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from '../../../../models/invoice';

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrls: ['./invoice-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoicePreviewComponent {
  constructor(
    public dialogRef: MatDialogRef<InvoicePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Invoice
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
