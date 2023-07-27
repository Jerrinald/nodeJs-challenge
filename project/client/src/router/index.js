import { createRouter, createWebHistory } from 'vue-router';
import { ref } from 'vue';
import jwtDecode from 'jwt-decode';
import Home from '../views/front/Home.vue';
import Contact from '../views/front/Contact.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import Dashboard from '../views/front/Dashboard.vue';
import Payment from '../views/payment/Payment.vue';
import PaymentConfirm from '../views/payment/ConfirmPayment.vue';
import Stripetify from '../views/Stripetify/StripetifyHome.vue';

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
    },
    {
        path: '/contact',
        name: 'Contact',
        component: Contact,
        meta: { requiresAuth: false },
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true },
    },
    ,
    {
        path: '/stripetify',
        name: 'Stripetify',
        component: Stripetify,
        meta: { requiresAuth: false },
    },
    {
        path: '/payment',
        name: 'Payment',
        component: Payment,
        meta: { requiresAuth: false },
    },
    {
        path: '/payment-confirm',
        name: 'PaymentConfirm',
        component: PaymentConfirm,
        meta: { requiresAuth: false },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const user = ref(token ? jwtDecode(token) : null);

    const isLogged = !!user.value;
    const isAdmin = user.value?.id_role === 1;

    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isLogged && to.name !== 'Login' && to.name !== 'Register' && to.name !== 'ForgotPassword' && to.name !== 'ResetPassword' && to.name !== 'Verify') {
            next({ name: 'Login' });
        } else {
            if (to.matched.some(record => record.meta.requiresAdmin)) {
                if (!isAdmin) {
                    next({ name: 'Home' });
                } else {
                    next();
                }
            } else {
                next();
            }
        }
    } else {
        if (isLogged && (to.name === 'Login' || to.name === 'Register' || to.name === 'ForgotPassword' || to.name === 'ResetPassword' || to.name === 'Verify')) {
            next({ name: 'Home' });
        } else {
            next();
        }
    }
});

export default router;