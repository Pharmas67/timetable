import { Component } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';
import { userService } from '../service/userService';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

@Component({
    selector: 'forms-signIn',
    standalone:true,
    imports: [ReactiveFormsModule,CommonModule,RouterLink],
    templateUrl: './forms.signIn.html',
    styleUrls: ['./forms.signIn.css']
})
export class formSignIn {
    constructor(private userService: userService, private router: Router) { }

    warningMessage: string = '';
    warning: boolean = false;
    userObj: {
        email: string
        password: string
    } = {
        email: '',
        password: ''
    };


    async signIn() {
        if(this.signInForm.value.email === ''){
            this.warning = true;
            this.warningMessage = 'No email is choosen';
            return;
        }
        if(this.signInForm.value.password === ''){
            this.warning = true;
            this.warningMessage = 'No Password choosen';
            return;    
        }
        
        this.userObj.email = this.signInForm.value.email || '';
        this.userObj.password = this.signInForm.value.password || '';

        const response = await this.userService.loginUser(this.userObj);
        console.log(response);
        return;
    }

    signInForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });
}
