<template>
    <article class="residency">
        <header>
            <h3>
                Meeting on {{dateTime}}
            </h3>
            <h2> Meeting between {{user}} and {{resident}} </h2>
            <a :href="vibeLink"> Link to meeting </a>
        </header>
        <button @click="deleteVibe">
                Delete
            </button>
    </article>
</template>

<script>


export default {
    name: 'UpcomingMeetingComponent',
    props: {
        id: {
            type: String,
            required: true
        },
        user: {
            type: String,
            required: true
        },
        resident: {
            type: String,
            required: true
        },
        vibeLink: {
            type: String,
            required: true
        },
        dateTime: {
            type: String,
            required: true
        },
    },

    data() {
        return {
            alerts: {}
        };
    },
    methods: {
        deleteVibe() {
            const params = {
                url: `/api/vibe/${this.id}`,
                method: 'DELETE',
                callback: () => {
                    this.$store.commit('alert', {
                        message: `Successfully deleted vibe with vibe ${this.id} `, status: 'success'
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

                this.$store.commit('upcomingMeetings');

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