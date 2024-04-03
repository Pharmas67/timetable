import { Component } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';
import { user } from '../interfaces/user';
import { userService } from '../service/userService';
import { exit } from 'process';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'forms-signIn',
    standalone:true,
    imports: [ReactiveFormsModule,CommonModule,RouterLink],
    templateUrl: './forms.signIn.html',
    styleUrls: ['./forms.signIn.css']
})
export class formSignIn {
    constructor() { }

    warningMessage: string = '';
    warning: boolean = false;

    signIn() {
        if(this.signInForm.value.email === ''){
            this.warning = true;
            this.warningMessage = 'No email is choosen';
            exit;
        }
        if(this.signInForm.value.password === ''){
            this.warning = true;
            this.warningMessage = 'No Password choosen';
            exit;
        }
       
    }

    signInForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });
}
