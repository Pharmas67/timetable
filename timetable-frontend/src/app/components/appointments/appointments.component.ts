import { Component, Input } from '@angular/core';
import { Appointment } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  @Input() appointments: Appointment[] = [];

  label: string = 'stier';
  timeframe: string = 'hell'
  description: string = 'huhu'

  appointment: {
    label: string,
    timeframe: string,
    description: string
  } = {
    label: 'stier',
    timeframe: 'stehe',
    description: 'stiere'
  }

  constructor() { }
}

