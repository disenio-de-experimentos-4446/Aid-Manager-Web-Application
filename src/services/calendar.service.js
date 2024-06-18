import axios from "axios";

class CalendarService {
    baseUrl = ""
    constructor() {
        this.baseUrl = "http://localhost:3000"
    }

    async getEventsCalendar() {
        let response = null;

        try {
            response = await axios.get(`${this.baseUrl}/events`)
        }catch(e) {
            console.error('Error to obtain the events calendar', e)
        }

        return response;
    }

    async saveNewEvent(event) {
        let response = null;

        try {
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