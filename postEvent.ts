import {User} from './user'
import axios from "axios";
import Index from './globals' 

export class Admin {
    token: string;

    constructor(token: string) {

        this.token = token;
    }
}



export function initialize(token: string): void {
    Index.admin = new Admin(token);
    Index.userEvents = [];
}

export function sendUser(event:object){
    axios.post('/patient_user', event, {
        baseURL: 'http://159.89.0.171:3000/api',
        headers: { Authorization: "bearer " + Index.admin.token }
    })
}

export function sendEvent(events: User[]) {
    events.map((event)  => {
        axios.post('/event', event, {
            baseURL: 'http://159.89.0.171:3000/api',
            headers: { Authorization: "bearer " + Index.admin.token }
        })
    })
}
