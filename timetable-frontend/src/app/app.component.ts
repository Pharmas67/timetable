import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { header } from './layout/header.layout';
import { footer } from './layout/footer.layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,header,footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'timetable-frontend';
}
