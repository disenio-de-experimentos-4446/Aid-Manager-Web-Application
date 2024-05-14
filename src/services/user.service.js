import axios from "axios";

export class UserService {

    http = null;
    baseUrl = "http://localhost:3000/";

    constructor() {
        this.http = axios.create({
            baseURL: this.baseUrl
        })
    }

    async getAllUsers() {
        try {
            const response = await this.http.get('users');
            return response;
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            throw error;
        }
    }

    async getUserById( id ) {
        try {
            const response = await this.http.get(`users/${id}`);
            return response;
        } catch (error) {
            console.error(`Error al obtener el usuario con id ${id}:`, error);
            throw error;
        }
    }

    // obtener usuarios registrados por role de Team o Director
    async getUsersByRole( role ) {
        try {
            const response = await this.http.get(`users/?role=${role}`);
            return response;
        } catch (error) {
            console.error(`Error al obtener usuarios con el rol ${role}:`, error);
            throw error;
        }
    }

    async createNewUser( user ) {
        try {
            const response = await this.http.post('users', user);
            return response;
        } catch (error) {
            console.error('Error al crear un nuevo usuario:', error);
            throw error;
        }
    }

}