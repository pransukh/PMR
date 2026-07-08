import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { LookupService } from './CachedLookUpService';
import { LookupsResponse } from './LookUpModal';

@Injectable({ providedIn: 'root' })
export class LookupResolver implements Resolve<LookupsResponse> {

  constructor(private lookupService: LookupService) {}

  resolve(): Observable<LookupsResponse> {
    return this.lookupService.getAllLookups();
  }
}