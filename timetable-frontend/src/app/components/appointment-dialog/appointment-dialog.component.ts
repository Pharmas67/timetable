import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appointmentSerive } from '../../service/appointmentService';
import { User } from '../../interfaces/interfaces';
import { Binary } from '@angular/compiler';

@Component({
  selector: 'app-appointment-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './appointment-dialog.component.html'
})
export class AppointmentDialogComponent implements OnInit{
  constructor(private route: ActivatedRoute, private appointmentService: appointmentSerive, private router:Router) { }

  targetDay: string | null = '';
  targetMonth: string | null = '';
  targetYear: string | null = '';

  currentUser: User | null = null;
  
  warningMessage: string = '';
  warning: boolean = false;

  selectedItem: string | null = '';
  newCategory: string = '';
  categories: string[] = ['Work','Private','Birthday'];

  appointmentForm = new FormGroup({
    name: new FormControl(''),
    startTime: new FormControl(''),
    endTime: new FormControl(''),
    category: new FormControl('Work'),
    newCategory: new FormControl(''),
    description: new FormControl('No Description given')
  })
  
  ngOnInit(): void {
    this.targetDay = this.route.snapshot.queryParamMap.get('day');
    this.targetMonth = this.route.snapshot.queryParamMap.get('month');
    this.targetYear = this.route.snapshot.queryParamMap.get('year');

    const userString = localStorage.getItem('currentUser');
    
    if(userString !== null){
      this.currentUser = JSON.parse(userString);
    } else {
      this.router.navigate(['/home'], { queryParams: {error:'invalidUser'}})
    }

    const payload = {
      userId: this.currentUser?.id
    }

    this.appointmentService.getCategories(payload)
    .then((response: any) => {
      for(const row of response){
        if(!this.categories.includes(row.category)){
          this.categories.push(row.category);
        }
      }
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
    }); 
  }

  async addnewCategory() {
    console.log(this.appointmentForm.value.newCategory);
    
    if(this.appointmentForm.value.newCategory && !this.categories.includes(this.appointmentForm.value.newCategory)){
      this.categories.push(this.appointmentForm.value.newCategory);
      this.appointmentForm.get('category')?.setValue(this.appointmentForm.value.newCategory);
      
      const payload = {
        userId: this.currentUser!.id,
        category: this.appointmentForm.value.newCategory
      }
      console.log(payload);
      
      const response = await this.appointmentService.addCategory(payload);
      
      if(response === 'Something went wrong'){
        this.warning = true;
        this.warningMessage = 'Something went wrong with your Category, Try again!';
      }
    } 
  }

  async submitAppointment(){
    if(this.appointmentForm.value.name === ''){
      this.warning = true;
      this.warningMessage = 'No Name is choosen';
      return;
    }
    
    if(this.appointmentForm.value.category === ''){
      this.appointmentForm.value.category = 'None';
    }

    if(this.appointmentForm.value.startTime === ''){
      this.appointmentForm.value.startTime = '0:00';
    }

    if(this.appointmentForm.value.endTime === ''){
      this.appointmentForm.value.endTime = '24:00';
    }

    if(parseInt(this.appointmentForm.value.endTime!) > parseInt(this.appointmentForm.value.startTime!)){
      const tmpStartTime = this.appointmentForm.value.startTime;
      this.appointmentForm.value.startTime = this.appointmentForm.value.endTime;
      this.appointmentForm.value.endTime = tmpStartTime;
    }

    const payload = {
      userId: this.currentUser?.id,
      name: this.appointmentForm.value.name,
      startDate: this.appointmentForm.value.startTime,
      endDate: this.appointmentForm.value.endTime,
      category: this.appointmentForm.value.category,
      description: this.appointmentForm.value.description,
      day: this.targetDay,
      month: this.targetMonth,
      year: this.targetYear
    }
    
    const response = await this.appointmentService.createAppointment(payload);
    
    if(response == 'Something went wrong'){
      this.warning = true;
      this.warningMessage = 'Something went wrong';
      return;
    }

    this.router.navigate(['/home'], { queryParams: {errors: 'none'}});
  }
}
