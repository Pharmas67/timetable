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

    async getCategories(obj: Object): Promise<Array<Object>> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/getAppointmentCategories.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async createAppointment(obj: Object): Promise<String> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/createAppointment.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async getAppointmentsByMonth(obj: Object): Promise<any> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/getAppointments.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
}