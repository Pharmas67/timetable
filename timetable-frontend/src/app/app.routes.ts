import { Routes } from '@angular/router';
import { formSignIn } from './forms/forms.signIn';
import { formSignUp } from './forms/forms.signUp';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AppointmentDialogComponent } from './components/appointment-dialog/appointment-dialog.component';

export const routes: Routes = [
    {    
        path: '',
        component: formSignIn,
        title: "Sign In"
    },
    {
        path: 'signup',
        component: formSignUp,
        data: {title: "Sign Up"}
    },
    {
        path: 'home',
        component: HomeComponent,
        title: "Home"
    },
    {
        path: 'profile',
        component: ProfileComponent,
        title: "Profile"
    },
    {
        path: 'history',
        component: AppointmentDialogComponent,
        title: "History"
    },
    {
        path: 'appointmentDialog',
        component: AppointmentDialogComponent,
        title: "New Appointment"
    }
];  
