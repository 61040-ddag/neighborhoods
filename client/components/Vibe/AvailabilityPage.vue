<template>
    <div class="customContainer container row col-md-8 mx-auto">
        <section v-if="isResident">
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
        </section>
        <h2 class="header">Neighborhood Availabilities</h2>
        <section v-if="availabilities.length">
            <Availability v-for="avail in availabilities" :key="avail.id" :availability="avail"
                @updateAvailability="getAvailability" />
        </section>
        <article v-else>
            <p v-if="isResident">No schedules. Schedule an availability now!</p>
            <p v-else>No residents are available at this time. Please check again later!</p>     
        </article>
    </div>

</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { ref } from 'vue';
import Availability from '@/components/Vibe/Availability.vue';

export default {
    name: 'AvailabilityPage',
    components: {
        DatePicker,
        Availability
    },
    data() {
        return {
            inputtedTime: null,
            isResident: false,
            videoLink: "",
            availabilities: []
        }
    },
    async mounted() {
        this.getAvailability();
        this.checkResident();
    },
    methods: {
        async checkResident() {
            const url = `/api/certifiedResidency/isCertified?user=${this.$store.state.username}&neighborhoodId=${this.$store.state.neighborhood._id}`;
            const res = await fetch(url).then(async r => r.json());
            this.isResident = res;
        },
        async getAvailability() {
            try {
                const r = await fetch(`/api/vibe/availability?neighborhoodId=${this.$store.state.residentNeighborhood._id}`);
                const response = await r.json();
                if (!r.ok) {
                    throw new Error(response.error);
                }
                console.log(response.availabilities)
                if (this.isResident) {
                    this.availabilities = response.availabilities.filter(avail => avail.username === this.$store.state.username);
                } else {
                    this.availabilities = response.availabilities;
                }
                
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
                    vibeLink: `${this.videoLink}`,
                    dateTime: `${this.inputtedTime}`
                }),
                headers: { 'Content-Type': 'application/json' }
            };

            const r = await fetch('/api/vibe/availability', options);
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