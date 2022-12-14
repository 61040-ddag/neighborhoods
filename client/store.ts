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
    neighborhoodFilter: null, // Neighborhood, city, and/or state to filter shown neighborhoods
    neighborhoods: [], // All neighborhoods created in app
    neighborhood: null, // The neighborhood being viewed
    residentNeighborhood: null, // The resident neighborhood being viewed
    reviews: [], // All reviews for the neighborhood being viewed
    strolls: [], // All the strolls
    certifiedResidences: [], // All the neighborhoods that the logged in user is a resident
    availabilities: [], // All availabilities of residents for the neighborhood being viewed
    upcomingMeetings: [], // All upcoming meetings for various vibe checks
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
    },
    setNeighborhood(state, neighborhood) {
      /**
       * Update the stored neighborhood to the specified one
       * @param neighborhood - new neighborhood to set
       */
      state.neighborhood = neighborhood;
    },
    setResidentNeighborhood(state, residentNeighborhood) {
      /**
       * Update the stored residentNeighborhood to the specified one
       * @param residentNeighborhood - new residentNeighborhood to set
       */
      state.residentNeighborhood = residentNeighborhood;
    },
    updateNeighborhoodFilter(state, neighborhoodFilter) {
      /**
       * Update the stored neighborhoods filter to the specified one.
       * @param neighborhoodFilter - Neighborhood, city, and/or state to fitler neighborhoods by
       */
      state.neighborhoodFilter = neighborhoodFilter;
    },
    updateNeighborhoods(state, neighborhoods) {
      /**
       * Update the stored neighborhoods to the provided neighborhoods.
       * @param neighborhood - Neighborhoods to store
       */
      state.neighborhoods = neighborhoods;
    },
    sortNeighborhoods(state, compare) {
      state.neighborhoods.sort(compare);
    },
    updateReviews(state, reviews) {
      /**
       * Update the stored reviews to the provided reviews.
       * @param reviews - Reviews to store
       */
      state.reviews = reviews;
    },
    async refreshReviews(state) {
      /**
       * Request the server for the currently available reviews.
       */
      const formatBackend = (word) => {
        return word.trim().replace(/ {2,}/g, ' ').split(' ').join('_').toLowerCase();
      };
      const name = formatBackend(state.neighborhood.name);
      const city = formatBackend(state.neighborhood.city);
      const neighborhoodState = formatBackend(state.neighborhood.state);

      const url = `/api/reviews/neighborhoods?name=${name}&city=${city}&state=${neighborhoodState}`;
      const res = await fetch(url).then(async r => r.json());
      state.reviews = res;
    },
    async refreshStrolls(state) {
      /**
       * Request the server for the currently available strolls.
       */
      const formatBackend = (word) => {
        return word.trim().replace(/ {2,}/g, ' ').split(' ').join('_').toLowerCase();
      };
      const name = formatBackend(state.neighborhood.name);
      const city = formatBackend(state.neighborhood.city);
      const neighborhoodState = formatBackend(state.neighborhood.state);

      const url = `/api/strolls/neighborhoods?name=${name}&city=${city}&state=${neighborhoodState}`;
      const res = await fetch(url).then(async r => r.json());
      state.strolls = res.strolls;
    },
    async refreshCertifiedResidency(state) {
      /**
       * Request the server for the currently available certifiedResidency.
       */

      const url = `/api/certifiedResidency/users?user=${state.username}`;
      const res = await fetch(url).then(async r => r.json());
      state.certifiedResidences = res;
    },
    async refreshAvailabilities(state) {
      /**
       * Request the server for the currently available availabilities of the current neighborhood
       */
      const url = `/api/vibeCheck/availability?neighborhoodId=${state.neighborhood._id}`;
      const res = await fetch(url).then(async r => r.json());
      const upcomingMeetings = new Set(state.upcomingMeetings.map(vibeCheck => vibeCheck.availability._id));
      state.availabilities = res.availabilities
        .filter(availability => availability.username !== state.username)
        .filter(availability => !upcomingMeetings.has(availability._id));
    },
    async refreshUpcomingMeetings(state) {
      /**
       * Request the server for the currently available the scheduled vibeChecks of the logged in user
       */
      const url = `/api/vibeCheck`;
      const res = await fetch(url).then(async r => r.json());
      state.upcomingMeetings = res.vibeChecks;
    }
  },
  // Store data across page refreshes, only discard on browser close
  plugins: [createPersistedState()]
});

export default store;
