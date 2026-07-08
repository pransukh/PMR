import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { Button } from "primeng/button";

@Component({
    standalone: true,
    selector: "ht-appointments",
    templateUrl: "./appointments.component.html",
    styleUrl: "./appointments.component.css",
    imports: [Button]
})

class Appointments {
    constructor(private router: Router) { }
    showCards = true;
    showDetails= false;

    scheduleAppointment() {
        this.router.navigate(['/appointments/new']);
    }
    cardSelected(){
        console.log("card selected")
    }
}

export default Appointments;
