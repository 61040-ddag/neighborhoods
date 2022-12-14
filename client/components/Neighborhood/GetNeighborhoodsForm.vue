<!-- Form for finding neighborhoods (inline style) -->
<template>
  <div class="contain">
    <form @submit.prevent="submit">
      <ul class="ul-list">
        <li class="list">
        <input 
          class="input-css"
          v-model="neighborhood" 
          type="text" 
          :placeholder="neighborhoodPlaceholder"
        >
        </li>
        <li class="list">
        <input 
          class="input-css"
          v-model="city" 
          type="text" 
          :placeholder="cityPlaceholder"
        >
        </li>
        <li class="list">
        <div class="form-group">
          <div class="col-sm-10">
            <select class="form-control" id="state" name="state" v-model="state">
              <option value="">Search for state</option>
              <option v-for="state in filteredStates" :value="state.id">{{state.name}}</option>
            </select>
          </div>
        </div>
        </li>
        <li class="list">
          <button 
            class="input-css button-css"
            type="submit"
          >
            {{ button }}
          </button>
        </li>
      </ul>
      <section class="alerts">
        <article 
          v-for="(status, alert, index) in alerts" 
          :key="index" 
          :class="status"
        >
          <p>{{ alert }}</p>
        </article>
      </section>
    </form>
    <section v-if="isSearching">
      <section v-if="isSearchingNeighborhoods">
        <section v-if="filteredSearch.length">
          <SearchNeighborhoodComponent 
            v-for="neighborhood in filteredSearch"
            :key="neighborhood._id"
            :neighborhood="neighborhood"
          />
        </section>
        <article 
          v-else
        >
          <h3 class="styled-h3">Searched neighborhoods does not exist yet. Please check again later!</h3>
        </article>
      </section>
      <section v-else-if="isSearchingLocation">
        <section v-if="filteredSearch.length">
          <SearchLocationComponent 
            v-for="location in filteredSearch"
            :key="location._id"
            :location="location"
          />
        </section>
        <article 
          v-else
        >
          <h3 class="styled-h3">Searched locations does not exist yet. Please check again later!</h3>
        </article>
      </section>
    </section>
  </div>
</template>


<script>
import SearchNeighborhoodComponent from '@/components/Search/SearchNeighborhoodComponent.vue';
import SearchLocationComponent from '@/components/Search/SearchLocationComponent.vue';

