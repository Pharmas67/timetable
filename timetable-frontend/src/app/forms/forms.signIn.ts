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
        try {
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
            if(response == "invalidUsernameOrPassword"){
                this.warning = true;
                this.warningMessage = 'Invalid Username or Password';
                return;
            }

            localStorage.setItem('validUser',"true");
            localStorage.setItem('userToken',response);
            
            this.userService.getUser(response)
                .then( response => {                  
                    localStorage.setItem('currentUser',JSON.stringify(response)); 
                    this.router.navigate(['/home']);        
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
            
            return;
        } catch (e) {
            console.log(e);
            throw e;
        }
        
    }

    signInForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });
}
