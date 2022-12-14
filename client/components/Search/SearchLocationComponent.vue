<template>
    <article class="search" @click="goToMap">
        <header>
            <h3>
                {{ location.city }}, {{ location.state }}
            </h3>
        </header>
        <section class="alerts">
        <article
          v-for="(status, alert, index) in alerts"
          :key="index"
          :class="status"
        >
          <p>{{ alert }}</p>
        </article>
      </section>
    </article>
</template>


<script>

export default {
    name: 'SearchLocationComponent',
    props: {
        location: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            alerts: {}
        };
    },
    methods: {
        async goToMap() {
            try {
                const formatBackend = (word) => {
                    return word.trim().replace(/ {2,}/g, ' ').split(' ').join('_').toLowerCase();
                };

                const city = formatBackend(this.location.city);
                const state = formatBackend(this.location.state);

                const url = `/api/neighborhoods/location?city=${city}&state=${state}`;

                const r = await fetch(url);
                const res = await r.json();
                if (!r.ok) {
                    throw new Error(res.error);
                }

                const neighborhoods = res.neighborhoods;
                const neighborhoodFilter = { city: this.location.city, state: this.location.state };

                this.$store.commit('updateNeighborhoods', neighborhoods);
                this.$store.commit('updateNeighborhoodFilter', neighborhoodFilter);

                this.$router.push({ name: 'Map' });

                const message = `Neighborhoods in ${this.location.city}, ${this.location.state} was found.`;
                this.$store.commit('alert', {
                    message: message, status: 'success'
                });
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        }
        
    }
};

</script>

<style scoped>
.search {
    border: solid 1px lightgray;
    border-style: solid;
    border-radius: 15px;
    margin-bottom: 0.5em;
    padding: 0.5em;
    position: relative;
}
</style>