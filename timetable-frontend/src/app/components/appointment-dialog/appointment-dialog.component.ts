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
    category: new FormControl(''),
    newCategory: new FormControl(''),
    description: new FormControl('')
  })
  
  ngOnInit(): void {
    this.targetDay = this.route.snapshot.queryParamMap.get('day');
    
    const userString = localStorage.getItem('currentUser');
    
    if(userString !== null){
      this.currentUser = JSON.parse(userString);
    } else {
      this.router.navigate(['/home'], { queryParams: {error:'invalidUser'}})
    }
  }

  onSelectionChange(event: Event) {
    const newCategory = (event.target as HTMLSelectElement).value;
        
    
  }

  async addnewCategory() {
    console.log(this.newCategory);
    
    if(this.appointmentForm.value.newCategory && !this.categories.includes(this.appointmentForm.value.newCategory)){
      this.categories.push(this.appointmentForm.value.newCategory);
      this.appointmentForm.get('category')?.setValue(this.appointmentForm.value.newCategory);
      console.log(this.appointmentForm.value.category);
      
      this.appointmentForm.value.newCategory = '';
    }

    const payload = {
      userId: this.currentUser?.id,
      category: this.newCategory
    }

    console.log(payload);
    
    const response = await this.appointmentService.addCategory(payload);

    if(response === 'Something went wrong'){
      this.warning = true;
      this.warningMessage = 'Something went wrong with your Category, Try again!';
    }
  }

  async submitAppointment(){
    if(this.appointmentForm.value.name === ''){
      this.warning = true;
      this.warningMessage = 'No email is choosen';
      return;
    }
    
    const response = await this.appointmentService;
  }
}
