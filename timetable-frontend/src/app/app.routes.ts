import { Routes } from '@angular/router';
import { formSignIn } from './forms/forms.signIn';
import { formSignUp } from './forms/forms.signUp';
import { HomeComponent } from './components/home/home.component';

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
        title: 'Home'
    }
];
