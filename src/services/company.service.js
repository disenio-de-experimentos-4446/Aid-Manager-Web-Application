import axios from "axios";
import {environment} from "@/environment/environment.js";

export class CompanyService {
    constructor() {
        this.http = axios.create({
            baseURL: environment.baseUrl
        })
    }

    async getAllCompanies() {
        try {
            return await this.http.get('companies');
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            throw error;
        }
    }

    async createCompany(companyData) {
        try {
            return await this.http.post('company', companyData);
        } catch (error) {
            console.error('Error al crear la compañía:', error);
            throw error;
        }
    }

    async getCompanyByUID( uid ) {
        try {
            return await this.http.get(`company/${uid}`);
        } catch (error) {
            console.error(`Error al obtener la compañía con id ${uid}:`, error);
            throw error;
        }
    }

    async editCompanyId( idUser, companyId) {
        try {
            return await this.http.put(`users/${idUser}?companyId=${companyId}`);
        } catch (error) {
            console.error(`Error al editar el id de la compañía del usuario ${idUser}:`, error);
            throw error;
        }
    }

}