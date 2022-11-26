import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

/**
 * Storage for data that needs to be accessed from various components.
 */
const store = new Vuex.Store({
  state: {
    username: null, // Username of the logged in user
    dateJoined: null, // Date joined of the logged in user
    isAdmin: null, // Whether or not logged in user is admin account
    neighborhoods: [{}, {}],
    alerts: {} // global success/error messages encountered during submissions to non-visible forms
  },
  mutations: {
    alert(state, payload) {
      /**
       * Add a new message to the global alerts.
       */
      Vue.set(state.alerts, payload.message, payload.status);
      setTimeout(() => {
        Vue.delete(state.alerts, payload.message);
      }, 3000);
    },
    setUsername(state, username) {
      /**
       * Update the stored username to the specified one.
       * @param username - new username to set
       */
      state.username = username;
    },
    setDateJoined(state, date) {
      /**
       * Update the stored date joined to the specified one.
       * @param date - new date to set
       */
      state.dateJoined = date;
    },
    setIsAdmin(state, isAdmin) {
      /**
       * Update the stored isAdmin to the specified one.
       * @param isAdmin - new isAdmin to set
       */
      state.isAdmin = isAdmin;
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
