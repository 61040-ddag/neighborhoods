<template>
    <div class="wrapper">
        <div class="card text-center card_">
            <div class="card-header">
                Availability
            </div>
            <div class="card-body">
                <h5 class="card-title">Resident: @{{availability.username }}</h5>
                <h5 class="card-title">Neighborhood: {{availability.neighborhood.name }}</h5>
                <p class="card-text">Available at: {{ availability.dateTime }}</p>
            </div>
            <div>
                <button class="btn btn-primary styled-button" @click="deleteAvailability">
                    Delete
                </button>
            </div>
            <div>
                <a class="btn btn-primary" target="_blank" v-bind:href="availability.videoLink">Check Meeting Link</a>
            </div>
            <br>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AvailabilityComponent',
    props: {
        availability: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            alerts: {}
        }
    },
    methods: {
        deleteAvailability() {
            const params = {
                url: `/api/vibeCheck/availability/${this.availability._id}`,
                method: 'DELETE',
                callback: () => {
                    this.$store.commit('alert', {
                        message: `Successfully unschedule availability`, status: 'success'
                    });
                }
            };
            this.request(params);
        },
        async request(params) {
            /**
             * Submits a request to the availability's endpoint
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

                this.$emit('updateAvailability');

                params.callback();
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        }
    }
}
</script>

<style>
.wrapper {
    padding-bottom: 100px;
    ;
}

.styled-button {
    padding-bottom: 10px;
    margin-bottom: 10px;
}
</style>