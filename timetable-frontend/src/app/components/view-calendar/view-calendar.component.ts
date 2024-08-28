import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LightCalendarComponent } from '../calendar/light-calendar/light-calendar.component';
import { User } from '../../interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-calendar',
  standalone: true,
  imports: [CommonModule,LightCalendarComponent],
  templateUrl: './view-calendar.component.html',
  styleUrl: './view-calendar.component.css'
})
export class ViewCalendarComponent implements OnInit{
  constructor(private route:ActivatedRoute) {}

  id: BinaryData | undefined;

  ngOnInit(): void {
    
    this.id = this.route.snapshot.queryParamMap.get('viewId')
    
  }
}
