import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { userService } from '../../../service/userService';
import { User } from '../../../interfaces/interfaces';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{
  
  constructor(private route: ActivatedRoute, private userService: userService, private router: Router) { }

  profileInfo: String | null = '';

  warningMessage: string = '';
  warning: boolean = false;

  currentUser: User | null = null;

  ngOnInit(): void {
    this.profileInfo = this.route.snapshot.queryParamMap.get('detail');    

    const userString = localStorage.getItem('currentUser');
    
    if(userString !== null){
      this.currentUser = JSON.parse(userString);
    } else {
      this.router.navigate(['/home'], { queryParams: {error:'invalidUser'}})
    }
  }

  usernameForm = new FormGroup({
    username: new FormControl(''),
    cUsername: new FormControl('')
  });

  emailForm = new FormGroup({
    email: new FormControl(''),
    cEmail: new FormControl('')
  })

  passwordForm = new FormGroup({
    oPassword: new FormControl(''),
    password: new FormControl(''),
    cPassword: new FormControl('')
  })

  async sendUsernameData(){
    try {
      if(this.usernameForm.value.username == ''){
        this.warning = true;
        this.warningMessage = 'Please Enter your new Username';
        return;
      }
      if(this.usernameForm.value.cUsername == ''){
        this.warning = true;
        this.warningMessage = 'Please Confirm your new Username';
        return;
      }

      if(this.usernameForm.value.username! !== this.usernameForm.value.cUsername!){
        this.warning = true;
        this.warningMessage = 'Your passwords doesnt match!';
        return;
      }

      const payload = {
        id: this.currentUser!.id,
        username: this.usernameForm.value.username
      }

      const response = await this.userService.updateUser(payload);

      if(response === 'Please choose another Username'){
        this.warning = true;
        this.warningMessage = 'Please choose another Username!';
        return;
      }

      if(response === 'Something went wrong'){
        this.warning = true;
        this.warningMessage = 'Something went wrong, try again!';
        return;
      }

      this.router.navigate(['/profile'], {queryParams: { error: 'none'}})
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  async sendEmailData(){
    try {
      if(this.emailForm.value.email == ''){
        this.warning = true;
        this.warningMessage = 'Please Enter your new Email!';
        return;
      }
      if(this.emailForm.value.cEmail == ''){
        this.warning = true;
        this.warningMessage = 'Please Confirm your new Email!';
        return;
      }

      if(!(this.isValidEmail(this.emailForm.value.email!)) ||!(this.isValidEmail(this.emailForm.value.cEmail!))){
        this.warning = true;
        this.warningMessage = 'Invalid Email';
        return;
      }
      
      if(this.emailForm.value.email! !== this.emailForm.value.cEmail!){
        this.warning = true;
        this.warningMessage = 'Your passwords doesnt match!';
        return;
      }

      const payload = {
        id: this.currentUser!.id,
        email: this.emailForm.value.email
      }

      const response = await this.userService.updateUser(payload);

      if(response === 'Please choose another Email'){
        this.warning = true;
        this.warningMessage = 'Please choose another Email!';
        return;
      }

      if(response === 'Something went wrong'){
        this.warning = true;
        this.warningMessage = 'Something went wrong, try again!';
        return;
      }

      this.router.navigate(['/profile'], {queryParams: { error: 'none'}})
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  async sendPasswordData(){
    try {
      if(this.passwordForm.value.oPassword == ''){
        this.warning = true;
        this.warningMessage = 'Please Enter your old Password!';
        return;
      }
      
      if(this.passwordForm.value.password == ''){
        this.warning = true;
        this.warningMessage = 'Please Enter your new Password!';
        return;
      }

      if(this.passwordForm.value.cPassword == ''){
        this.warning = true;
        this.warningMessage = 'Please Confirm your new Password!';
        return;
      }

      if(this.passwordForm.value.password! !== this.passwordForm.value.cPassword!){
        this.warning = true;
        this.warningMessage = 'Your passwords doesnt match!';
        return;
      }

      const payload = {
        id: this.currentUser!.id,
        oPassword: this.passwordForm.value.oPassword,
        password: this.passwordForm.value.password
      }

      const response = await this.userService.updateUser(payload);

      if(response === 'Your old Password is incorrect'){
        this.warning = true;
        this.warningMessage = 'Your old Password is incorrect!';
        return;
      }

      if(response === 'Something went wrong'){
        this.warning = true;
        this.warningMessage = 'Something went wrong, try again!';
        return;
      }

      this.router.navigate(['/profile'], {queryParams: { error: 'none'}})
    } catch(e) {
      console.log(e);
      throw e;
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
} 
