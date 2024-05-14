import {createStore} from "vuex";
import {User} from "@/models/user.entity.js";

export const store = createStore({
    state: {
        // recupramos la data de user que se seteo al inicia el loggin en este caso como 'user'
        user: JSON.parse(localStorage.getItem('user')) || User
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            // se llama al metodo cuando el usuario se logeo y manda la data al local storage
            // para que la data persista cuando se haga un reload
            localStorage.setItem('user', JSON.stringify(user));
        },
        removeUser( state ) {
            state.user = User;
            localStorage.removeItem('user');
        }
    }
});