import { Component, inject } from "@angular/core";
import { PatientDetailsModel } from "../../../models/patientDetails.model";
import { ActivatedRoute } from "@angular/router";
import { CommonModule } from "@angular/common";
import { PatientService } from "../../../services/patientSearch.service";
import {Button} from 'primeng/button'
import { TagModule } from 'primeng/tag';

@Component({
    standalone: true,
    selector: "ht-patientDetails",
    templateUrl: "./patientDetails.component.html",
    styleUrl: "./patientDetails.component.css",
    imports: [CommonModule, Button, TagModule]
})

class PatientDetails {
    patient: PatientDetailsModel | null = null;
    loading: boolean = false;

    private route = inject(ActivatedRoute);
    private patientService = inject(PatientService);
    
    // constructor(private router: Router) {
    //     const nav = this.router.getCurrentNavigation();
    //     this.patient = nav?.extras?.state?.['patient'] || null;
    // }

    // constructor() {
    //     this.patient = history.state?.patient ?? null;
    //     console.log("Patient loaded:", this.patient);
    // }

    constructor() {
        const id = this.route.snapshot.paramMap.get('id');
        console.log(id);
        if (id) {
            this.loadPatient(id);
        }
    }

    async loadPatient(id: string) {
        try {
            const response = await this.patientService.getPatientById(id);

            if (!response) {
                this.patient = null;
                return;
            }

            this.patient = response;

        } catch (err) {
            console.error(err);
            this.patient = null;
        } finally {
           this.loading = false;
        }
    }
}

export default PatientDetails;
