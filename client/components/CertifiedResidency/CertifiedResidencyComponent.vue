<template>
    <article class="residency">
        <header>
            <h3>
                {{ neighborhood.name }}, {{ neighborhood.city }}, {{ neighborhood.state }}
            </h3>
        </header>
        <section>
            <button @click="leaveResidence">
                Leave Residence
            </button>
            <button 
                @click="residentNeighborhood"
                class="btn btn-primary"
            >
                Schedule Availability
            </button>
        </section>
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
import AvailabilityPage from '@/components/VibeCheck/AvailabilityPage.vue';

export default {
    name: 'CertifiedResidencyComponent',
    components: {
        AvailabilityPage
    },
    props: {
        id: {
            type: String,
            required: true
        },
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
        residentNeighborhood() {
            this.$store.commit('setResidentNeighborhood', this.neighborhood);
            this.$router.push({ name: 'Availability' });
        },
        leaveResidence() {
            const params = {
                url: `/api/certifiedResidency/${this.id}`,
                method: 'DELETE',
                callback: () => {
                    this.$store.commit('alert', {
                        message: `Successfully left the neighborhood ${this.neighborhood.name}, ${this.neighborhood.city}, ${this.neighborhood.state}`, status: 'success'
                    });
                }
            };
            this.request(params);
        },
        async request(params) {
            /**
             * Submits a request to the certifiedResidency's endpoint
             * @param params - Options for the request
             * @param params.body - Body for the request
             * @param params.callback - Function to run if the request succeeds
             */
            const options = {
                method: params.method, headers: { 'Content-Type': 'application/json' }
            };

            if (params.body) {
                options.body = params.body;
            }

            try {
                const r = await fetch(params.url, options);
                if (!r.ok) {
                    const res = await r.json();
                    throw new Error(res.error);
                }

                this.$store.commit('refreshCertifiedResidency');

                params.callback();
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        }
    }
};

</script>

<style scoped>
.residency {
    border: solid 1px lightgray;
    border-style: solid;
    border-radius: 15px;
    margin-bottom: 1em;
    padding: 1em;
    position: relative;
}

button {
    background-color: white;
    color: black;
    position: relative;
    border: solid 1px lightgray;
    padding: 0px 10px;
    border-radius: 14px;
    margin-left: 0.25em;
    font-family: inherit;
    font-size: large;
    font-weight: bold;
    height: 2em;
}

button:hover {
    background-color: lightgray;
    color: black;
}
</style>