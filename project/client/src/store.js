// store.js
import { createStore } from 'vuex';

const store = createStore({
    state: {
        isAuthenticated: false, // État de connexion initial (non connecté par défaut)
        // Vous pouvez également stocker d'autres informations d'utilisateur ici, comme les informations de l'utilisateur connecté.
        // Par exemple, currentUser: null,
    },
    mutations: {
        login(state) {
            state.isAuthenticated = true; // Mettre l'état de connexion à true lorsque l'utilisateur se connecte avec succès
        },
        logout(state) {
            state.isAuthenticated = false; // Mettre l'état de connexion à false lorsque l'utilisateur se déconnecte
        },
    },
    actions: {
        // Vous pouvez définir des actions ici pour effectuer des opérations d'authentification, comme la connexion ou la déconnexion
    },
});

export default store;
