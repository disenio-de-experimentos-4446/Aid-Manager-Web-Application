import axios from "axios";

export class CompanyService {

    http = null;
    baseUrl = "http://localhost:3000/";

    constructor() {
        this.http = axios.create({
            baseURL: this.baseUrl
        })
    }

    async getAllCompanies() {
        try {
            const response = await this.http.get('companies');
            return response;
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            throw error;
        }
    }

    async createCompany(companyData) {
        try {
            const response = await this.http.post('companies', companyData);
            return response;
        } catch (error) {
            console.error('Error al crear la compañía:', error);
            throw error;
        }
    }

}