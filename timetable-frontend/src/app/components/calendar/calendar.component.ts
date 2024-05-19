import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  constructor(private router:Router) { }
  
  currentDate = new Date();
  currentMonth: string = '';
  currentYear: number = 0;
  daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendar: (number | null)[][] = [];

  ngOnInit(): void {
    this.renderCalendar(this.currentDate.getMonth(), this.currentDate.getFullYear());
  }

  renderCalendar(month: number, year: number): void {
    this.currentMonth = this.getMonthName(month);
    this.currentYear = year;

    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const daysInMonth = endDate.getDate();
    const startDay = startDate.getDay();
    const endDay = endDate.getDay();

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

  selectDate(day: (number | null)): void {
    console.log(day); 
  }

  newAppointment(day: (number | null)): void {
    this.router.navigate(['/appointmentDialog'], { queryParams: {day: day}});
  }
}
