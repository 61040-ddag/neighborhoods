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
        <input 
          class="input-css"
          v-model="state" 
          type="text" 
          :placeholder="statePlaceholder"
        >
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
</div>
</template>


<script>
export default {
  name: 'GetNeighborhoodsForm',
  props: {
    neighborhoodPlaceholder: {
      type: String,
      default: ''
    },
    cityPlaceholder: {
      type: String,
      default: '',
    },
    statePlaceholder: {
      type: String,
      default: ''
    },
    button: {
      type: String,
      default: 'Submit'
    }
  },
  data() {
    return {
      neighborhood: '',
      city: '',
      state: '',
      alerts: {}
    };
  },
  methods: {
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
          throw new Error('Location does not exist yet. Check again later!')
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
</style>
  