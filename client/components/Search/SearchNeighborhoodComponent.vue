<template>
    <article class="search" @click="goToMap">
        <header>
            <h3>
                {{ neighborhood.name }}, {{ neighborhood.city }}, {{ neighborhood.state }}
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
    name: 'SearchNeighborhoodComponent',
    props: {
        neighborhood: {
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
        goToMap() {
            const neighborhoods = [this.neighborhood];
            const neighborhoodFilter = { name: this.neighborhood.name, city: this.neighborhood.city, state: this.neighborhood.state };
            
            this.$store.commit('updateNeighborhoods', neighborhoods);
            this.$store.commit('updateNeighborhoodFilter', neighborhoodFilter);

            this.$router.push({ name: 'Map' });

            const message = `Neighborhood ${this.neighborhood.name}, ${this.neighborhood.city}, ${this.neighborhood.state} was found.`;
            this.$store.commit('alert', {
                message: message, status: 'success'
            });
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