import {createStore} from "vuex";
import {User} from "@/models/user.entity.js";
import {UserService} from "@/services/user.service.js";

const userService = new UserService();

export const store = createStore({

    state: {
        // recupramos la data de user que se seteo al inicia el loggin en este caso como 'user'
        user: JSON.parse(localStorage.getItem('user')) || User,
        form: {}
    },
    mutations: {
        setUser(state, user) {
            console.log('setUser mutation called with:', user);
            state.user = user;
            // se llama al metodo cuando el usuario se logeo y manda la data al local storage
            // para que la data persista cuando se haga un reload
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('companyId', JSON.stringify(user.companyId));
        },
        removeUser( state ) {
            state.user = User;
            localStorage.removeItem('user');
        },
        updateForm(state, form) {
            console.log(form);
            state.form = form;
        },
        clearForm(state) {
            state.form = {};
        }
    },
    actions: {
        async updateUser({ commit }, user) {
            try {
                const updatedUser = await userService.updateUser(user);
                console.log(updatedUser);
                commit('setUser', updatedUser);
            } catch (error) {
                console.error('Error al actualizar el usuario:', error);
                throw error;
            }
        }
    }
});