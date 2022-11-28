import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './components/Home/HomePage.vue';
import NeighborhoodPage from './components/Neighborhood/NeighborhoodPage.vue'
import MapPage from './components/Map/MapPage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import SignupPage from './components/Login/SignupPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import UploadStrollComponent from './components/Stroll/UploadStrollComponent.vue'
import NotFound from './NotFound.vue';

Vue.use(VueRouter);

const routes = [
    {path: '/', name: 'Home', component: HomePage},
    {path: '/neighborhoods', name: 'Neighborhoods', component: NeighborhoodPage},
    { path: '/account', name: 'Account', component: AccountPage },
    { path: '/login', name: 'Login', component: LoginPage },
    { path: '/signup', name: 'Signup', component: SignupPage },
    { path: '/map', name: 'Map', component: MapPage },
    { path: '/stroll', name: 'Stroll', component: UploadStrollComponent },
    { path: '*', name: 'Not Found', component: NotFound }
];

const router = new VueRouter({ routes });

/**
 * Navigation guards to prevent user from accessing wrong pages.
 */
router.beforeEach((to, from, next) => {
    if (router.app.$store) {
        const toAdminPages = (
            to.name === 'Neighborhoods'
        );

        if (toAdminPages && !router.app.$store.state.isAdmin) {
            next({ name: 'Home' }); // Go to Home page if user navigates to an admin-only page and are not either signed in nor an admin
            return;
        }

        if ((to.name === 'Login' || to.name === 'Signup') && router.app.$store.state.username) {
            next({ name: 'Account' }); // Go to Account page if user navigates to Login or Signup and are signed in
            return;
        }

        const toLoggedInPages = (
            to.name === 'Account'
        );

        if (toLoggedInPages && !router.app.$store.state.username) {
            next({ name: 'Login' }); // Go to Login page if user navigates to a logged-in-only pages and are not signed in
            return;
        }
    }

    next();
});

export default router;