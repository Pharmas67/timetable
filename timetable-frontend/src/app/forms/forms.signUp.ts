import { Component } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';
import { userService } from '../service/userService';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
    selector: 'forms-signUp',
    standalone:true,
    imports: [ReactiveFormsModule, CommonModule,RouterLink],
    templateUrl: './forms.signUp.html',
    styleUrls: ['./forms.signUp.css']
})
export class formSignUp {
    constructor(private userService: userService, private router: Router) { }

    warningMessage: string = '';
    warning: boolean = false;
    userObj: {
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

    async signUp() {                        
        this.warning = false;
        
        if(this.signUpForm.value.username === ''){
            this.warning = true;            
            this.warningMessage = 'Username Field is empty.';
            return;
        }
        if(this.signUpForm.value.email === ''){
            this.warning = true;
            this.warningMessage = 'Email Field is empty';
            return;
        }
        if(this.signUpForm.value.password === ''){
            this.warning = true;
            this.warningMessage = 'Password Field is empty';
            return;
        }
        if(this.signUpForm.value.password2 === ''){
            this.warning = true;
            this.warningMessage = 'Please confirm your Password';
            return;
        }
        this.userObj.username = this.signUpForm.value.username || '';
        this.userObj.email = this.signUpForm.value.email || '';
        this.userObj.password = this.signUpForm.value.password || '';
        this.userObj.password2 = this.signUpForm.value.password2 || '';
        
        const response = await this.userService.createUser(this.userObj);
        if(response == 'Passwords dont match'){
            this.warning = true;
            this.warningMessage = 'Passwords dont match, please verify they match';
        }
        if(response == 'Something went wrong'){
            this.warning = true;
            this.warningMessage = 'Something went wrong, please try again';
        }
        if(response == 'invalidUsername'){
            this.warning = true;
            this.warningMessage = 'Username already taken, please choose another one';
        }
        if(response == 'invalidEmail'){
            this.warning = true;
            this.warningMessage = 'Email already taken, choose another one';
        }
        if(response == 'UserCreated'){
            this.router.navigate(['/']);
        }
        console.log(response);
        
    }

    signUpForm = new FormGroup({
        username: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        password2: new FormControl('')
    });
}
