import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { header } from './layout/layout.header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,header],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'timetable-frontend';
}
