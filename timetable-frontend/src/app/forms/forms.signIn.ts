import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'forms-signIn',
    standalone:true,
    imports: [ReactiveFormsModule],
    templateUrl: './forms.signIn.html',
    styleUrls: ['./forms.signIn.css']
})
export class formSignIn implements OnInit {
    constructor() { }

    ngOnInit(): void {
        
    }

    signIn() {
        
    }

    signInForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });
}
