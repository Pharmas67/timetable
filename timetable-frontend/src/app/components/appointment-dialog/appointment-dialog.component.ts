import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { userService } from '../../service/userService';

@Component({
  selector: 'app-appointment-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './appointment-dialog.component.html'
})
export class AppointmentDialogComponent implements OnInit{
  constructor(private route: ActivatedRoute, private userService:userService) { }

  targetDay: string | null = '';

  selectedItem: string | null = '';
  newCategory: string = '';
  categories: string[] = ['Work','Private','Birthday'];

  appointmentForm = new FormGroup({
    name: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    category: new FormControl(''),
    description: new FormControl('')
  })

  
  ngOnInit(): void {
    this.targetDay = this.route.snapshot.queryParamMap.get('day');
    
    const jwt = localStorage.getItem('userToken');
    this.userService.getUser(jwt)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }

  onSelectionChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    
  }

  addnewCategory(): void {
    if(this.newCategory && !this.categories.includes(this.newCategory)){
      this.categories.push(this.newCategory);
      this.selectedItem = this.newCategory;
      this.newCategory = '';
    }
  }

  async addCategory(){

  }
}
