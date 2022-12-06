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
                        <VibeCheckPage 
                            :isResident="isResident"
                        />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </main>
</template>

<script>
import ReviewPage from '@/components/Review/ReviewPage.vue';
import StrollPage from '@/components/Stroll/StrollPage.vue';
import VibeCheckPage from '@/components/VibeCheck/VibeCheckPage.vue';

export default {
    name: 'NeighborhoodPage',
    components: {
        ReviewPage,
        StrollPage,
        VibeCheckPage
    },
    data() {
        return {
            isResident: false,
        };
    },
    async mounted() {
        this.loadReviews(),
        this.loadStrolls(),
        this.loadAvailabilities(),
        this.checkResident()
    },
    methods: {
        loadReviews() {
            this.$store.commit('refreshReviews')
        },
        loadStrolls() {
            this.$store.commit('refreshStrolls');
        },
        loadAvailabilities() {
            this.$store.commit('refreshAvailabilities');
        },
        async checkResident() {
            const username = this.$store.state.username;
            const neighborhoodId = this.$store.state.neighborhood._id;
            const url = `/api/certifiedResidency/isCertified?user=${username}&neighborhoodId=${neighborhoodId}`;
            const res = await fetch(url).then(async r => r.json());
            this.isResident = res;
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