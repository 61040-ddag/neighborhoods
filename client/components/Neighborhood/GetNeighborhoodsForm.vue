<!-- Form for finding neighborhoods (inline style) -->
<template>
  <form @submit.prevent="submit">
    <input 
      v-model="neighborhood" 
      type="text" 
      :placeholder="neighborhoodPlaceholder"
    >
    <input 
      v-model="city" 
      type="text" 
      :placeholder="cityPlaceholder"
    >
    <input 
      v-model="state" 
      type="text" 
      :placeholder="statePlaceholder"
    >
    <button 
      type="submit"
    >
      {{ button }}
    </button>
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
      // const data = { name: this.neighborhood, city: this.city, state: this.state };
      // console.log(data)
        // const url = this.value ? `/api/freets?author=${this.value}` : '/api/freets';
        try {
          if (!this.state) {
            throw new Error('State of desired location is required.')
          }

          if (!this.city) {
            throw new Error('City of desired location is required.');
          }

          const neighborhoodURL = `/api/neighborhoods?name=${this.neighborhood}&city=${this.city}&state=${this.state}`;
          const locationURL = `/api/neighborhoods/location?city=${this.city}&state=${this.state}`;
          const url = this.neighborhood ?  neighborhoodURL : locationURL;
          console.log(url);

          // const r = await fetch(url);
          // const res = await r.json();
          // if (!r.ok) {
          //   throw new Error(res.error);
          // }
          // this.$store.commit('updateFilter', this.value);
          // this.$store.commit('updateFreets', res);
        } catch (e) {
          // if (this.value === this.$store.state.filter) {
          //   // This section triggers if you filter to a user but they
          //   // change their username when you refresh
          //   this.$store.commit('updateFilter', null);
          //   this.value = ''; // Clear filter to show all users' freets
          //   this.$store.commit('refreshFreets');
          // } else {
          //   // Otherwise reset to previous fitler
          //   this.value = this.$store.state.filter;
          // }
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
</style>
  