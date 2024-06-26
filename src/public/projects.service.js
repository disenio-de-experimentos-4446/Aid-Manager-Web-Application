import axios from "axios";

class ProjectsService {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    async getProjects() {
        let response = null;
        try {
            response = await axios.get(`${this.baseUrl}/projects`);
        }catch(e) {
            console.error(e);
        }

        return response
    }

    async fetchProjects(companyId) {
        try {
            const response = await axios.get(`http://localhost:5082/api/v1/projects/${companyId}`);

            console.log("Datos obtenidos de la API:", response.data);
            return response.data; // Devuelve la lista de proyectos obtenidos de la API
        } catch (error) {
            console.error("Error al obtener datos de la API:", error);
            throw error; // Lanza una excepción si ocurre algún problema al obtener datos de la API
        }
    }


}

export default ProjectsService