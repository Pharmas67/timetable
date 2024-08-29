import { Injectable } from "@angular/core";
import axios from "axios";
import { Appointment } from "../interfaces/interfaces";

@Injectable({
    providedIn: 'root'
})
export class appointmentService {
    constructor() { }

    async addCategory(obj: Object): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/appointments/addAppointmentCategory.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async getCategories(obj: Object): Promise<Array<Object>> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/appointments/getAppointmentCategories.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async createAppointment(obj: Object): Promise<String> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/appointments/createAppointment.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async getAppointmentsByMonth(obj: Object): Promise<any> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/appointments/getAppointmentsbyMonth.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async getAppointments(obj: Object): Promise<Array<Appointment>> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/appointments/getAppointments.php',obj);
            return response.data;
        } catch(error){
            console.log(error);
            throw error;
        }
    }
}