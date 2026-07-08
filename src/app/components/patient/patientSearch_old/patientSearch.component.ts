import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PatientSearchModel} from "../../../models/patientSearch.model"
import { PatientService } from "../../../services/patientSearch.service"
import { ToastModule } from 'primeng/toast';
import { PatientDetailsModel } from '../../../models/patientDetails.model';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SelectModule } from 'primeng/select';
import PatientDetailsWithoutNav from '../patientDetailsWithoutNav/patientDetailsWithoutNav.component';
import Dashborad from '../../dashboard/dashboard.component';

interface MaritalStatus {
    status: string;
    statusCode: string;
}

interface AgeRange {
    displayRange: string;
}

interface Relation {
    relationCode: string;
}

interface Gender {
    displayValue: string;
    genderCode: string;
}

@Component({
    standalone: true,
    selector: "ht-patientSearch",
    templateUrl: "./patientSearch.component.html",
    styleUrl: "./patientSearch.component.css",
    imports: [FloatLabelModule, InputTextModule, FormsModule, ButtonModule, ToastModule, PatientDetailsWithoutNav, SelectModule],
    providers: [MessageService]
})

class PatientSearch {

    maritalStatus: MaritalStatus[] = [

        { status: 'Married', statusCode: 'M' },
        { status: 'UnMarried', statusCode: 'U' },
        { status: 'Widow', statusCode: 'W' },
        { status: 'Divorced', statusCode: 'D' },
    
    ];

    ageRange: AgeRange[] = [

        { displayRange: '0-5' },
        { displayRange: '5-10' },
        { displayRange: '10-15' },
        { displayRange: '15-20' },
        { displayRange: '20-25' },
        { displayRange: '25-30' },
        { displayRange: '30-35' },
        { displayRange: '35-40' },
        { displayRange: '40-45' },
        { displayRange: '45-50' },
        { displayRange: '50-55' },
        { displayRange: '55-60' },
        { displayRange: '60-65' },
        { displayRange: '65-70' },
        { displayRange: '70-75' },
        { displayRange: '75-80' },
        { displayRange: '80-85' },
        { displayRange: '85-90' },
        { displayRange: '90-95' },
        { displayRange: '95-100' }
    
    ];

    relation : Relation[] =[
        {relationCode: 'S/o'},
        {relationCode: 'D/o'},
        {relationCode: 'W/o'},
    ]

    gender : Gender[] = [
        {genderCode: 'M', displayValue:'Male'},
        {genderCode: 'F', displayValue:'Female'},
    ]

    // or maritalStatus!: maritalStatus[];   observe the ! (if you are sure that it will initialied before use.)
    // or maritalStatus?: maritalStatus[];   observe the ? (make it optional)
    selectedMaritalStatus: MaritalStatus | undefined;
    selectedAgeRange: AgeRange | undefined;
    selectedRelation: Relation | undefined;
    selectedGender : Gender | undefined;

    loading = signal(false);
    patientDetails: PatientDetailsModel | null = null;
    private router = inject(Router);
    private patientService = inject(PatientService);
    private messageService = inject(MessageService);      
    
    patientSearchModel: PatientSearchModel = {
        mrn: '',
        name: '',
        maritalStatus: '',
        relation: '',
        relativeName:'',
        age:'',
        gender:'',
        phone: '',
    }

    
    private validateForm(): boolean {
        console.log(this.patientSearchModel)
        if (!this.patientSearchModel.mrn?.trim()) {
            this.showError("MRN is required");
            return false;
        }

        if (!this.patientSearchModel.name?.trim()) {
            this.showError("Name is required");
            return false;
        }

        if (!this.patientSearchModel.phone) {
            this.showError("Phone is required");
            return false;
        }

        return true;
    }

    private showError(detail: string) {
        this.messageService.add({
            severity: 'error',
            summary: 'Validation Error',
            detail
        });
    }
    
    async searchPatient() {
        if (!this.validateForm()) return;

        this.loading.set(true);

        try {
            const response = await this.patientService.searchPatient(this.patientSearchModel);
            console.log(response);
            if (!response) {
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Not Found',
                    detail: 'No patient data found'
                });
                return;
            }

            // This code is passing the patient data in-memory (Short term) to next page
            // this.router.navigate(['/patient-detail'], {
            //     state: { patient: response }
            // });

            // second option is we can store the data in localStorage, but this not prod env arcitechure, 
            // stale data form localSorage will be used and that is not good. 

            // this is passing patient mrn to next page and next page is loading patient data with api call
            // prod like behaviour, this way you can share the URL. and every time api is getting called and fresh data is fetched.
            // this.router.navigate(['/patient/detail/', response.mrn]);

            // this code is loadind data in same page, no navigation.
            this.patientDetails = response;
        } catch (error) {
            console.error(error);

            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Something went wrong while searching patient'
            });
            this.patientDetails = null;

        } finally {
            this.loading.set(false);
        }
    }

}

export default PatientSearch;
