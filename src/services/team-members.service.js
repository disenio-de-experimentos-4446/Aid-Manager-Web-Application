import axios from "axios";

class TeamMembersService {
    baseUrl = ""
    constructor(){
        this.baseUrl = "http://localhost:3000"
    }

    async getMembers() {
        let response = null
        try {
            response = await axios.get(`${this.baseUrl}/team-members`);

        }catch(e) {
            console.error('Error to obtain the team members', e);
        }
        return response;
    }
}

export default TeamMembersService;