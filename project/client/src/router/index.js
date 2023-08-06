import { createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue';
import jwtDecode from 'jwt-decode';
import Home from '../views/front/Home.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import Stripetify from '../views/Stripetify/StripetifyHome.vue';
import Dashboard from '../views/front/Dashboard.vue';
import Profile from '../views/front/Profile.vue';
import store from '../store';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false },
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { requiresAuth: false },
    }
    ,
    {
        path: '/',
        name: 'Stripetify'  ,
        component: Stripetify,
        meta: { requiresAuth: false },
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: false, requiresAdmin: false },
    },
    {
        path: '/dashboard/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true, requiresAdmin: false },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    console.log(store.state.user);
    // Vérifier si la route nécessite une authentification
    if (to.meta.requiresAuth) {
        // Vérifier si l'utilisateur est connecté

        if (to.meta.requiresAdmin) {
            const isAdmin = store.state.user?.role === 'admin';
            if (!isAdmin) {
                next({ name: 'Stripetify' });
            }else {
                next();
            }
        }else{
            if (!store.state.user) {
                // L'utilisateur n'est pas connecté, rediriger vers la page de connexion
                next('/login');
            } else {
                
                // L'utilisateur est connecté, autoriser la navigation
                next();
            }
        }
    } else {
        // Vérifier si l'utilisateur est déjà connecté et accède aux pages de login ou d'inscription
        if (store.state.user && (to.name === 'Login' || to.name === 'Register')) {
            // Rediriger vers la page d'accueil ou toute autre page appropriée pour les utilisateurs connectés
            next('/');
        } else {
            // Autoriser la navigation pour les routes publiques
            next();
        }
    }
});

export default router;