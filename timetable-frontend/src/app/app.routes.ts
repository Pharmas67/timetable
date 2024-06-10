import { Routes } from '@angular/router';
import { formSignIn } from './forms/forms.signIn';
import { formSignUp } from './forms/forms.signUp';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AppointmentDialogComponent } from './components/appointment-dialog/appointment-dialog.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';

export const routes: Routes = [
    {    
        path: '',
        component: formSignIn,
        title: "Sign In"
    },
    {
        path: 'signup',
        component: formSignUp,
        title: "Sign Up"
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
    },
    {
        path: 'editProfile',
        component: EditProfileComponent,
        title: "Edit Profile"
    }
];  
