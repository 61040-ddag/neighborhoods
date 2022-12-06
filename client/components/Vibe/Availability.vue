<template>
    <div class="wrapper">
        <div class="card text-center card_">
            <div class="card-header">
                Availability
            </div>
            <div class="card-body">
                <h5 class="card-title">Resident: {{availability.username }}</h5>
                <p class="card-text">Available at: {{ availability.dateTime }}</p>
                <label>Enter meeting here and create breakout room:</label><br>
                <!-- <input type="text" v-model="videoLink"><br></br> -->
                <a class="btn btn-primary" v-bind:href="availability.vibeLink">Meeting Link</a><br>
            </div>
            <div>
                <button @click="deleteAvailability">
                    Delete
                </button>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    name: "Availability",
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
                url: `/api/vibe/availability/${this.availability._id}`,
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
</style>