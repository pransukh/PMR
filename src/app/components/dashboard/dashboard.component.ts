import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TablePageEvent } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { Paginator, PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Router } from "@angular/router";

interface Customer {
    name: string;
    age: string;
    status: string;
    doctor: string;
}

@Component({
    standalone: true,
    selector: "ht-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrl: "./dashboard.component.css",
    imports: [ButtonModule, TableModule, TagModule, CommonModule,DividerModule, PaginatorModule]
})


class Dashboard {
    constructor(private router: Router) { }
    
    customers: Customer[] = [
        {name: "1hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "2hello", age:'23', status:'admitted', doctor:'Dr. Deepali'},
        {name: "3hello", age:'23', status:'outpatient', doctor:'Dr. Deepali'},
        {name: "4hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "5hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "6hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "7hello", age:'23', status:'admitted', doctor:'Dr. Deepali'},
        {name: "8hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "9hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "0hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "11hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "14hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "17hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "20hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
    ];

    pagedCustomers: Customer[] = [
        {name: "1hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "2hello", age:'23', status:'admitted', doctor:'Dr. Deepali'},
        {name: "3hello", age:'23', status:'outpatient', doctor:'Dr. Deepali'},
        {name: "4hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "5hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "6hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "7hello", age:'23', status:'admitted', doctor:'Dr. Deepali'},
        {name: "8hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "9hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "0hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "11hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "14hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "17hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
        {name: "20hello", age:'23', status:'discharged', doctor:'Dr. Deepali'},
    ];

    first: number = 0;
    rows: number = 10;
    next() {
        this.first = this.first + this.rows;
        console.log(this.first)
    }

    prev() {
        this.first = this.first - this.rows;
    }

    reset() {
        this.first = 0;
    }

    pageChange(event : TablePageEvent) {
        this.first = event.first;
        this.rows = event.rows;
    }
    isLastPage(): boolean {
        return this.customers ? this.first + this.rows >= this.customers.length : true;
    }

    isFirstPage(): boolean {
        return this.customers ? this.first === 0 : true;
    }

    kfirst: number = 0;
    krows: number = 5;

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

    patientRegistration(){
        this.router.navigate(['patient/new'])
    }
}

export default Dashboard;
