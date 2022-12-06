<template>
    <main>
        <section v-if="$store.state.upcomingMeetings.length">
            <UpcomingMeetingComponent 
                v-for="upcomingMeeting in $store.state.upcomingMeetings"
                :key="upcomingMeeting._id"
                :id="upcomingMeeting._id"
                :user="upcomingMeeting.user"
                :resident="upcomingMeeting.resident"
                :vibeLink="upcomingMeeting.vibeLink"
                :dateTime="upcomingMeeting.dateTime"
            />
        </section>
        <article 
            v-else
            class="text"
        >
            <h3>You have no upcoming meetings! Schedule a meeting to learn more about a neighborhood!!!</h3>
        </article>
    </main>
</template>
    
<script>


export default {
    name: 'UpcomingMeetingsPage',
    
};
</script>

<style scoped>
.text {
    text-align: center;
}
</style>