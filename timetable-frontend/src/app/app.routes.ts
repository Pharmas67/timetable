import { Routes } from '@angular/router';
import { formSignIn } from './forms/forms.signIn';
import { formSignUp } from './forms/forms.signUp';
import { HomeComponent } from './components/home/home.component';
import { title } from 'process';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
    {    
        path: '',
        component: formSignIn,
        pathMatch: 'full',
        data: {title: "Sing In"}
    },
    {
        path: 'signup',
        component: formSignUp,
        data: {title: "Sign Up"}
    },
    {
        path: 'home',
        component: HomeComponent,
        data: {title: "Home"}
    },
    {
        path: 'profile',
        component: ProfileComponent,
        data: {title: "Profile"}
    },
    {
        path: 'history',
        component: HomeComponent,
        data: {title: "History"}
    },
];
