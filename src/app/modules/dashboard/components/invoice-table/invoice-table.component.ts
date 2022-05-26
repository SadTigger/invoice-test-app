import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

import { Invoice } from 'src/app/models/invoice';
import { InvoiceService } from 'src/app/services/invoice.service';
import { VendorService } from 'src/app/services/vendor.service';
import { InvoicePreviewComponent } from '../invoice-preview/invoice-preview.component';
import { NewInvoiceComponent } from '../new-invoice/new-invoice.component';
import { Subject, Observable } from 'rxjs';
import { tap, takeUntil, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceTableComponent implements OnInit, OnDestroy {
  defaultMatSelect = 'default';

  dataSource = new MatTableDataSource<Invoice>();

  isGuest$ = this.auth.isGuest();

  private destroy$ = new Subject();

  vendorList$ = this.vendorService.getVendorList();

  invoiceListSubj$!: Observable<Invoice[]>;

  displayedColumns: string[] = ['number', 'vendor', 'invoice_amount'];

  @ViewChild('matRef') matRef!: MatSelect;

  constructor(
    private auth: AuthService,
    private vendorService: VendorService,
    private invoiceService: InvoiceService,
    public dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.invoiceService
      .getInvoiceListSubj()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => (this.dataSource.data = data));
  }

  onChange($event: any): void {
    if ($event === 'default') {
      this.invoiceService
        .getInvoiceListSubj()
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.dataSource = new MatTableDataSource<Invoice>(data);
        });
    } else {
      this.invoiceService
        .getInvoicesByVendor($event)
        .pipe(takeUntil(this.destroy$))
        .subscribe(data => {
          this.dataSource = new MatTableDataSource<Invoice>(data);
        });
    }
  }

  openAddInvoiceDialog(): void {
    const dialogRef = this.dialog.open(NewInvoiceComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe(() => this.clearVenderSelect());
  }

  openInvoicePreview(invoice: Invoice): void {
    const dialogRef = this.dialog.open(InvoicePreviewComponent, {
      width: '250px',
      data: { ...invoice },
    });
  }

  clearVenderSelect() {
    this.matRef.options.forEach((option: MatOption) => {
      if (option.id === 'mat-option-0') {
        option.select();
      }
    });
  }
}
