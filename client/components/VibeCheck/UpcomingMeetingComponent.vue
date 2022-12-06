<template>
    <div class="wrapper">
        <div class="card text-center card_">
            <div class="card-header">
                Meeting on {{ upcomingMeeting.availability.dateTime }}
            </div>
            <div class="card-body">
                <h5 class="card-title">Meeting between User: {{ upcomingMeeting.username }} and Resident: {{ upcomingMeeting.availability.residentname }}</h5>
                <h5 class="card-title">Neighborhood: {{ upcomingMeeting.availability.neighborhood.name }}</h5>
            </div>
            <label>Link to meeting</label><br>
            <a class="btn btn-primary" v-bind:href="upcomingMeeting.availability.videoLink">Meeting Link</a><br>
            <button @click="deleteVibeCheck">
                Delete
            </button>
        </div>
    </div>
</template>

<script>


export default {
    name: 'UpcomingMeetingComponent',
    props: {
        upcomingMeeting: {
            type: Object,
            required: true
        },
    },

    data() {
        return {
            alerts: {}
        };
    },
    methods: {
        deleteVibeCheck() {
            const params = {
                url: `/api/vibeCheck/${this.upcomingMeeting._id}`,
                method: 'DELETE',
                callback: () => {
                    this.$store.commit('alert', {
                        message: `Successfully removed an upcoming vibecheck meeting`, status: 'success'
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

                params.callback();
            } catch (e) {
                this.$set(this.alerts, e, 'error');
                setTimeout(() => this.$delete(this.alerts, e), 3000);
            }
        }
    }
};

</script>