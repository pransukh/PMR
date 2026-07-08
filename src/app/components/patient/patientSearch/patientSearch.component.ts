import { ChangeDetectionStrategy, Component } from "@angular/core";
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule } from "@angular/forms";
import { formatDate } from "date-fns";
import { Button } from "primeng/button";
import { DatePickerModule } from "primeng/datepicker";
import { DividerModule } from "primeng/divider";
import { FloatLabelModule } from "primeng/floatlabel";
import { IftaLabelModule } from "primeng/iftalabel";
import { InputTextModule } from "primeng/inputtext";
import { SelectModule } from "primeng/select";
import { TextareaModule } from "primeng/textarea";
import { DATE_FORMAT } from "../../../constants/DateFormats";
import { MARITAL_STATUS_OPTIONS, GENDER_OPTIONS, RELATION, BLOOD_GROUP, CASE_TYPE, WARD_OPTIONS } from "../../../constants/ReuseableOptionList";
import { PatientRegistrationService } from "../../../services/patientRegistration.sevice";

export interface PatientRecordModel {
    personalInfo: PatientPersonalInformation,
    emergencyContact: PatientEmergencyContactInformation,
    clinicalInfo: PatientClinicalInformation,
}

interface Customer {
    id: number;
    name: string;
    country: string;
    status: string;
    verified: boolean;
    balance: number;
}

interface PatientPersonalInformation {
    patientFirstName: string
    patientLastName: string
    patientMaritalStatus: string
    patientGender: string
    patientDOB: string
    patientAge: string
    patientPhone: string
    patientEmail: string
    patientAddress: string
}

interface PatientEmergencyContactInformation {
    ecFirstName: string;
    ecLastName: string;
    ecRelation: string;
    ecPhoneNumber: string;
    ecEmail: string;
    ecAddress: string;
}
interface PatientClinicalInformation {
    bloodGroup: string;
    caseType: string;
    ward: string;
    assignedDoctor: string;
    allergies: string;
    diagnosisNotes: string;
}

