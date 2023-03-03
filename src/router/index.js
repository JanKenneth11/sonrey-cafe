import { createRouter, createWebHistory } from '@ionic/vue-router';
// import HomePage from '../views/HomePage.vue';
import store from '../store';

import LoginPage from '../views/pages/LoginPage.vue';
import RegistrationPage from '../views/pages/RegistrationPage.vue';
import MainPage from '../views/pages/MainPage.vue';
import ProfilePage from '../views/pages/ProfilePage.vue';
import OrderPage from '../views/pages/OrderPage.vue';
import PurchaseHistory from '../views/pages/PurchaseHistory.vue';
import FeedbackPage from '../views/pages/FeedbackPage.vue';
import ReviewPage from '../views/pages/ReviewPage.vue';
import ReceiptPage from '../views/pages/ReceiptPage.vue';

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/register',
        name: 'register',
        component: RegistrationPage,
        meta: {
            requiresAuth: false,
        },
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: MainPage,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfilePage,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/history',
        name: 'history',
        component: PurchaseHistory,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/order',
        name: 'order',
        component: OrderPage,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/review',
        name: 'review',
        component: ReviewPage,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/receipt',
        name: 'receipt',
        component: ReceiptPage,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/feedback',
        name: 'feedback',
        component: FeedbackPage,
        meta: {
            requiresAuth: true,
        },
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async(to, from, next) => {
    localStorage.setItem('from', from.fullPath)
    let user = null

    try {
        user = await store.dispatch('updateUser')
    } catch (error) {
        user = null
    }
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    // console.log(requiresAuth, 'requiresAuth', !user, 'no user')

    if (!requiresAuth && user) {
        console.log('not require auth but there is user')
            // console.log(from.fullPath == '/' || from.fullPath == '' ? '/main' : from)
        next(from.fullPath == '/' || from.fullPath == '' ? '/dashboard' : from)
    } else if (requiresAuth && !user) {
        console.log('require auth there is no user')
        next('/login');
    } else {
        console.log('next')
        next();
    }

})
export default router