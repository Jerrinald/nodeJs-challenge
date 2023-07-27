import { createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue';
import jwtDecode from 'jwt-decode';
import Home from '../views/front/Home.vue';
import Contact from '../views/front/Contact.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import Logout from '../views/auth/Logout.vue';
import Products from '../views/front/Products.vue';
import Profile from '../views/front/Profile.vue';
import Panel from '../views/front/Panel.vue';
import Dashboard from '../views/front/Dashboard.vue';
import ProductsManagement from '../views/front/ProductsManagement.vue';
import CommandesManagement from '../views/front/CommandesManagement.vue';
import store from '../store';

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false },
    },
    {
        path: '/logout', // Ajoutez le chemin pour la vue de déconnexion
        name: 'Logout',
        component: Logout, // Assurez-vous d'avoir créé la vue "Logout.vue" correspondante
        meta: { requiresAuth: true },
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: { requiresAuth: false },
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact,
        meta: { requiresAuth: false },
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true, requiresAdmin: true  },
    },
    {
        path: '/products_management',
        name: 'ProductsManagement',
        component: ProductsManagement,
        meta: { requiresAuth: false, requiresAdmin: true },
    },
    {
        path: '/commandes-management',
        name: 'CommandesManagement',
        component: CommandesManagement,
        meta: { requiresAuth: false, requiresAdmin: true },
    },
    {
        path: '/products',
        name: 'Products',
        component: Products,
        meta: { requiresAuth: false },
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true },
    },
    {

        path: '/panier',
        name: 'Panel',
        component: Panel,
        meta: { requiresAuth: false },
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: false },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {

    // Vérifier si la route nécessite une authentification
    if (to.meta.requiresAuth) {
        // Vérifier si l'utilisateur est connecté

        if (to.meta.requiresAdmin) {
            const isAdmin = store.state.user?.role === 'admin';
            if (!isAdmin) {
                next({ name: 'Home' });
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