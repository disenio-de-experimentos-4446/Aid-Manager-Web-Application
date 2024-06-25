import axios from "axios";
import {environment} from "@/environment/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl
});

export class AnalyticsService {

    async getAnalytic() {
        return await http.get('/analytics');
    }

    async postAnalytics(analyticsData) {
        return await http.post('/analytics', {
            title: analyticsData.title,
            description: analyticsData.description,
            cost: analyticsData.cost,
            progress: analyticsData.progress,
            current: analyticsData.current,
            expected: analyticsData.expected
        });
    }

    async updateAnalytics(analyticsId, analyticsData) {
        return await http.put(`/analytics/${analyticsId}`, {
            title: analyticsData.title,
            description: analyticsData.description,
            cost: analyticsData.cost,
            progress: analyticsData.progress,
            current: analyticsData.current,
            expected: analyticsData.expected
        });
    }
}