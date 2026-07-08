import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PatientSearchModel } from '../models/patientSearch.model';

@Injectable({ providedIn: 'root' })
export class PatientService {

    private baseUrl = 'https://mp281bbe2aa0b6e027ed.free.beeceptor.com';
    private baseUrlForByID = 'https://mpe06a38192a3b1f1c4e.free.beeceptor.com'
    constructor(private http: HttpClient) {}

    searchPatient(model: PatientSearchModel): Promise<any> {
        return firstValueFrom(
            this.http.get<any>(`${this.baseUrl}/patient/search`)
        );
    }

    getPatientById(id: string): Promise<any> {
        return fetch(`${this.baseUrlForByID}/patient/search/by/id/${id}`)
            .then(res => res.json());
    }
}