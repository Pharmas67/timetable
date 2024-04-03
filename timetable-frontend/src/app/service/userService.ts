import { Injectable } from "@angular/core";
import { user } from "../interfaces/user";
import axios from "axios";

@Injectable({
    providedIn: 'root'
})
export class userService {
    constructor() {}
    userData: {
        username: string,
        email: string,
        password: string,
        password2: string
    } = {
        username: '',
        email: '',
        password: '',
        password2: ''
    }


    async createUser(obj: Object): Promise<Object | undefined> {
        axios.post('http://localhost/mysql/ajax/register.php',obj)
            .then(response => {
                console.log(response.data);
                this.userData!.username = response.data['username'];
                this.userData!.email = response.data['email'];
                
            })
            .catch(err => {
                console.log(err);
            });
        return this.userData;
    }
}