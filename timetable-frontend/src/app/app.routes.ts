import { Routes } from '@angular/router';
import { formSignIn } from './forms/forms.signIn';

export const routes: Routes = [
    {
        path: '',
        component: formSignIn,
        title: "Sign In"
    },
    {
        path: 'home/:id',
        component: formSignIn
    }
];
