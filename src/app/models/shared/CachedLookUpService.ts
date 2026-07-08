import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { LookupsResponse } from './LookUpModal';

@Injectable({ providedIn: 'root' })
export class LookupService {

  private cache$?: Observable<LookupsResponse>;

  constructor(private http: HttpClient) {}

  getAllLookups(): Observable<LookupsResponse> {
    if (!this.cache$) {
      this.cache$ = this.http
        .get<LookupsResponse>('http://localhost:8080/api/lookups')
        .pipe(shareReplay(1));
    }
    return this.cache$;
  }
}