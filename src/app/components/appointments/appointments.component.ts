import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TablePageEvent } from 'primeng/table';
import { Paginator, PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Router } from "@angular/router";

interface Customer {
    name: string;
    age: string;
    date: string;
    time: string;
    status: string;
    doctor: string;
}

@Component({
    standalone: true,
    selector: "ht-appointments",
    templateUrl: "./appointments.component.html",
    styleUrl: "./appointments.component.css",
    imports: [ButtonModule, TableModule, TagModule, PaginatorModule, CommonModule]
})

class Appointments {
    constructor(private router: Router) { }
    showCards = true;
    showDetails = false;

    customers: Customer[] = [
        { name: "1hello", age: '23', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "2hello", age: '32', date: '11-07-2026', time: '2:00 PM', status: 'admitted', doctor: 'Dr. Deepali' },
        { name: "3hello", age: '33', date: '11-07-2026', time: '2:00 PM', status: 'outpatient', doctor: 'Dr. Deepali' },
        { name: "4hello", age: '22', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "5hello", age: '23', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "6hello", age: '23', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "7hello", age: '23', date: '11-07-2026', time: '2:00 PM', status: 'admitted', doctor: 'Dr. Deepali' },
        { name: "8hello", age: '23', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "9hello", age: '55', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "0hello", age: '23', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "11hello", age: '53', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "hello", age: '56', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "hello", age: '23', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "14hello", age: '23', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "hello", age: '60', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "hello", age: '50', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "17hello", age: '45', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "hello", age: '40', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "hello", age: '30', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "20hello", age: '31', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
    ];

    pagedCustomers: Customer[] = [
        { name: "1hello", age: '23', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "2hello", age: '32', date: '11-07-2026', time: '2:00 PM', status: 'admitted', doctor: 'Dr. Deepali' },
        { name: "3hello", age: '33', date: '11-07-2026', time: '2:00 PM', status: 'outpatient', doctor: 'Dr. Deepali' },
        { name: "4hello", age: '22', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "5hello", age: '23', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "6hello", age: '23', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "7hello", age: '23', date: '11-07-2026', time: '2:00 PM', status: 'admitted', doctor: 'Dr. Deepali' },
        { name: "8hello", age: '23', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "9hello", age: '55', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "0hello", age: '23', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "11hello", age: '53', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "hello", age: '56', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "hello", age: '23', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "14hello", age: '23', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "hello", age: '60', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "hello", age: '50', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "17hello", age: '45', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "hello", age: '40', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "hello", age: '30', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
        { name: "20hello", age: '31', date: '11-07-2026', time: '2:00 PM', status: 'discharged', doctor: 'Dr. Deepali' },
    ];

    first: number = 0;
    rows: number = 10;
    // next() {
    //     this.first = this.first + this.rows;
    //     console.log(this.first)
    // }

    // prev() {
    //     this.first = this.first - this.rows;
    // }

    // reset() {
    //     this.first = 0;
    // }

    pageChange(event: TablePageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }
    isLastPage(): boolean {
        return this.customers ? this.first + this.rows >= this.customers.length : true;
    }

    isFirstPage(): boolean {
        return this.customers ? this.first === 0 : true;
    }

    ngOnInit() {
        this.updatePage();
    }
    updatePage() {
        this.pagedCustomers = this.customers.slice(
            this.first,
            this.first + this.rows
        );
    }

    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.rows = event.rows ?? 5;
        this.updatePage();
    }


    scheduleAppointment() {
        this.router.navigate(['/appointments/new']);
    }
    cardSelected() {
        console.log("card selected")
    }
}

export default Appointments;
