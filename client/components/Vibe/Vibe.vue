<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { ref } from 'vue';
import Availability from './Availability';
export default {
  name: 'Vibe',
  components: { DatePicker, Availability },
  data() {
    return {
      username: this.$store.state.username,
      inputtedTime: null,
      availabilities: []
    }
  },
  mounted() {
    this.getAvailability();
  },
  methods: {
    async getAvailability() {
      try {
        const r = await fetch(`/api/vibe/getAvailability?${this.$store.state.username}`);
        const response = await r.json();
        if (!r.ok) {
          throw new Error(response.error);
        }
        this.availabilities = response.Vibes;
      } catch (e) {
        this.$set(this.alerts, e, "error");
        setTime(() => this.$delete(this.alerts, e), 3000);
      }
    },
    async addAvailability() {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          username: `${this.$store.state.username}`,
          date: `${this.inputtedTime}`
        }),
        headers: { 'Content-Type': 'application/json' }
      };
      const r = await fetch('/api/vibe/addAvailability', options);
      const response = await r.json();
      if (!r.ok) {
          throw new Error(response.error);
      }
      console.log(response);
    }
  },
}
</script>

<template>
  <div class="customContainer container row col-md-8 mx-auto">
    <h1 class="h1 text-center title">VibeCheck</h1>
    <div class="header">
      <h2>Resident? Add availability!</h2>
      <DatePicker v-model="inputtedTime" type="datetime"/>
    </div>
    <h1 v-if="(inputtedTime !== null)">{{ inputtedTime }}</h1>
    <button 
    class="styledButton" 
    @click="addAvailability">
    Add availability
    </button>
    <h2 class="header">Neighborhood Availabilities</h2>
    <Availability 
    v-for="avail in availabilities"
    :key="avail.id"
    :time="avail.time"
    :user="username"
    />
    <!-- <h1 v-for="avail in availabilities">{{avail.time}}</h1> -->
  </div>
  
</template>

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