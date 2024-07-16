import { Component, Input,OnChanges, SimpleChanges } from '@angular/core';
import { Appointment, User } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { appointmentSerive } from '../../service/appointmentService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnChanges{  
  appointments!: Appointment[];

  currentUser: User | null = null;
  currentUserReady: Boolean = false;

  warningMessage: string = '';
  warning: boolean = false;

  constructor(private appointmentService: appointmentSerive, private router:Router) {
    this.appointments = [];
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    const userString = localStorage.getItem('currentUser');
    
    this.currentUser = JSON.parse(userString!);
    
    if(changes['sharedDay'] && changes['sharedDay'].currentValue){
      const sharedDay = changes['sharedDay'].currentValue;
      
      const payload = {
        userId: this.currentUser!.id,
        day: sharedDay.day,
        month: sharedDay.month,
        year: sharedDay.year
      }
  
      this.appointmentService.getAppointmentsByMonth(payload)
      .then( response => {    
        if(typeof response === 'string' && response === 'Something went wrong'){
          this.warning = true;
          this.warningMessage = 'Something went wrong while Loading the Appointments';
        }
        
        if (Array.isArray(response) && response.length !== 0) {
          response.forEach((item: Appointment) => {
            if (!this.appointments.some(appointment => appointment.id === item.id)) {
              this.appointments.push(item);
            }
          });
        }

        console.log(this.appointments);
      })
      .catch( error => {
        console.error('Error fetching user data:', error);
        this.warning = true;
        this.warningMessage = 'An error occurred while loading the appointments';
      });      
    }
  }
}

