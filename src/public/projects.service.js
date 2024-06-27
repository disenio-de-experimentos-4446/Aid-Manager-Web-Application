import axios from "axios";
import {environment} from "@/environment/environment.js";

class ProjectsService {
    constructor() {
        this.baseUrl = environment.baseUrl;
    }

    async getProjects(companyId) {
        let response = null;
        try {
            response = await axios.get(`${this.baseUrl}/projects/${companyId}`);
        }catch(e) {
            console.error(e);
        }

        return response
    }
}

export default ProjectsService