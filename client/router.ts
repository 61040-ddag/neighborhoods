import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './components/Home/HomePage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import SignupPage from './components/Login/SignupPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import NotFound from './NotFound.vue';

Vue.use(VueRouter);

const routes = [
    {path: '/', name: 'Home', component: HomePage},
    { path: '/account', name: 'Account', component: AccountPage },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/signup', name: 'Signup', component: SignupPage },
    { path: '*', name: 'Not Found', component: NotFound }
];

const router = new VueRouter({ routes });

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
    if (router.app.$store) {
        if ((to.name === 'Login' || to.name === 'Signup') && router.app.$store.state.username) {
            next({ name: 'Account' }); // Go to Account page if user navigates to Login and are signed in
            return;
        }

        const toLoggedInPages = (
            to.name === 'Account'
        );

        if (toLoggedInPages && !router.app.$store.state.username) {
            next({ name: 'Login' }); // Go to Login page if user navigates to one of logged in pages and are not signed in
            return;
        }
    }

    next();
});

export default router;