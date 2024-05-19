import { Injectable } from "@angular/core";
import axios from "axios";
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class userService {
    constructor(private router:Router) {}

    async createUser(obj: Object): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/register.php',obj);
            return response.data;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async loginUser(obj: Object): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/login.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async getUser(jwt: String | null): Promise<any> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/profile.php',jwt);
            
            if(!(response.data instanceof Object)){
                localStorage.removeItem('userToken');
                localStorage.removeItem('validUser');
                this.router.navigate(['/'], {queryParams: { error: 'invalidToken'}});
                return;
            }
            
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
}