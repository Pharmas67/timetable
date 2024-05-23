import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appointmentSerive } from '../../service/appointmentService';

@Component({
  selector: 'app-appointment-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './appointment-dialog.component.html'
})
export class AppointmentDialogComponent implements OnInit{
  constructor(private route: ActivatedRoute, private appointmentService: appointmentSerive) { }

  targetDay: string | null = '';

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
    
  }

  onSelectionChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    
    console.log(value);
    
  }

  addnewCategory(): void {
    console.log(this.newCategory);
    
    if(this.appointmentForm.value.newCategory && !this.categories.includes(this.appointmentForm.value.newCategory)){
      this.categories.push(this.appointmentForm.value.newCategory);
      this.appointmentForm.get('category')?.setValue(this.appointmentForm.value.newCategory);
      console.log(this.appointmentForm.value.category);
      
      this.appointmentForm.value.newCategory = '';
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
