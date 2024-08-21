import { Injectable } from "@angular/core";
import axios from "axios";
import { Friendship } from "../interfaces/interfaces";

@Injectable({
    providedIn: 'root'
})
export class friendService {
    constructor(){}

    async fetchFriendList(userObj: Object): Promise<Array<Friendship>> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/friendlist/friendlist.php',userObj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async fetchFriendReqs(userObj: Object): Promise<Array<Friendship>> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/friendlist/friendReq.php',userObj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async acceptFriend(obj: Object): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/friendlist/acceptFriend.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async addFriend(obj: Object): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/friendlist/addFriend.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async removeFriend(obj: Object): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/friendlist/removeFriend.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async blockUser(obj: Object): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/friendlist/removeFriend.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }

    async unBlockUser(obj: Object): Promise<string> {
        try {
            const response = await axios.post('http://localhost/mysql/ajax/friendlist/removeFriend.php',obj);
            return response.data;
        } catch(e) {
            console.log(e);
            throw e;
        }
    }
}