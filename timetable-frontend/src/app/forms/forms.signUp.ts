import { Component,Directive, inject } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';
import { user } from '../interfaces/user';
import { userService } from '../service/userService';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'forms-signIn',
    standalone:true,
    imports: [ReactiveFormsModule, CommonModule,RouterLink],
    templateUrl: './forms.signUp.html',
    styleUrls: ['./forms.signUp.css']
})
export class formSignUp {
    constructor() { }

    userService = inject(userService);

    warningMessage: string = '';
    warning: boolean = false;
    newUser: {
        username: string,
        email: string,
        password: string,
        password2: string
      } = {
        username: '',
        email: '',
        password: '',
        password2: ''
      };
    secondUser: any;

    signUp() {
        if(this.signUpForm.value.username === ''){
            this.warning = true;
            this.warningMessage = 'Username Field is empty.';
        }
        if(this.signUpForm.value.email === ''){
            this.warning = true;
            this.warningMessage = 'Email Field is empty';
        }
        if(this.signUpForm.value.password === ''){
            this.warning = true;
            this.warningMessage = 'Password Field is empty';
        }
        if(this.signUpForm.value.password2 === ''){
            this.warning = true;
            this.warningMessage = 'Please confirm your Password';
        }
        this.newUser.username = this.signUpForm.value.username || '';
        this.newUser.email = this.signUpForm.value.email || '';
        this.newUser.password = this.signUpForm.value.password || '';
        this.newUser.password2 = this.signUpForm.value.password2 || '';
        
        this.secondUser = this.userService.createUser(this.newUser);
        console.log(this.secondUser);
        
    }

    signUpForm = new FormGroup({
        username: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        password2: new FormControl('')
    });
}
