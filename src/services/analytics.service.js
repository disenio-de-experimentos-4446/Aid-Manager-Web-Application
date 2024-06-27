import axios from "axios";
import {environment} from "@/environment/environment.js";

export class AnalyticsService {

    http = null;
    constructor() {
        this.http = axios.create({
            baseURL: environment.baseUrl
        })
    }


    async createNewAnalytics(item) {
        try {
            return await this.http.post(`analytics`, item);
        }catch(e) {
            console.log('Error to create new analytics')
            return null;
        }
    }

    async getAnalyticsByProjectId(projectId) {
        try {
            return await this.http.get(`analytics/${projectId}`);
        }catch(e) {
            console.log('Error to get analytics by project id')
            return null;
        }
    }

    async updatePaymentsChartByAnalyticsId(paymentsData) {
        try {
            return await this.http.patch(`analytics/payments`, paymentsData);
        }catch(e) {
            console.log('Error to update payments chart by analytics id')
            return null;
        }
    }

    async updateLinesChartByAnalyticsId(linesData) {
        try {
            return await this.http.patch(`analytics/lines`, linesData);
        }catch(e) {
            console.log('Error to update sales chart by analytics id')
            return null;
        }
    }

    // for tasks
    async updateTasksChartByAnalyticsId(tasksData) {
        try {
            return await this.http.patch(`analytics/tasks`, tasksData);
        }catch(e) {
            console.log('Error to update tasks chart by analytics id')
            return null;
        }
    }

    // for progressbar
    async updateProgressChartByAnalyticsId(progressData) {
        try {
            return await this.http.patch(`analytics/progressbar`, progressData);
        }catch(e) {
            console.log('Error to update progress chart by analytics id')
            return null;
        }
    }

    // for status
    async updateStatusChartByAnalyticsId(statusData) {
        try {
            return await this.http.patch(`analytics/status`, statusData);
        }catch(e) {
            console.log('Error to update status chart by analytics id')
            return null;
        }
    }

}