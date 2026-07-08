import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Button } from "primeng/button";
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { IftaLabelModule } from 'primeng/iftalabel';
import { DividerModule } from 'primeng/divider';

interface City {
    name: string;
    code: string;
}

@Component({
    standalone: true,
    selector: "ht-appointmentScheduling",
    templateUrl: "./appointmentScheduling.component.html",
    styleUrl: "./appointmentScheduling.component.css",
    imports: [Button, FormsModule, SelectModule, FloatLabelModule, DatePickerModule, TextareaModule, IftaLabelModule, DividerModule]
})


class AppointmentScheduling {
    constructor(private router: Router) {}
    date ="";
    backToAppointmentList(){
        this.router.navigate(['/appointments']);
    }

    cities: City[] | undefined;
    value1: City | undefined;
    value2: City | undefined;
    value3: City | undefined;
    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}

export default AppointmentScheduling;
