// store/index.js
import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            user: null, // Utilisateur connecté ou null s'il n'est pas connecté
            message: '', // Message du serveur pour afficher dans AccountActivated.vue
        };
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setMessage(state, message) {
            state.message = message;
        },
    },
    actions: {
        // Vous pouvez ajouter des actions ici pour effectuer des appels API et mettre à jour le store en conséquence.
    },
    getters: {
        // Vous pouvez ajouter des getters ici pour récupérer des données du store et les utiliser dans les composants.
    },
});

export default store;
