import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private route: Router) {}
  
  name: string = 'John Doe';
  email: string = 'john.doe@example.com';
  password: string = 'password';
  editingName: boolean = false;
  editingEmail: boolean = false;
  editingPassword: boolean = false;

  editName(){
    this.route.navigate(['/editProfile'], {queryParams: { detail: "name"}});
  }

  editEmail(){
    this.route.navigate(['/editProfile'], {queryParams: { detail: "email"}});
  }

  editPassword(){
    this.route.navigate(['/editProfile'], {queryParams: { detail: "password"}});
  }
}
