import axios from "axios";
const http = axios.create({
    baseURL: 'http://localhost:3000/analytics',
});

export class AnalyticsService {

    async getAnalytic() {
        return await http.get();
    }
}