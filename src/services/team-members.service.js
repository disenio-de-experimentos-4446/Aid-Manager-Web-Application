import axios from "axios";
import {environment} from "@/environment/environment.js";

class TeamMembersService {
    baseUrl = ""
    constructor(){
        this.baseUrl = environment.baseUrl;
    }

    async getMembers() {
        let response = null
        try {
            response = await axios.get(`${this.baseUrl}/users`);
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
            response = await axios.put(`${this.baseUrl}/users/kick-member/${idUser}`);
        } catch(e) {
            console.error('Error to kick the member', e);
        }

        return response;
    }
}

export default TeamMembersService;