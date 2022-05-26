import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { Vendor } from '../models/vendor';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private vendorUrl: string = '/assets/data/vendor-mocked-list.json';

  private vendorSubj$ = new BehaviorSubject<Vendor>({} as Vendor);

  private vendorListSubj$ = new BehaviorSubject<Vendor[]>([]);

  constructor(private http: HttpClient, private storage: LocalStorageService) {}

  getVendorById(id: number): Observable<Vendor> {
    return this.getLocalStorageVendors().pipe(
      tap(data => this.vendorListSubj$.next(data)),
      mergeMap(vendors => vendors.filter(vendor => vendor.id == id)),
      tap(data => this.vendorSubj$.next(data))
    );
  }

  getVendorList(): Observable<Vendor[]> {
    return this.http.get<{ vendors: Vendor[] }>(this.vendorUrl).pipe(
      map(data => data.vendors),
      tap(data => this.vendorListSubj$.next(data))
    );
  }

  getLocalStorageVendors(): Observable<Vendor[]> {
    const vendors = JSON.parse(
      this.storage.getData('vendors') || '[]'
    ) as Vendor[];
    this.setVendorListSubj(vendors);
    return of(vendors);
  }

  getVendorSubj(): Observable<Vendor> {
    return this.vendorSubj$.asObservable();
  }

  getVendorListSubj(): Observable<Vendor[]> {
    return this.vendorListSubj$.asObservable();
  }

  setVendorListSubj(vendors: Vendor[]): void {
    this.vendorListSubj$.next(vendors);
  }

  clearData() {
    this.vendorListSubj$.next([]);
    this.vendorSubj$.next({} as Vendor);
  }
}
