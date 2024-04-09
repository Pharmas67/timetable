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

    async createUser(obj: Object): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/register.php',obj);
            return response.data;
        } catch (e) {
            console.log(e);
            throw e;
        }
    }
}