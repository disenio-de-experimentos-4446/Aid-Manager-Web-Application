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

    async newMessage(id_user, message) {
        let response = null
        try {
            response = await axios.post(`${this.baseUrl}/messages`, message);
        }catch(e) {
            console.error('Error to send the message', e);
        }
        return response;
    }

    async kickMember(idUser) {
        let response = null;
        try {
            response = await axios.delete(`${this.baseUrl}/team-members/${idUser}`);
        } catch(e) {
            console.error('Error to kick the member', e);
        }

        return response;
    }
}

export default TeamMembersService;