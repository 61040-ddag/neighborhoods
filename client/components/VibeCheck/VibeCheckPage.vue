<template>
    <main>
        <section
            v-if="isResident"
        >
            <h2>
                You are a current resident of {{$store.state.neighborhood.name}}. Check out your 
                <router-link
                    to="/profile"
                    class="routerLink"
                >
                    Profile Page
                </router-link>
                to help inform potential family starters!
            </h2>
        </section>
        <section
            v-else
        >
            <header>
                <h2>Schedule a Vibe Check with a Resident of {{$store.state.neighborhood.name}}!</h2>
                <br>
                 <h4>You can find your upcoming meetings in 
                     <router-link to="/profile" class="routerLink">
                         Profile
                     </router-link>
                     once you've scheduled them.</h4>
                 <br>
            </header>
            <section v-if="$store.state.availabilities.length">
                <ResidentAvailabilityComponent 
                    v-for="availability in $store.state.availabilities"
                    :key="availability._id"
                    :availability="availability"
                />
            </section>
            <article 
                v-else
                class="text"
            >
                No residents are available at this time. Please check again later!
            </article>
        </section>
    </main>
</template>

<script>
import ResidentAvailabilityComponent from '@/components/VibeCheck/ResidentAvailabilityComponent.vue';

export default {
    name: 'VibeCheckPage',
    components: {
        ResidentAvailabilityComponent
    },
    props: {
        isResident: {
            type: Boolean,
            required: true
        }
    }
};
</script>

<style scoped>
.routerLink {
  text-decoration: none;
}
</style>