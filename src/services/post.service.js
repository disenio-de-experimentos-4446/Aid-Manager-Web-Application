import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:3000'
})

export class PostApiService {

    getLastPosts(limit = 5) {
        return http.get('posts', {
            params: {
                _limit: limit
            }
        })
    }

}