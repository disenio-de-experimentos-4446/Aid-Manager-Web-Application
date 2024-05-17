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
}

export default ProjectsService