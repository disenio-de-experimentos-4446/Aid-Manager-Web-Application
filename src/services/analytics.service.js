import axios from "axios";
import {environment} from "@/environment/environment.js";

const http = axios.create({
    baseURL: environment.baseUrl
});

export class AnalyticsService {

    async getAnalytic(projectId) {
        console.log('projectId', projectId);
        try{
            return await http.get(`/analytics/${projectId}`);
        }catch (error){
            console.error('Error al obtener los datos de la API:', error);
            throw error;
        }
    }

    async postAnalytics(projectId,analyticsData) {
        try {
            return await http.post(`/analytics/${projectId}`,analyticsData);
        }catch (error){
            console.error('Error al postear los datos de la API:', error);
            throw error;
        }
    }
    async updateAnalytics(projectId,analyticsId, analyticsData) {
        try {
            return await http.put(`/analytics/${projectId}/${analyticsId}`, analyticsData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }catch (error){
            console.error('Error al postear los datos de la API:', error);
            throw error;
        }
    }
}