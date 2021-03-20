import {User} from './user'
import axios from "axios";
import { admin } from './track'





export function sendUser(event:object){
    axios.post('/patient_user', event, {
        baseURL: 'https://api.tsu-examples.sabir.pro/api',
        headers: { Authorization: "bearer " + admin.token }
    })
}

export function sendEvent(events: User[]) {
    events.map((event)  => {
        axios.post('/event', event, {
            baseURL: 'https://api.tsu-examples.sabir.pro/api',
            headers: { Authorization: "bearer " + admin.token }
        })
    })
}
