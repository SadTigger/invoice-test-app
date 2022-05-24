import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Invoice } from '../models/invoice';
import { Vendor } from '../models/vendor';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoiceUrl: string = '/assets/data/invoice-mocked-list.json';

  private invoiceSubj$ = new BehaviorSubject<Invoice>({} as Invoice);

  private invoiceListSubj$ = new BehaviorSubject<Invoice[]>([]);

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: LocalStorageService
  ) {}

  getInvoiceByNumber(number: number): Observable<Invoice> {
    return this.getInvoiceList().pipe(
      switchMap(invoices =>
        invoices.filter(invoice => invoice.number == number)
      )
    );
  }

  getInvoicesByVendor(vendor: Vendor): Observable<Invoice[]> {
    return this.getLocalStorageInvoices().pipe(
      tap(data => this.invoiceListSubj$.next(data)),
      map(invoices =>
        invoices.filter(
          invoice => JSON.stringify(invoice.vendor) === JSON.stringify(vendor)
        )
      )
    );
  }

  getInvoiceList(): Observable<Invoice[]> {
    return this.http.get<{ invoices: Invoice[] }>(this.invoiceUrl).pipe(
      map(data => data.invoices),
      tap(data => this.invoiceListSubj$.next(data)),
      switchMap(data => of(data))
    );
  }

  getLocalStorageInvoices(): Observable<Invoice[]> {
    const invoices = JSON.parse(
      this.storage.getData('invoices') || '[]'
    ) as Invoice[];
    this.setInvoiceListSubj(invoices);
    return of(invoices);
  }

  setInvoiceSubj(invoice: Invoice): void {
    this.invoiceSubj$.next(invoice);
  }

  getInvoiceSubj(): Observable<Invoice> {
    return this.invoiceSubj$.asObservable();
  }

  setInvoiceListSubj(list: Invoice[]): void {
    this.invoiceListSubj$.next(list);
  }

  getInvoiceListSubj(): Observable<Invoice[]> {
    return this.invoiceListSubj$.asObservable();
  }

  clearData() {
    this.invoiceListSubj$.next([]);
    this.invoiceSubj$.next({} as Invoice);
  }
}
