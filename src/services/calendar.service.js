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
}

export default CalendarService