@Component({
    standalone: true,
    selector: "ht-patientSearch",
    templateUrl: "./patientSearch.component.html",
    styleUrl: "./patientSearch.component.css",
    imports: [Button, FormsModule, SelectModule, FloatLabelModule, DatePickerModule, TextareaModule, IftaLabelModule, DividerModule, InputTextModule, SelectModule, IconFieldModule, InputIconModule, TableModule, TagModule, InputTextModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})

class PatientSearch {

    constructor(private patientService: PatientRegistrationService) { }

    maritalStatusOptions = MARITAL_STATUS_OPTIONS;
    genderOptions = GENDER_OPTIONS;
    relationOptions = RELATION;
    bloodGroupOptions = BLOOD_GROUP;
    caseTypeOptions = CASE_TYPE;
    wardsOptions = WARD_OPTIONS;


    //There is best way to get data from DB call when the component is loading, that is in modals/shared
    // but that is overengeneered for now so leaving it, may come handy in future.
    // for timebeing we are giving value to dropdown from .ts file.

    patientPersonaleInformation: PatientPersonalInformation = {
        patientFirstName: '',
        patientLastName: '',
        patientMaritalStatus: '',
        patientGender: '',
        patientDOB: '',
        patientAge: '',
        patientPhone: '',
        patientEmail: '',
        patientAddress: '',
    }


    emergencyContactInfo: PatientEmergencyContactInformation = {
        ecFirstName: '',
        ecLastName: '',
        ecRelation: '',
        ecPhoneNumber: '',
        ecEmail: '',
        ecAddress: ''
    };

    clinicalInformation: PatientClinicalInformation = {
        bloodGroup: '',
        caseType: '',
        ward: '',
        assignedDoctor: '',
        allergies: '',
        diagnosisNotes: '',
    };



    // this should come from DB.
    assinedDoctorOptions = [
        { label: 'Single', value: 'Single' },
        { label: 'Married', value: 'Married' },
        { label: 'Divorced', value: 'Divorced' },
        { label: 'Widowed', value: 'Widowed' }
    ];

    // this also should come from DB. there might be some default/common allergies
    allergiesOptions = [
        { label: 'Single', value: 'Single' },
        { label: 'Married', value: 'Married' },
        { label: 'Divorced', value: 'Divorced' },
        { label: 'Widowed', value: 'Widowed' }
    ];

    buildPatientPayload() {
        const formattedDate = formatDate(this.patientPersonaleInformation.patientDOB, DATE_FORMAT.DD_MM_YYYY);
        this.patientPersonaleInformation.patientDOB = formattedDate;
        return {
            personalInfo: this.patientPersonaleInformation,
            emergencyContactInfo: this.emergencyContactInfo,
            clinicalInfo: this.clinicalInformation,
        };
    }

    async patientRegistarionProcess() {
        const payload = this.buildPatientPayload();

        try {
            const response = await this.patientService.registerPatient(payload);
            console.log('Patient registered:', response);
        } catch (error) {
            console.error('Registration failed:', error);  
        }
    }

    customers: Customer[] = [
        {
          id: 1,
          name: "Aarav Sharma",
          country: "India",
          status: "qualified",
          verified: true,
          balance: 1250.75
        },
        {
          id: 2,
          name: "Emily Johnson",
          country: "USA",
          status: "new",
          verified: false,
          balance: 340.0
        },
        {
          id: 3,
          name: "Mohammed Khan",
          country: "UAE",
          status: "negotiation",
          verified: true,
          balance: 9800.5
        },
        {
          id: 4,
          name: "Sophia Brown",
          country: "UK",
          status: "unqualified",
          verified: false,
          balance: 150.25
        },
        {
          id: 5,
          name: "Li Wei",
          country: "China",
          status: "renewal",
          verified: true,
          balance: 7200.0
        },
        {
          id: 6,
          name: "Carlos Martinez",
          country: "Spain",
          status: "qualified",
          verified: true,
          balance: 430.9
        },
        {
          id: 7,
          name: "Olivia Smith",
          country: "Canada",
          status: "new",
          verified: false,
          balance: 110.0
        },
        {
          id: 8,
          name: "Yuki Tanaka",
          country: "Japan",
          status: "negotiation",
          verified: true,
          balance: 5600.35
        },
        {
            id: 1,
            name: "Aarav Sharma",
            country: "India",
            status: "qualified",
            verified: true,
            balance: 1250.75
          },
          {
            id: 2,
            name: "Emily Johnson",
            country: "USA",
            status: "new",
            verified: false,
            balance: 340.0
          },
          {
            id: 3,
            name: "Mohammed Khan",
            country: "UAE",
            status: "negotiation",
            verified: true,
            balance: 9800.5
          },
          {
            id: 4,
            name: "Sophia Brown",
            country: "UK",
            status: "unqualified",
            verified: false,
            balance: 150.25
          },
          {
            id: 5,
            name: "Li Wei",
            country: "China",
            status: "renewal",
            verified: true,
            balance: 7200.0
          },
          {
            id: 6,
            name: "Carlos Martinez",
            country: "Spain",
            status: "qualified",
            verified: true,
            balance: 430.9
          },
          {
            id: 7,
            name: "Olivia Smith",
            country: "Canada",
            status: "new",
            verified: false,
            balance: 110.0
          },
          {
            id: 8,
            name: "Yuki Tanaka",
            country: "Japan",
            status: "negotiation",
            verified: true,
            balance: 5600.35
          }
      ];

    statusOptions = [
      { label: 'New', value: 'new' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' }
    ];

    getSeverity(status: string) {
        switch (status) {
            case 'unqualified':
                return 'danger';
            case 'qualified':
                return 'success';
            case 'new':
                return 'info';
            case 'negotiation':
                return 'warn';
            case 'renewal':
                return 'secondary';
            default:
                return 'info';
        }
    }

}

export default PatientSearch;
