import { BloodGroup } from "./BloodGroup";
import { CaseType } from "./CaseType";
import { Gender } from "./Gender";
import { MaritalStatus } from "./MaritalStatus";
import { Relation } from "./Relation";
import { Ward } from "./Wards";

export interface SelectOption<T = any> {
    label: string;
    value: T;
}

export const MARITAL_STATUS_OPTIONS: SelectOption<MaritalStatus>[] = [
    { label: 'Single', value: MaritalStatus.Single },
    { label: 'Married', value: MaritalStatus.Married },
    { label: 'Divorced', value: MaritalStatus.Divorced },
    { label: 'Widowed', value: MaritalStatus.Widowed },
    { label: 'Separated', value: MaritalStatus.Separated },
    { label: 'Not Disclosed', value: MaritalStatus.Not_Disclosed },
];

export const GENDER_OPTIONS: SelectOption<Gender>[] = [
    {label: 'Male', value:Gender.Male},
    {label: 'Famale', value:Gender.Female},
    {label: 'Other', value:Gender.Other},
    {label: 'Not Disclosed', value:Gender.Not_Disclosed},
]

export const RELATION: SelectOption<Relation> [] = [
    {label:'Spouse', value:Relation.Spouse},
    {label:'Parent', value:Relation.Parent},
    {label:'Sibling', value:Relation.Sibling},
    {label:'Legal Guardian', value:Relation.Legal_Guardian},
    {label:'Relative', value:Relation.Relative},
    {label:'Friend', value:Relation.Friend},
    {label:'Co-Worker', value:Relation.Co_Worker},
]

export const BLOOD_GROUP: SelectOption<BloodGroup>[] = [
    { label: 'A+', value: BloodGroup.A_Positive },
    { label: 'A-', value: BloodGroup.A_Negative },
    { label: 'B+', value: BloodGroup.B_Positive },
    { label: 'B-', value: BloodGroup.B_Negative },
    { label: 'AB+', value: BloodGroup.AB_Positive },
    { label: 'AB-', value: BloodGroup.AB_Negative },
    { label: 'O+', value: BloodGroup.O_Positive },
    { label: 'O-', value: BloodGroup.O_Negative },
];

export const CASE_TYPE: SelectOption<CaseType>[] = [
    { label: 'Out Patient', value: CaseType.OutPatient },
    { label: 'Follow Up', value: CaseType.FollowUp },
    { label: 'Consultation', value: CaseType.Consultation },

    { label: 'In Patient', value: CaseType.Inpatient },
    { label: 'Emergency', value: CaseType.Emergency },
    { label: 'Accident', value: CaseType.Accident },
    { label: 'Critical', value: CaseType.Critical },

    { label: 'Medico Legal Case (MLC)', value: CaseType.MLC },
    { label: 'Police Referred', value: CaseType.PoliceReferred },
    { label: 'Poisoning', value: CaseType.Poisoning },
    { label: 'Burns', value: CaseType.Burns },

    { label: 'Surgical', value: CaseType.Surgical },
    { label: 'Medical', value: CaseType.Medical },
    { label: 'Orthopedic', value: CaseType.Orthopedic },
    { label: 'Maternity', value: CaseType.Maternity },
    { label: 'Pediatric', value: CaseType.Pediatric },

    { label: 'Insurance Case', value: CaseType.Insurance },
    { label: 'Government Scheme', value: CaseType.GovernmentScheme },
    { label: 'Cash Case', value: CaseType.Cash }
];

export const WARD_OPTIONS: SelectOption<Ward>[] = [
    { label: 'Emergency', value: Ward.Emergency },
    { label: 'ICU', value: Ward.ICU },
    { label: 'NICU', value: Ward.NICU },
    { label: 'PICU', value: Ward.PICU },
    { label: 'CCU', value: Ward.CCU },

    { label: 'Medical Ward', value: Ward.Medical },
    { label: 'Surgical Ward', value: Ward.Surgical },
    { label: 'Orthopedic', value: Ward.Orthopedic },
    { label: 'Cardiology', value: Ward.Cardiology },
    { label: 'Neurology', value: Ward.Neurology },

    { label: 'Maternity', value: Ward.Maternity },
    { label: 'Gynecology', value: Ward.Gynecology },
    { label: 'Pediatrics', value: Ward.Pediatrics },
    { label: 'Neonatal', value: Ward.Neonatal },

    { label: 'General Ward', value: Ward.General },
    { label: 'Private Ward', value: Ward.Private },
    { label: 'Semi-Private Ward', value: Ward.SemiPrivate },
    { label: 'Isolation Ward', value: Ward.Isolation },

    { label: 'Oncology', value: Ward.Oncology },
    { label: 'Dialysis Unit', value: Ward.Dialysis },
    { label: 'Burn Unit', value: Ward.Burn },
    { label: 'Rehabilitation', value: Ward.Rehabilitation },
    { label: 'Psychiatric', value: Ward.Psychiatric }
];