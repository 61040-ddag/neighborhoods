<template>
    <main>
        <header class="back">
            <router-link
                to="/map"
                class="backLink"
            >
                ← Back to Map
            </router-link>
        </header>
        <section>
            <header>
                <h2 class="text">{{this.$store.state.neighborhood.name}}</h2>
            </header>
        </section>
        <div>
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Review" active>
                        <ReviewPage />
                    </b-tab>
                    <b-tab title="Scroll">
                        <StrollPage />
                    </b-tab>
                    <b-tab title="Vibe Check">
                        <AvailabilityPage />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </main>
</template>

<script>
import ReviewPage from '@/components/Review/ReviewPage.vue';
import StrollPage from '@/components/Stroll/StrollPage.vue';
import AvailabilityPage from '@/components/Vibe/AvailabilityPage.vue';

export default {
    name: 'NeighborhoodPage',
    components: {
        ReviewPage,
        StrollPage,
        AvailabilityPage
    },
    data() {
        return {
            alerts: {}
        }
    },
    mounted() {
        this.loadReviews(),
        this.loadStrolls()
    },
    methods: {
        loadReviews() {
            this.$store.commit('refreshReviews')
        },
        loadStrolls() {
            this.$store.commit('refreshStrolls');
        }
    }
}

</script>

<style scoped>
.text {
    text-align: center;
}
.back {
    margin-top: 1em;
}
.backLink {
    text-decoration: none;
    color: black;
    margin-top: 1em;
 }
</style>