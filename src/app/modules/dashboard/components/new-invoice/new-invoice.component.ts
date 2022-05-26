import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invoice } from '../../../../models/invoice';
import { VendorService } from 'src/app/services/vendor.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewInvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;

  vendorList$ = this.vendorService.getVendorList();

  vendorList = this.localStore.getData('vendors');

  constructor(
    public dialogRef: MatDialogRef<NewInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public invoice: Invoice,
    private vendorService: VendorService,
    private invoiceService: InvoiceService,
    private localStore: LocalStorageService
  ) {}
  ngOnInit(): void {
    this.invoiceForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      vendor: new FormControl('', [Validators.required]),
      invoice_number: new FormControl('', [Validators.required]),
      invoice_amount: new FormControl('', [Validators.required]),
    });
  }

  onSave() {
    const newInvoice: Invoice = {
      number: this.invoiceForm.value.invoice_number,
      date_of_issue: this.invoiceForm.value.date_of_issue,
      vendor: this.invoiceForm.value.vendor,
      invoice_amount: this.invoiceForm.value.invoice_amount,
    };
    const invoiceList = [
      ...(JSON.parse(this.localStore.getData('invoices') || '[]') as Invoice[]),
      newInvoice,
    ];
    this.localStore.setData('invoices', JSON.stringify(invoiceList));
    this.invoiceService.setInvoiceListSubj(invoiceList);
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
