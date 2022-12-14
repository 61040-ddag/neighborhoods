<template>
    <div class="wrapper">
        <div class="card text-center card_">
            <div class="card-header">
                Vibe Check
            </div>
            <div class="card-body">
                <h5 class="card-title">Resident: @{{ availability.username }}</h5>
                <h5 class="card-title">Neighborhood: {{ availability.neighborhood.name }}</h5>
                <p class="card-text">Available at: {{ availability.dateTime }}</p>
            </div>
            <section>
                <button class='btn btn-primary styled-button' @click="scheduleMeeting">
                    Schedule
                </button>
            </section>
        </div>
    </div>
</template>
    
  <script>
  export default {
    name: 'ResidentAvailabilityComponent',
    props: {
      // Data from the stored vibe check
      availability: {
        type: Object,
        required: true,
      }
    },
    methods: {
        scheduleMeeting() {
            const params = {
                url: `/api/vibeCheck`,
                method: 'POST',
                body: JSON.stringify({
                    availabilityId: this.availability._id
                }),
                callback: () => {
                    this.$store.commit('alert', {
                        message: `Successfully scheduled a vibe check with ${this.availability.username}`, status: 'success'
                    });
                }
            };
            this.request(params);
        },
        async request(params) {
            /**
             * Submits a request to the vibe check's endpoint
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

                this.$store.commit('refreshUpcomingMeetings');
                this.$store.commit('refreshAvailabilities');

                params.callback();
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        }
    }
  };
  </script>

<style>
.styled-button {
    margin-bottom: 10px;
}
</style>