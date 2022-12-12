<template>
    <main>
        <section>
            <header>
                <h2>Profile</h2>
            </header>
        </section>
        <section class="profile">
            <section>
                <header>
                    <h3>@{{ $store.state.username }}</h3>
                </header>
                <header>
                    <h4 class="styled-h4">Joined: {{ dateJoined }}</h4>
                </header>
            </section>
        </section>
        <div>
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Your Residences" active>
                        <CertifiedResidencyPage />
                    </b-tab>
                    <b-tab title="Upcoming Meetings">
                        <UpcomingMeetingsPage />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </main>
</template>

<script>
import CertifiedResidencyPage from '@/components/CertifiedResidency/CertifiedResidencyPage.vue';
import UpcomingMeetingsPage from '@/components/VibeCheck/UpcomingMeetingsPage.vue';

export default {
    name: 'ProfilePage',
    components: {
        CertifiedResidencyPage,
        UpcomingMeetingsPage
    },
    computed: {
        dateJoined() {
            return this.$store.state.dateJoined.split(',')[0]
        }
    },
    mounted() {
        this.loadCertifiedResidency();
        this.loadUpcomingMeetings();
    },
    methods: {
        loadCertifiedResidency() {
            this.$store.commit('refreshCertifiedResidency');
        },
        loadUpcomingMeetings(){
            this.$store.commit('refreshUpcomingMeetings');
        }
    }
};
</script>

<style scoped>
.profile {
    border: solid 1px lightgray;
    border-style: solid;
    border-radius: 15px;
    margin-bottom: 1em;
    padding: 1em;
    position: relative;
}

.styled-h4 {
    margin-top: 10px;
    font-size: 20px;
    color: grey;
}
</style>