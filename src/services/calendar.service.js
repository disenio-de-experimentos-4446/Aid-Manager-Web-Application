import axios from "axios";
import {environment} from "@/environment/environment.js";

class CalendarService {
    baseUrl = ""
    constructor() {
        this.baseUrl = environment.baseUrl;
    }

    async getEventsCalendar(projectId) {
        let response = null;

        try {
            response = await axios.get(`${this.baseUrl}/events/${projectId}`);
        }catch(e) {
            console.error('Error to obtain the events calendar', e)
        }

        return response;
    }

    async saveNewEvent(event) {
        let response = null;

        try {
            console.log('event save:', event)
            response = await axios.post(`${this.baseUrl}/events`, event);
        }catch(e){
            console.error('Error to save the event', e)
        }
        return response;
    }

    async deleteEvent(id) {
        let response = null;

        try {
            response = await axios.delete(`${this.baseUrl}/events/${id}`);
        }catch(e) {
            console.error('Error to delete the event', id, e);
        }

        return response;
    }

    async editEvent(id, eventModified) {
        let response = null;

        try {
            response = await axios.put(`${this.baseUrl}/events/${id}`,  eventModified);
        }catch(e) {
            console.error('Error to edit the event', id, e);
        }

        return response;
    }
}

export default CalendarService