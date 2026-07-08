export interface PatientRecordModel {
    personalInfo: PatientPersonalInformation,
    emergencyContactInfo: PatientEmergencyContactInformation,
    clinicalInfo: PatientClinicalInformation,
}

export interface PatientPersonalInformation {
    patientFirstName: string | null;
    patientLastName: string| null;
    patientMaritalStatus: string| null;
    patientGender: string| null;
    patientDOB: string| null;
    patientAge: string| null;
    patientPhone: string| null;
    patientEmail: string| null;
    patientAddress: string| null;
}

export interface PatientEmergencyContactInformation {
    ecFirstName: string| null;
    ecLastName: string| null;
    ecRelation: string| null;
    ecPhoneNumber: string| null;
    ecEmail: string| null;
    ecAddress: string| null;
}
export interface PatientClinicalInformation {
    bloodGroup: string| null;
    caseType: string| null;
    ward: string| null;
    assignedDoctor: string| null;
    allergies: string| null;
    diagnosisNotes: string| null;
}