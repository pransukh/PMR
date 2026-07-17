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
import { KeyValuePipe,TitleCasePipe } from '@angular/common';
interface Paitent {
    name: string;
    id: number;
}
interface Department {
    name: string;
    id: number;
}
interface HolidaySchedule {
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
}
interface Timeslot {
    start: string;
    end: string;
    isAvailable: boolean;
}
interface WeeklySlots {
  mon: Timeslot[] | undefined;
  tue: Timeslot[] | undefined;
  wed: Timeslot[] | undefined;
  thu: Timeslot[] | undefined;
  fri: Timeslot[] | undefined;
  sat: Timeslot[] | undefined;
  sun: Timeslot[] | undefined;
}
interface Doctor {
    name: string;
    id: number;
    departmentId:number;
    holidays:HolidaySchedule,
    slot:WeeklySlots[]
}

@Component({
    standalone: true,
    selector: "ht-appointmentScheduling",
    templateUrl: "./appointmentScheduling.component.html",
    styleUrl: "./appointmentScheduling.component.css",
    imports: [Button, FormsModule, SelectModule, FloatLabelModule, DatePickerModule, TextareaModule, IftaLabelModule, DividerModule,KeyValuePipe,TitleCasePipe ]
})


class AppointmentScheduling {
    constructor(private router: Router) {}
    private readonly storageKey = 'appointmentSchedulingForm';

    backToAppointmentList(){
        this.router.navigate(['/appointments']);
    }

    paitents: Paitent[] = [];
    departments: Department[] = [];
    doctors: Doctor[] = [];
    filteredDoctors: Doctor[] = [];
    paitent: Paitent | undefined;
    department: Department | undefined;
    doctor: Doctor | undefined;
    date: Date|undefined;
    selectedTime: Date|undefined;
    timetable='';
    description ="";
    dayOrder = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    sortDays = (a: any, b: any): number => {
        return this.dayOrder.indexOf(a.key) - this.dayOrder.indexOf(b.key);
    }

