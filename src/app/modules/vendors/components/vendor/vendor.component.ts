import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from 'src/app/services/vendor.service';
import { BehaviorSubject, EMPTY, Subject, of } from 'rxjs';
import { Vendor } from '../../../../models/vendor';
import { takeUntil, switchMap, filter, defaultIfEmpty } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { VendorEditDialogComponent } from '../vendor-edit-dialog/vendor-edit-dialog.component';
import { InvoiceService } from '../../../../services/invoice.service';
import { Invoice } from 'src/app/models/invoice';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorComponent implements OnInit, OnDestroy {
  id!: string;

  destroy$ = new Subject();

  isAdmin$ = this.auth.isAdmin();

  vendor$ = new BehaviorSubject<Vendor>({} as Vendor);

  vendorListener$ = this.vendor$.asObservable();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private vendorService: VendorService,
    private invoiceService: InvoiceService,
    private auth: AuthService,
    private localStore: LocalStorageService,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.vendorService
      .getVendorById(+this.id)
      .pipe(
        takeUntil(this.destroy$),
        filter(data => !!data),
        defaultIfEmpty({} as Vendor),
        switchMap(data => {
          if (data && Object.keys(data).length !== 0) {
            return of(data);
          } else {
            this.router.navigate(['vendors']);
            return EMPTY;
          }
        })
      )
      .subscribe(vendor => this.vendor$.next(vendor));
  }

  edit(): void {
    const vendorList = [
      ...(JSON.parse(this.localStore.getData('vendors') || '[]') as Vendor[]),
    ];

    let invoices: Invoice[] = [
      ...JSON.parse(this.localStore.getData('invoices') || '[]'),
    ];

    if (vendorList.length) {
      const vendor = vendorList.find(el => el.id === +this.id) as Vendor;

      let invoicesByVendor = invoices.filter(
        el => JSON.stringify(el.vendor) === JSON.stringify(vendor)
      );

      const dialogRef = this.dialog.open(VendorEditDialogComponent, {
        width: '400px',
        data: { ...vendor },
      });

      dialogRef
        .afterClosed()
        .pipe(filter(data => data))
        .subscribe((vendor: Vendor) => {
          const index = vendorList.findIndex(el => el.id === +this.id);
          const tmpInvoices = invoices.filter(el => el.vendor.id !== +this.id);
          if (index !== -1) {
            invoicesByVendor.forEach(
              invoice => (invoice.vendor = { ...vendor })
            );
            vendorList[index] = { ...vendor };
            invoices = [...tmpInvoices.concat(invoicesByVendor)];
            this.localStore.setData(
              'invoices',
              JSON.stringify([...tmpInvoices.concat(invoicesByVendor)])
            );
            this.invoiceService.setInvoiceListSubj([
              ...tmpInvoices.concat(invoicesByVendor),
            ]);
          } else {
            vendorList.push(vendor);
          }
          this.localStore.setData('vendors', JSON.stringify(vendorList));
          this.vendorService.setVendorListSubj(vendorList);
          this.router.navigate(['vendors']);
        });
    }
  }
}
