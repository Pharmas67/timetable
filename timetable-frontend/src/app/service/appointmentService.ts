import { Injectable } from "@angular/core";
import axios from "axios";

@Injectable({
    providedIn: 'root'
})
export class appointmentSerive {
    constructor() { }

    async addCategory(obj: Object): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/addAppointmentCategory.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async getCategories(obj: Object): Promise<Object> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/addAppointmentCategory.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
}