import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment, User } from '../../../interfaces/interfaces';
import { appointmentSerive } from '../../../service/appointmentService';

@Component({
  selector: 'app-light-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './light-calendar.component.html',
  styleUrl: './light-calendar.component.css'
})
export class LightCalendarComponent implements OnInit{
  constructor(private route:ActivatedRoute, private appointmentService: appointmentSerive, private cdRef:ChangeDetectorRef, private ngZone:NgZone) { }

  @Input() viewId: BinaryData | undefined;

  currentDate = new Date();
  currentMonth: string = '';
  currentYear: number = 0;
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendar: (number | null)[][] = [];

  appointmentsArray:(Appointment)[] = [];
  isDataAvailable: boolean = false;

  ngOnInit(): void {
    this.renderCalendar(this.currentDate.getMonth(), this.currentDate.getFullYear());

    const payload = {
      userId: this.viewId,
      month: this.currentMonth,
      year: this.currentYear
    }    

    this.getAppointmentsbyMonth(payload);
    
  }

  private getAppointmentsbyMonth(payload: Object){
    this.appointmentService.getAppointmentsByMonth(payload)
    .then(response => {
      
      if(Array.isArray(response) && response.length !== 0){
        response.forEach((item: Appointment) => {
          if(!this.appointmentsArray.some(appointment => appointment.id === item.id)){
            this.appointmentsArray.push(item);
          }
        })
      }
      
      this.appointmentsArray.sort((a, b) => {
        if(parseInt(a.startDate.toString()) !== parseInt(b.startDate.toString())){
          return parseInt(a.startDate.toString()) - parseInt(b.startDate.toString());
        } else {
          return parseInt(a.endDate.toString()) - parseInt(b.endDate.toString());
        }
      });
      
      this.isDataAvailable = true;
    })
    .catch(error => {
      console.log(error);
    })
  }

  renderCalendar(month: number, year: number): void {
    this.currentMonth = this.getMonthName(month);
    this.currentYear = year;    

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const daysInMonth = endDate.getDate();
    const startDay = startDate.getDay();

    let date = 1;
    this.calendar = [];
    for (let i = 0; i < 6; i++) {
      let week: (number | null)[] = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startDay) {
          week.push(null);
        } else if (date > daysInMonth) {
          break;
        } else {
          week.push(date);
          date++;
        }
      }
      this.calendar.push(week);
    }
  }

  prevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar(this.currentDate.getMonth(), this.currentDate.getFullYear());
  }

  nextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar(this.currentDate.getMonth(), this.currentDate.getFullYear());
  }

  getMonthName(month: number): string {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
  }
}
