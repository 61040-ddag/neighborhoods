<template>
    <div class="wrapper">
        <div class="card text-center card_">
            <div class="card-header">
            Availability
            </div>
            <div class="card-body">
            <h5 class="card-title">Resident: {{ user }}</h5>
            <p class="card-text">Available at: {{ time }}</p>
            <label>Enter meeting here and create breakout room:</label><br>
            <!-- <input type="text" v-model="videoLink"><br></br> -->
            <a class="btn btn-primary" href="https://mit.zoom.us/j/3197957566">Join Zoom here</a><br>
            <!-- <button href="#"
            class="btn btn-primary"
            type="submit"
            @click="setVideoLink"
            >
            Set Appointment</button> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Availability",
    props: {
        user: String,
        time: Date,
        required: true,
    },
    mounted() {
        // this.getVideoLink()
    },
    data() {
        return {
            videoLink: null
        }
    },
    methods: {
        async setVideoLink() {
            console.log("line 37 console");
            console.log(this.time);
            console.log(this.videoLink);
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    username: this.$store.state.username,
                    resident: this.user,
                    date: this.time,
                    vibeLink: this.videoLink
                }),
                headers: { 'Content-Type': 'application/json' }
            };
            const r = await fetch('/api/vibe/addVibe', options);
            const response = await r.json();
            if (!r.ok) {
                throw new Error(response.error);
            }
            console.log(response);
        },
        async getVideoLink() {
            const r = await fetch(`/api/vibe/getVibe?time=${this.time}`);
            const response = await r.json();
            if (!r.ok) {
                throw new Error(response.error);
            }
            console.log(response);
            this.videoLink = response.videoLink;
        }
    }
}
</script>

<style>
.wrapper {
    padding-bottom: 100px;;
}
</style>