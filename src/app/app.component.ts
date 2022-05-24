import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';
import { InvoiceService } from 'src/app/services/invoice.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'invoice-test-app';

  constructor(
    private localStore: LocalStorageService,
    private invoiceService: InvoiceService,
    private vendorService: VendorService
  ) {}

  ngOnInit(): void {
    this.invoiceService.getInvoiceList().subscribe(data => {
      this.localStore.setData('invoices', JSON.stringify(data));
    });

    this.vendorService
      .getVendorList()
      .subscribe(data =>
        this.localStore.setData('vendors', JSON.stringify(data))
      );
  }

  ngOnDestroy() {
    this.localStore.removeData('invoices');
  }
}
