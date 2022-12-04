<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import { ref } from 'vue';
export default {
  components: { DatePicker },
  data() {
    return {
      time1: null,
      time2: null,
      time3: null,
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
      } catch (e) {
        this.$set(this.alerts, e, "error");
        setTime(() => this.$delete(this.alerts, e), 3000);
      }
      console.log(response);

    },
    async addAvailability() {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          username: "",
          date: ""
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
    <h1 class="h1 text-center">Welcome to VibeCheck!</h1>
    <DatePicker v-model="date" />
    <button 
    class="styledButton" 
    @click="getAvailability">
    Add availability
    </button>
  </div>
  
</template>

<style>

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
}

</style>