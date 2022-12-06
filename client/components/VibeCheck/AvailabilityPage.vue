<template>
    <main>
        <header class="back">
            <router-link 
                to="/profile" 
                class="backLink"
            >
                ← Back to Profile
            </router-link>
        </header>
            <div class="customContainer container row col-md-8 mx-auto">
            <h1 class="h1 text-center title">Schedule Availability for {{ $store.state.residentNeighborhood.name }}</h1>
            <div class="header">
                <h2>Resident? Add availability!</h2>
                <DatePicker v-model="inputtedTime" type="datetime" />
            </div>
            <h3 v-if="(inputtedTime !== null)">{{ inputtedTime }}</h3>
            <label>Enter your video link here:</label>
            <input type="text" v-model="videoLink">
            <button class="styledButton" type="submit" @click="addAvailability">
                Add availability
            </button>
            <h2 class="header">Neighborhood Availabilities</h2>
            <section v-if="availabilities.length">
                <AvailabilityComponent 
                    v-for="availability in availabilities" 
                    :key="availability.id" 
                    :availability="availability"
                    @updateAvailability="getAvailability" 
                />
            </section>
            <article v-else>
                No schedules. Schedule an availability now!
            </article>
    </div>
    </main>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { ref } from 'vue';
import AvailabilityComponent from '@/components/VibeCheck/AvailabilityComponent.vue';

export default {
    name: 'AvailabilityPage',
    components: {
        DatePicker,
        AvailabilityComponent
    },
    data() {
        return {
            inputtedTime: null,
            videoLink: "",
            availabilities: []
        }
    },
    async mounted() {
        this.getAvailability();
    },
    methods: {
        async getAvailability() {
            try {
                const r = await fetch(`/api/vibeCheck/availability?neighborhoodId=${this.$store.state.residentNeighborhood._id}`);
                const response = await r.json();
                if (!r.ok) {
                    throw new Error(response.error);
                }
                this.availabilities = response.availabilities.filter(availability => availability.username === this.$store.state.username);

            } catch (e) {
                this.$set(this.alerts, e, "error");
                setTime(() => this.$delete(this.alerts, e), 3000);
            }
        },
        async addAvailability() {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    neighborhoodId: `${this.$store.state.residentNeighborhood._id}`,
                    videoLink: `${this.videoLink}`,
                    dateTime: `${this.inputtedTime}`
                }),
                headers: { 'Content-Type': 'application/json' }
            };

            const r = await fetch('/api/vibeCheck/availability', options);
            const response = await r.json();
            if (!r.ok) {
                throw new Error(response.error);
            }
            this.getAvailability();
        }
    },
};

</script>

<style>
.backLink {
  text-decoration: none;
  color: black;
  margin-top: 1em;
}
.header {
    text-align: center;
    padding-top: 50px;
    padding-bottom: 50px;
}

.customContainer {
    margin-top: 5%;
    padding-bottom: 10%;
}

.styledButton {
    background: #0e72ed;
    border-radius: 12px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 16px;
    line-height: 32px;
    margin-top: 40px;
    padding: 8px 40px;
    text-align: center;
    margin-bottom: 50px;
}
</style>