import { differenceInDays } from 'date-fns';

export class PatientDetailsModel {

    constructor(init?: Partial<PatientDetailsModel>) {
        Object.assign(this, init);
    }

    mrn: string = '';
    phone: string = '';
    name: string = '';
    dob: string = "13/Jan/2001";

    imageLink: string = '';

    admitDate!: Date;
    dischargeDate: Date | null = null;

    roomType: string = '';
    bedNumber: string = '';

    medicalHistory: string = '';

    doctorsAppointed: string[] = [];
    nursesAttended: string[] = [];

    caseType: "Emergency" | "Casual" | "OPD" | "Regular" = "OPD";

    get numberOfDaysAdmitted(): number | null {
        if (!this.admitDate || !this.dischargeDate) return null;

        return differenceInDays(this.dischargeDate, this.admitDate);
    }
}