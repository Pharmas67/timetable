import { Injectable } from "@angular/core";
import { user } from "../interfaces/user";

@Injectable({
    providedIn: 'root'
})
export class userService {
    constructor() {}

    async setUserData(): Promise<Object | undefined> {
        const data = await fetch('http://localhost/mysql/ajax/register.php');
        console.log(data);
        
        return data;
    }
}