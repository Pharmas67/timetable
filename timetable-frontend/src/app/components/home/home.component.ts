import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { User } from '../../interfaces/interfaces';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CalendarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  
  currentUser: User | undefined;
  
  ngOnInit(): void {
    
    const userString = localStorage.getItem('currentUser');
    
    this.currentUser = JSON.parse(userString!);
    
  }
}
