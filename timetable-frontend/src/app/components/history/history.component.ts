import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { appointmentService } from '../../service/appointmentService';
import { Appointment, User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit{
  constructor(private appointmentService:appointmentService) {}
  
  currentUser: User | undefined;

  appointmentsArray: Appointment[] = [];

  ngOnInit(): void {
    const userString = localStorage.getItem('currentUser');
    
    this.currentUser = JSON.parse(userString!);

    const payload = {
      userId: this.currentUser?.id
    }

    this.fetchAppointments(payload);

    console.log(this.appointmentsArray);
    
  }

  private fetchAppointments(userObj: Object) {
    this.appointmentService.getAppointments(userObj)
    .then((response: Appointment[]) => {
      if(Array.isArray(response) && response.length !== 0){
        response.forEach((item: Appointment) => {
          if(!this.appointmentsArray.some((element: Appointment) => element.id === item.id)){
            this.appointmentsArray.push(item);
          }
        })
      }

      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;  // Adjust to match 1-based indexing
      const day = date.getDate();  

      console.log(this.appointmentsArray);
      
      this.appointmentsArray = this.appointmentsArray.filter((appointment: Appointment) => {
        if (appointment.year.valueOf() < year) {
            return true;
        } else if (appointment.year.valueOf() === year && this.getMonthNumber(appointment.month.toString()) < month) {
            return true;
        } else if (appointment.year.valueOf() === year && this.getMonthNumber(appointment.month.toString()) === month && appointment.day.valueOf() <= day) {
            return true;
        } else {
            return false;
        }
      });

      console.log(this.appointmentsArray);
      
    })
  }

  getMonthNumber(monthName: string): number {
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    
    const monthIndex = months.indexOf(monthName);
    return monthIndex >= 0 ? monthIndex + 1 : 0;
  }
}
