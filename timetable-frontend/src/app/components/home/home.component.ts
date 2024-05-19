import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { AppointmentsComponent } from '../appointments/appointments.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CalendarComponent,AppointmentsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{
    
}
