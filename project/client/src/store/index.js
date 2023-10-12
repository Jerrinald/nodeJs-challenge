// store/index.js
import { createStore } from 'vuex';
import jwtDecode from 'jwt-decode';


const store = createStore({
    state() {
        return {
            user: JSON.parse(localStorage.getItem('user')) || null,
        };
    },
    mutations: {
        SET_USER(state, user) {
            console.log('User data received in SET_USER mutation:', user);
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        CLEAR_USER(state) {
            state.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
        },
    },
    actions: {
        login({ commit }, user) {
            // Appeler le backend pour se connecter
            // Ici, vous pouvez gérer la logique de connexion et récupérer les données de l'utilisateur depuis le backend
            // Une fois la connexion réussie, vous pouvez appeler la mutation SET_USER pour stocker les données de l'utilisateur dans le store
            commit('SET_USER', user);
        },
        logout({ commit }) {
            // Ici, vous pouvez effectuer des opérations de déconnexion, telles que invalider le token JWT côté serveur si vous l'utilisez
            // Ensuite, appelez la mutation CLEAR_USER pour effacer les données de l'utilisateur du store
            commit('CLEAR_USER');
        },
        checkTokenExpiration() {
            const token = localStorage.getItem('token');
            const tokenExpiration = localStorage.getItem('tokenExpiration');
            if (token) {
                const decodedToken = jwtDecode(token);
                const expirationDate = new Date(tokenExpiration);
                const currentDate = new Date();
                if (currentDate >= expirationDate) {
                    // Le token a expiré, déconnecter automatiquement l'utilisateur
                    store.dispatch('logout');
                    router.push('/login'); // Rediriger vers la page de connexion
                }
            }
        },
    },
});

export default store;
