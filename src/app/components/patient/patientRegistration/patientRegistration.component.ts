import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { Button } from "primeng/button";
import { SelectModule } from "primeng/select";
import { FloatLabelModule } from "primeng/floatlabel";
import { DatePickerModule } from "primeng/datepicker";
import { TextareaModule } from "primeng/textarea";
import { IftaLabelModule } from "primeng/iftalabel";
import { DividerModule } from "primeng/divider";
import { InputTextModule } from "primeng/inputtext";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";

import {
    BLOOD_GROUP,
    CASE_TYPE,
    GENDER_OPTIONS,
    MARITAL_STATUS_OPTIONS,
    RELATION,
    WARD_OPTIONS
} from "../../../constants/ReuseableOptionList";

import { DATE_FORMAT } from "../../../constants/DateFormats";

import { PatientRegistrationService } from "../../../services/patientRegistration.sevice";

import { PatientRecordModel } from "../../../models/patientRegistration.model";
import { ConfirmationDialogProps } from "../../../models/shared/ConfirmationDialogProps";

import { formatDate } from "../../../utils/dateFormats";
import { calculateAge } from "../../../utils/calculateAge";
import { confirmationDialog } from "../../../utils/confirmationDialog";

@Component({
    standalone: true,
    selector: "ht-patientRegistration",
    templateUrl: "./patientRegistration.component.html",
    styleUrl: "./patientRegistration.component.css",
    providers: [ConfirmationService, MessageService],
    imports: [
        ToastModule,
        ConfirmDialogModule,
        ReactiveFormsModule,
        Button,
        CommonModule,
        FormsModule,
        SelectModule,
        FloatLabelModule,
        DatePickerModule,
        TextareaModule,
        IftaLabelModule,
        DividerModule,
        InputTextModule
    ]
})
class PatientRegistration implements OnInit {

    // =========================
    // Dependency Injection
    // =========================
    private fb = inject(FormBuilder);
    private confirmationService = inject(ConfirmationService);
    private messageService = inject(MessageService);
    private router = inject(Router);

    constructor(private patientService: PatientRegistrationService) {}

    // =========================
    // Lifecycle
    // =========================
    ngOnInit(): void {
        const dobControl = this.patientForm.get("personalInfo.patientDOB");
        const ageControl = this.patientForm.get("personalInfo.patientAge");

        dobControl?.valueChanges.subscribe((dob: string | null) => {
            if (!dob) {
                ageControl?.setValue("");
                return;
            }

            const date = new Date(dob);
            ageControl?.setValue("" + calculateAge(date));
        });
    }

    // =========================
    // Dropdown Options
    // =========================
    maritalStatusOptions = MARITAL_STATUS_OPTIONS;
    genderOptions = GENDER_OPTIONS;
    relationOptions = RELATION;
    bloodGroupOptions = BLOOD_GROUP;
    caseTypeOptions = CASE_TYPE;
    wardsOptions = WARD_OPTIONS;

    assinedDoctorOptions = [
        { label: "Dr. Deepali", value: "Dr. Deepali" },
        { label: "Dr. Rekha", value: "Dr. Rekha" },
        { label: "Dr. Ahemad", value: "Dr. Ahemad" },
        { label: "Dr. Harpreet Singh", value: "Dr. Harpreet Singh" },
        { label: "Dr. Vivek Gautam", value: "Dr. Vivek Gautam" }
    ];

    allergiesOptions = [
        { label: "Coffee", value: "Coffee" },
        { label: "Paracitamole", value: "Paracitamole" },
        { label: "Asprine", value: "Asprine" },
        { label: "Glucamile", value: "Glucamile" }
    ];

    // =========================
    // Reactive Form
    // =========================
    patientForm = this.fb.group({
        personalInfo: this.fb.group({
            patientFirstName: ["", Validators.required],
            patientLastName: [""],
            patientMaritalStatus: ["", Validators.required],
            patientGender: ["", Validators.required],
            patientDOB: ["", Validators.required],
            patientAge: [""],
            patientPhone: [""],
            patientEmail: [""],
            patientAddress: ["", Validators.required]
        }),

        emergencyContactInfo: this.fb.group({
            ecFirstName: ["", Validators.required],
            ecLastName: [""],
            ecRelation: [""],
            ecPhoneNumber: ["", Validators.required],
            ecEmail: [""],
            ecAddress: ["", Validators.required]
        }),

        clinicalInfo: this.fb.group({
            bloodGroup: [""],
            caseType: ["", Validators.required],
            ward: ["", Validators.required],
            assignedDoctor: [""],
            allergies: ["", Validators.required],
            diagnosisNotes: [""]
        })
    });

    // =========================
    // Helpers
    // =========================
    isInvalid(controlName: string): boolean {
        const control = this.patientForm.get(controlName);
        return !!(control?.invalid && (control.touched || control.dirty));
    }

    buildPatientPayload() {
        const formValue = this.patientForm.getRawValue() as PatientRecordModel;
        const dob = formValue.personalInfo?.patientDOB;
        const formattedDate = dob ? formatDate(dob, DATE_FORMAT.DD_MM_YYYY) : "";

        return {
            personalInfo: {
                ...formValue.personalInfo,
                patientDOB: formattedDate
            },
            emergencyContactInfo: formValue.emergencyContactInfo,
            clinicalInfo: formValue.clinicalInfo
        };
    }

    // =========================
    // Actions
    // =========================
    async patientRegistarionProcess() {
        this.patientForm.markAllAsTouched();

        if (this.patientForm.invalid) return;

        const payload = this.buildPatientPayload();

        this.patientService.registerPatient(payload).subscribe({
            next: (response) => {
                console.log("Patient registered:", response);
            },
            error: (error) => {
                console.error("Registration failed:", error);
            }
        });
    }

    confirmCancel(event: Event) {
        confirmationDialog(
            this.confirmationService,
            this.messageService,
            this.buildDialogProps(event)
        );
    }

    buildDialogProps(event: Event): ConfirmationDialogProps {
        return {
            event: event.currentTarget as HTMLElement,
            confirmationService: this.confirmationService,
            messageService: this.messageService,
            confirmationMessage: "Do you really want to cancel patient registarion?",
            confirmationHeader: "Confirm Cancel",
            isClosable: true,
            icon: "pi pi-exclamation-triangle",
            isCloseOnEscape: true,

            rejectButtonProps: {
                label: "No, Continue patient registration",
                severity: "secondary",
                outlined: true
            },

            acceptButtonProps: {
                label: "Yes, Cancel patient registration",
                severity: "danger",
                outlined: false
            },

            acceptMessageProps: {
                severity: "success",
                summary: "Success",
                detail: "Action completed",
                life: 3000
            },

            rejectMessageProps: {
                severity: "info",
                summary: "Cancelled",
                detail: "Action cancelled",
                life: 3000
            },
            isShowAcceptMessageToast: false,
            isShowRejectMessageToast: false,
            onAccept: () => {
                this.router.navigate(["/dashboard"]);
            },

            onReject: () => {
                this.router.navigate(["/home"]);
            }
        };
    }
}

export default PatientRegistration;