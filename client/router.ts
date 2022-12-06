import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from './components/Home/HomePage.vue';
import NeighborhoodsPage from './components/Neighborhood/NeighborhoodsPage.vue';
import NeighborhoodPage from './components/Neighborhood/NeighborhoodPage.vue';
import MapPage from './components/Map/MapPage.vue';
import ProfilePage from './components/Profile/ProfilePage.vue';
import AvailabilityPage from './components/Vibe/AvailabilityPage.vue';
import AccountPage from './components/Account/AccountPage.vue';
import SignupPage from './components/Login/SignupPage.vue';
import LoginPage from './components/Login/LoginPage.vue';
import NotFound from './NotFound.vue';
// import Vibe from './components/Vibe/Vibe.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/neighborhoods', name: 'Neighborhoods', component: NeighborhoodsPage },
    { path: '/neighborhood', name: 'Neighborhood', component: NeighborhoodPage},
    { path: '/map', name: 'Map', component: MapPage },
    { path: '/profile', name: 'Profile', component: ProfilePage },
    { path: '/availability', name: 'Availability', component: AvailabilityPage },
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
            to.name === 'Account' || to.name === 'Neighborhood' || to.name === 'Map' || to.name === 'Profile' || to.name === 'Availability'
        );

        if (toLoggedInPages && !router.app.$store.state.username) {
            next({ name: 'Login' }); // Go to Login page if user navigates to a logged-in-only pages and are not signed in
            return;
        }
    }

    next();
});

export default router;