export default {
  name: 'GetNeighborhoodsForm',
  components: {
    SearchNeighborhoodComponent,
    SearchLocationComponent
  },
  props: {
    neighborhoodPlaceholder: {
      type: String,
      default: ''
    },
    cityPlaceholder: {
      type: String,
      default: '',
    },
    button: {
      type: String,
      default: 'Submit'
    }
  },
  data() {
    return {
      neighborhoods: [],
      locations: [],
      neighborhood: '',
      city: '',
      state: '',
      alerts: {}
    };
  },
  computed: {
    isSearching() {
      return this.neighborhood || this.city || this.state;
    },
    isSearchingNeighborhoods() {
      return this.neighborhood;
    },
    isSearchingLocation() {
      return this.city || this.state;
    },
    filteredStates() {
      const states = [
        {id: "AL", name: "Alabama"}, 
        {id: "AK", name: "Alaska"}, 
        {id: "AZ", name: "Arizona"}, 
        {id: "AR", name: "Arkansas"}, 
        {id: "CA", name: "California"}, 
        {id: "CO", name: "Colorado"}, 
        {id: "CT", name: "Connecticut"}, 
        {id: "DE", name: "Delaware"}, 
        {id: "FL", name: "Florida"}, 
        {id: "GA", name: "Georgia"}, 
        {id: "HI", name: "Hawaii"}, 
        {id: "ID", name: "Idaho"}, 
        {id: "IL", name: "Illinois"}, 
        {id: "IN", name: "Indiana"}, 
        {id: "IA", name: "Iowa"}, 
        {id: "KS", name: "Kansas"}, 
        {id: "KY", name: "Kentucky"}, 
        {id: "LA", name: "Louisiana"}, 
        {id: "ME", name: "Maine"}, 
        {id: "MD", name: "Maryland"}, 
        {id: "MA", name: "Massachusetts"}, 
        {id: "MI", name: "Michigan"}, 
        {id: "MN", name: "Minnesota"}, 
        {id: "MS", name: "Mississippi"}, 
        {id: "MO", name: "Missouri"}, 
        {id: "MT", name: "Montana"}, 
        {id: "NE", name: "Nebraska"}, 
        {id: "NV", name: "Nevada"}, 
        {id: "NH", name: "New Hampshire"}, 
        {id: "NJ", name: "New Jersey"}, 
        {id: "NM", name: "New Mexico"}, 
        {id: "NY", name: "New York"}, 
        {id: "NC", name: "North Carolina"}, 
        {id: "ND", name: "North Dakota"}, 
        {id: "OH", name: "Ohio"}, 
        {id: "OK", name: "Oklahoma"}, 
        {id: "OR", name: "Oregon"}, 
        {id: "PA", name: "Pennsylvania"}, 
        {id: "RI", name: "Rhode Island"}, 
        {id: "SC", name: "South Carolina"}, 
        {id: "SD", name: "South Dakota"}, 
        {id: "TN", name: "Tennessee"}, 
        {id: "TX", name: "Texas"}, 
        {id: "UT", name: "Utah"}, 
        {id: "VT", name: "Vermont"}, 
        {id: "VA", name: "Virginia"}, 
        {id: "WA", name: "Washington"}, 
        {id: "WV", name: "West Virginia"}, 
        {id: "WI", name: "Wisconsin"}, 
        {id: "WY", name: "Wyoming"}
      ];
      const existingStates = this.locations.map(location => location.state);
      return states.filter(state => {
        return existingStates.includes(state.id);
      });
    },
    filteredSearch() {
      const formatCompare = (word) => {
        return word.trim().replace(' ', '_').toLowerCase();
      };

      const formatFrontend = (word) => {
        return word.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      };

      const searchNeighborhood = formatCompare(this.neighborhood);
      const searchCity = formatCompare(this.city);
      const searchState = formatCompare(this.state);

      if (this.neighborhood) {
        return this.neighborhoods
          .map(neighborhood => {
            return {
              ...neighborhood,
              name: formatCompare(neighborhood.name),
              city: formatCompare(neighborhood.city),
              state: formatCompare(neighborhood.state)
            };
          })
          .filter(neighborhood => {
            const includesName = neighborhood.name.includes(searchNeighborhood);
            const includesCity = neighborhood.city.includes(searchCity);
            const includesState = neighborhood.state.includes(searchState);
            return includesName && includesCity && includesState; 
          })
          .map(neighborhood => {
            return {
              ...neighborhood,
              name: formatFrontend(neighborhood.name),
              city: formatFrontend(neighborhood.city),
              state: neighborhood.state.toUpperCase()
            };
          });
      } else if (this.city || this.state) {
        return this.locations
          .map(location => {
            return {
              city: formatCompare(location.city),
              state: formatCompare(location.state)
            };
          })
          .filter(location => {
            const includesCity = location.city.includes(searchCity);
            const includesState = location.state.includes(searchState);
            return includesCity && includesState;
          })
          .map(location => {
            return {
              city: formatFrontend(location.city),
              state: location.state.toUpperCase()
            };
          });
      } else {
        return [];
      }
    }
  },
  async mounted() {
    this.loadNeighborhoods()
  },
  methods: {
    async loadNeighborhoods() {
      try {
        const r = await fetch(`/api/neighborhoods`);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        this.neighborhoods = res.neighborhoods;
        // Find all unique city, state pairs
        this.locations = [...new Set(this.neighborhoods
          .map(neighborhood => {
            return JSON.stringify({
              city: neighborhood.city,
              state: neighborhood.state
            });
          }))]
          .map(JSON.parse);
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
    async submit() {
      try {
        if (!this.state) {
          throw new Error('State of desired location is required.')
        }

        if (!this.city) {
          throw new Error('City of desired location is required.');
        }

        const formatBackend = (word) => {
          return word.trim().replace(' ', '_').toLowerCase();
        };

        let neighborhood = formatBackend(this.neighborhood);
        let city = formatBackend(this.city);
        let state = formatBackend(this.state);

        const neighborhoodURL = `/api/neighborhoods?name=${neighborhood}&city=${city}&state=${state}`;
        const locationURL = `/api/neighborhoods/location?city=${city}&state=${state}`;
        const url = this.neighborhood ? neighborhoodURL : locationURL;

        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }

        const formatFrontend = (word) => {
          return word.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        };

        neighborhood = formatFrontend(neighborhood);
        city = formatFrontend(city);
        state = state.toUpperCase();

        const neighborhoods = this.neighborhood ? [res.neighborhood] : res.neighborhoods;

        if (neighborhoods.length !== 0) {
          this.$store.commit('updateNeighborhoods', neighborhoods);

          const neighborhoodFilter = neighborhood ? { name: neighborhood, city: city, state: state } : { city: city, state: state };
          this.$store.commit('updateNeighborhoodFilter', neighborhoodFilter);

          this.$router.push({ name: 'Map' });

          this.$store.commit('alert', {
            message: res.message, status: 'success'
          });
        } else {
          throw new Error('Neighborhood/Location does not exist yet. Please check again later!')
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  position: relative;
}

input {
  padding: 0 5px;
  min-width: fit-content;
  padding: 0px 10px;
  border-radius: 14px;
  border: none;
  border: solid 1px lightgray;
  font-size: medium;
  font-family: inherit;
}

button {
  background-color: white;
  color: black;
  position: relative;
  border: solid 1px lightgray;
  border-radius: 14px;
  margin-left: 0.5em;
  margin-right: 0.5em;
  font-family: inherit;
  font-size: medium;
  font-weight: bold;
  height: 2em;
}

button:hover {
  background-color: lightgray;
  color: black;
}

.contain {
  text-align: center;
  align-items: center;
}

.list {
  margin: auto;
  list-style-type: none;
  align-items: center;
  text-align: center;
  padding-top: 5px;
  padding-bottom: 5px;
}

.ul-list {
  margin: auto;
  align-items: center;
  text-align: center;
}

.input-css {
  height: 46px;
  width: 500px;
  margin: auto;
}

.button-css {
    color: #000000;
    top:50%;
    background-color:#1DA1F2;
    border:none; 
    border-radius:12px; 
    padding:10px;
    min-height:30px; 
    min-width: 120px;
}

.styled-h3 {
    padding-top: 5%;
}
</style>
  