import { Component, Input } from "@angular/core";
import { PatientDetailsModel } from "../../../models/patientDetails.model";
import { CommonModule } from "@angular/common";

@Component({
    standalone: true,
    selector: "ht-patientDetailsWithoutNav",
    templateUrl: "./patientDetailsWithoutNav.component.html",
    styleUrl: "./patientDetailsWithoutNav.component.css",
    imports: [CommonModule]
})

class PatientDetailsWithoutNav {
    @Input() patientDetailPassed: PatientDetailsModel | null = null;
}

export default PatientDetailsWithoutNav;