    saveFormData(): void {
        if (typeof window === 'undefined') {
            return;
        }
        // if (!this.date || !this.selectedTime) {
        //     console.warn('Please select both a date and a time.');
        //     return;
        // }
            // 1. Extract pure Date (YYYY-MM-DD) local time
        const year = this.date?.getFullYear();
        const monthNumber = this.date?.getMonth() ?? 0; 
        const month = String(monthNumber + 1).padStart(2, '0');
        const day = String(this.date?.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        // 2. Extract pure Time (HH:MM:SS) local time
        const hours = String(this.selectedTime?.getHours()).padStart(2, '0');
        const minutes = String(this.selectedTime?.getMinutes()).padStart(2, '0');
        const seconds = String(this.selectedTime?.getSeconds()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;

        const formData = {
            paitentId: this.paitent?.id ?? null,
            departmentId: this.department?.id ?? null,
            doctorId: this.doctor?.id ?? null,
            date: formattedDate,
            selectedTime: formattedTime,
            timetable: this.timetable,
            description: this.description
        };
    // console.log(JSON.stringify(formData))
        localStorage.setItem(this.storageKey, JSON.stringify(formData));
        this.resetForm();
    }

    resetForm():void{
        this.paitent=undefined;
        this.department=undefined;
        this.doctor=undefined;
        this.date=undefined;
        this.selectedTime=undefined;
        this.timetable='';
        this.description ="";
        this.filteredDoctors = [];
    }

    // private loadFormData(): void {
    //     if (typeof window === 'undefined') {
    //         return;
    //     }

    //     const savedData = localStorage.getItem(this.storageKey);
    //     if (!savedData) {
    //         return;
    //     }

    //     try {
    //         const formData = JSON.parse(savedData);
    //         this.paitent = this.paitents.find((item) => item.id === formData.paitentId);
    //         this.department = this.departments.find((item) => item.id === formData.departmentId);
    //         this.onDepartmentChange();
    //         this.doctor = this.filteredDoctors.find((item) => item.id === formData.doctorId);
    //         this.date = formData.date ?? '';
    //         this.selectedTime = formData.selectedTime ?? '';
    //         this.timetable = formData.timetable ?? '';
    //         this.description = formData.description ?? '';
    //     } catch {
    //         localStorage.removeItem(this.storageKey);
    //     }
    // }

    ngOnInit() {
        this.paitents = [
            { name: 'Ram', id: 1 },
            { name: 'Sham', id: 2 },
            { name: 'Raju', id: 3 },
            { name: 'Komal', id: 4 },
            { name: 'Priya', id: 5 }
        ];
        this.departments = [
            { name: 'Cardiology', id: 1 },
            { name: 'Orthopedics', id: 2 },
            { name: 'Gynecology', id: 3 },
            { name: 'Neurology', id: 4 },
            { name: 'Pediatrics', id: 5 }
        ];
        
        this.doctors = [
            { name: 'Dr. Sam', id: 1,departmentId:1,holidays : {mon:true,tue:true,wed:true,thu:true,fri:true,sat:false,sun:false},
            slot: [
                {
                    mon: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: false },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: true },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: true },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: true },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: true },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: true },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: true },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: true },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: true },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: true },
                    ],
                    tue: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: true },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: true },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: true },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: true },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: true },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: true },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    wed: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: true },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: true },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: true },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: true },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: true },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    thu: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: true },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: true },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: true },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: true },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    fri: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: true },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: true },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: true },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: true },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: true },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: true },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: true },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sat: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: true },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: true },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: true },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: true },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: true },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: true },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: true },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: true },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: true },
                    ],
                    sun: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: true },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: true },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: true },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: true },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: true },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: true },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: true },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: true },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: true },
                    ]
                }
            ] },
            { name: 'Dr. Ram', id: 2,departmentId:1,holidays : {mon:true,tue:true,wed:false,thu:true,fri:true,sat:true,sun:false},
        slot: [
                {
                    mon: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    tue: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    wed: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    thu: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    fri: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sat: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sun: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ]
                }
            ] },
            { name: 'Dr. Ravi',id:3,departmentId:2,holidays : {mon:true,tue:false,wed:true,thu:false,fri:true,sat:false,sun:false},
        slot: [
                {
                    mon: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    tue: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    wed: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    thu: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    fri: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sat: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sun: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ]
                }
            ] },
            { name: 'Dr. Deepti', id: 4,departmentId:2,holidays : {mon:true,tue:true,wed:true,thu:false,fri:true,sat:false,sun:false},
        slot: [
                {
                    mon: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    tue: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    wed: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    thu: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    fri: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sat: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sun: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ]
                }
            ] },
            { name: 'Dr. Pooja', id: 5,departmentId:3,holidays : {mon:false,tue:true,wed:true,thu:true,fri:true,sat:false,sun:false},
        slot: [
                {
                    mon: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    tue: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    wed: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    thu: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    fri: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sat: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sun: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ]
                }
            ] },
            { name: 'Dr. Laxmi', id: 6,departmentId:3,holidays : {mon:true,tue:true,wed:false,thu:true,fri:true,sat:true,sun:false},
        slot: [
                {
                    mon: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    tue: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    wed: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    thu: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    fri: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sat: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sun: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ]
                }
            ] },
            { name: 'Dr. Neha', id: 7,departmentId:4,holidays : {mon:true,tue:true,wed:true,thu:true,fri:true,sat:false,sun:false},
        slot: [
                {
                    mon: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    tue: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    wed: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    thu: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    fri: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sat: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sun: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ]
                }
            ] },
            { name: 'Dr. Priya', id: 8,departmentId:4,holidays : {mon:true,tue:false,wed:true,thu:false,fri:true,sat:false,sun:false},
        slot: [
                {
                    mon: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    tue: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    wed: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    thu: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    fri: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sat: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sun: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ]
                }
            ] },
            { name: 'Dr. Raman', id: 9,departmentId:5,holidays : {mon:true,tue:true,wed:true,thu:true,fri:false,sat:false,sun:false},
        slot: [
                {
                    mon: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    tue: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    wed: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    thu: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    fri: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: false },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sat: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ],
                    sun: [
                    { start: "09:00 AM", end: "10:00 AM", isAvailable: true },
                    { start: "10:00 AM", end: "11:00 AM", isAvailable: true },
                    { start: "11:00 AM", end: "12:00 PM", isAvailable: false },
                    { start: "12:00 PM", end: "01:00 PM", isAvailable: false },
                    { start: "01:00 PM", end: "02:00 PM", isAvailable: false },
                    { start: "02:00 PM", end: "03:00 PM", isAvailable: false },
                    { start: "03:00 PM", end: "04:00 PM", isAvailable: false },
                    { start: "04:00 PM", end: "05:00 PM", isAvailable: false },
                    { start: "05:00 PM", end: "06:00 PM", isAvailable: false },
                    { start: "06:00 PM", end: "07:00 PM", isAvailable: false },
                    { start: "07:00 PM", end: "08:00 PM", isAvailable: false },
                    ]
                }
            ] }
        ];

        // this.loadFormData();
    }
    onDepartmentChange(): void {
        this.doctor = undefined; // Reset doctor selection using your ngModel variable

        // Use Optional Chaining (?.) to safely handle department being undefined
        if (this.department) {
            this.filteredDoctors = this.doctors.filter(
                (doc) => doc.departmentId === this.department?.id
            );
        } else {
            this.filteredDoctors = [];
        }

        // this.saveFormData();
    }
}

export default AppointmentScheduling;
