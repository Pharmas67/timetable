import { Injectable } from "@angular/core";
import axios from "axios";
import { Router } from "@angular/router";
import { User } from "../interfaces/interfaces";


@Injectable({
    providedIn: 'root'
})
export class userService {
    constructor(private router:Router) {}

    async createUser(obj: Object): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/users/register.php',obj);
            return response.data;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    async loginUser(obj: Object): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/users/login.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async getUser(jwt: String | null): Promise<User> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/users/profile.php',jwt);
            
            if(!(response.data instanceof Object)){
                localStorage.removeItem('userToken');
                localStorage.removeItem('validUser');
                this.router.navigate(['/'], {queryParams: { error: 'invalidToken'}});
            }

            const userData = response.data as User;
            
            return userData;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async updateUser(obj: Object): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/users/updateProfile.php', obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async updateUserImage(obj: Object): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/users/updateUserImage.php', obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async fetchUserList(): Promise<Array<User>> {
        try {
            const response = await axios.get('http://localhost/mysql/ajax/users/userList.php');
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async authenticate(jwt: String | null): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/users/authenticateToken.php', jwt);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
}