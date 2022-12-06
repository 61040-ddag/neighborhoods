<template>
    <main>
        <section v-if="$store.state.upcomingMeetings.length">
            <UpcomingMeetingComponent 
                v-for="upcomingMeeting in $store.state.upcomingMeetings"
                :upcomingMeeting="upcomingMeeting"
            />
        </section>
        <article 
            v-else
            class="text"
        >
            <h3>You have no upcoming meetings!</h3>
        </article>
    </main>
</template>
    
<script>
import UpcomingMeetingComponent from '@/components/VibeCheck/UpcomingMeetingComponent.vue';

export default {
    name: 'UpcomingMeetingsPage',
    components: {
        UpcomingMeetingComponent
    }
};
</script>

<style scoped>
.text {
    text-align: center;
}
</style>