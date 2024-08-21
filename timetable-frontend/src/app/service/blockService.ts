import { Injectable } from "@angular/core";
import axios from "axios";
import { BlockedRelationship } from "../interfaces/interfaces";

@Injectable({
    providedIn: 'root'
})
export class blockService {
    constructor(){}

    async blockUser(obj: Object): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/blocklist/blockUser.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async unBlockUser(obj: Object): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/blocklist/unBlockUser.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async fetchBlocklist(obj:Object): Promise<Array<BlockedRelationship>> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/blocklist/fetchBlocklist.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
}