import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Button } from "primeng/button";
import { Router } from "@angular/router";
// Simple interfaces to model the data
interface Doctor {
  id: number;
  name: string;
  departmentId: number;
  image: string;
  date: string;
}

interface TimeSlot {
  time: string;
  status: 'booked' | 'available' | 'selected';
}
interface Department {
  name: string;
  id: number;
}
@Component({
    standalone: true,
    selector: "ht-appointmentScheduling",
    templateUrl: "./appointmentScheduling.component.html",
    styleUrl: "./appointmentScheduling.component.css",
    imports: [Button,CommonModule, FormsModule, ReactiveFormsModule],
})
class AppointmentScheduling {

    backToAppointmentList(){
        this.router.navigate(['/appointments']);
    }
  // Search parameters
  searchDate: string = '';
  drNameSearch: string = '';
  departmentName: string = '';

  // Data arrays
  doctors: Doctor[] = [];
  selectedDoctor: Doctor | null = null;
  selectedSlot: string | null = null;
selectedDepartment: Department | null = null;
  // Form group for patient details
  patientForm: FormGroup;
departments: Department[] = [
  { name: 'Cardiology', id: 1 },
  { name: 'Orthopedics', id: 2 },
  { name: 'Gynecology', id: 3 },
  { name: 'Neurology', id: 4 },
  { name: 'Pediatrics', id: 5 }
];
  // Mock time slot categories mapping to UI layout
  morningSlots: TimeSlot[] = [
    { time: '08-09', status: 'booked' },
    { time: '09-10', status: 'available' },
    { time: '10-11', status: 'available' },
    { time: '11-12', status: 'available' }
  ];

  afternoonSlots: TimeSlot[] = [
    { time: '12-01', status: 'booked' },
    { time: '01-02', status: 'available' },
    { time: '02-03', status: 'available' },
    { time: '03-04', status: 'available' }
  ];

  eveningSlots: TimeSlot[] = [
    { time: '04-05', status: 'booked' },
    { time: '05-06', status: 'available' },
    { time: '06-07', status: 'available' },
    { time: '07-08', status: 'available' }
  ];
doctorsAvailable:Doctor[] = [
            { id: 1,name: 'Dr. Sam', departmentId:1,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8CVWhfoRsUH0fnBEp9SIvpuF-lhbX_tMiAPbCH-ldyQ&s=10",date:"2026-07-17"},
            { id: 2,name: 'Dr. Sheetal', departmentId:2,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi-tzBJ3dm94MnYVJ1SaVbABDo2d9Aps3hwuIHDxbA8Q&s=10",date:"2026-07-17"},
            { id: 3,name: 'Dr. Jyoti', departmentId:3,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi-tzBJ3dm94MnYVJ1SaVbABDo2d9Aps3hwuIHDxbA8Q&s=10",date:"2026-07-18"},
            { id: 4,name: 'Dr. Rome', departmentId:4,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8CVWhfoRsUH0fnBEp9SIvpuF-lhbX_tMiAPbCH-ldyQ&s=10",date:"2026-07-16"},
            { id: 5,name: 'Dr. Viney', departmentId:5,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8CVWhfoRsUH0fnBEp9SIvpuF-lhbX_tMiAPbCH-ldyQ&s=10",date:"2026-07-16"},
        ];
  constructor(private router: Router,private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      primaryPhone: ['', Validators.required],
      secondaryPhone: [''],
      email: ['', [Validators.required, Validators.email]],
      emergencyContactName: ['', Validators.required],
      emergencyPhone: ['', Validators.required],
      emergency2ndPhone: [''],
      description: ['']
    });
  }

  getWeekdayName(dateString: string): string {
    const date = new Date(dateString);
    const day = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
    return day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();
}

  // Step 1 Trigger: Triggered on input change or search button click
  searchDoctors() {
    if (this.searchDate || this.drNameSearch || this.selectedDepartment) {
      // Mock API response matching the image layout grid
      this.doctors = this.doctorsAvailable.filter((doc) => {
        const matchesName = this.drNameSearch 
          ? doc.name.toLowerCase().includes(this.drNameSearch.toLowerCase()) 
          : true;
          
        const matchesDepartment = this.selectedDepartment 
          ? doc.departmentId === this.selectedDepartment?.id 
          : true;
          
        // Add your date filtering logic here if needed (e.g., doc.availableDates.includes(this.searchDate))
        const matchesDate = this.searchDate ? doc.date.includes(this.searchDate) : true; 

        return matchesName && matchesDepartment && matchesDate;
      }).map((doc) => ({
        id:doc.id,
        name: doc.name,
        departmentId: doc.departmentId,
        date: doc.date,
        image: doc.image // Replace with your real assets
      }));
      
      // Reset subsequent steps if fresh search happens
      this.selectedDoctor = null;
      this.selectedSlot = null;
    }
  }

  // Step 2 Selection
  selectDoctor(doctor: Doctor) {
    this.selectedDoctor = doctor;
    this.selectedSlot = null; // Reset slot if doctor changes
  }

  // Step 3 Selection
  selectSlot(slot: TimeSlot) {
    if (slot.status === 'booked') return;
    this.selectedSlot = slot.time;
  }

  // Submit Action
  onSubmit() {
    if (this.patientForm.valid) {
      const payload = {
        date: this.searchDate,
        doctor: this.selectedDoctor,
        slot: this.selectedSlot,
        patientDetails: this.patientForm.value
      };
      console.log('Booking Confirmed Payload:', payload);
      // Call your HTTP Service here
    } else {
      this.patientForm.markAllAsTouched();
    }
  }

  onCancel() {
    // Reset wizard
    this.selectedDoctor = null;
    this.selectedSlot = null;
    this.patientForm.reset();
  }
}
export default AppointmentScheduling;
