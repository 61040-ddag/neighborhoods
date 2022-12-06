<template>
  <article class="stroll">
    <header>
      <div class="author">
        <h3 v-if="isCertified">
          @{{ stroll.author }}☑️
        </h3>
        <h3 v-else>
          @{{ stroll.author }}
        </h3>
      </div>
    </header>
    <div class="title">
      <h3> {{ stroll.title }}</h3>
      <video 
        ref="videoRef" 
        :src="stroll.strollVideo" 
        id="video-container" 
        width="100%" controls>
      </video>
    </div>
    <p class="info">
      Posted at {{ stroll.dateUploaded }}
    </p>
    <section>
      <div
        v-if="$store.state.username === stroll.author"
        class="actions"
      >
        <button @click="deleteStroll">
          🗑️ Delete
        </button>
      </div>
    </section>
    <section class="alerts">
      <article v-for="(status, alert, index) in alerts" :key="index" :class="status">
        <p>{{ alert }}</p>
      </article>
    </section>
  </article>
</template>
  
<script>
export default {
  name: 'StrollComponent',
  props: {
    // Data from the stored stroll
    stroll: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      isCertified: false,
      alerts: {} // Displays success/error messages encountered during stroll modification
    };
  },
  async mounted() {
    this.checkCertified()
  },
  methods: {
    async checkCertified() {
      const username = this.stroll.author;
      const neighborhoodId = this.stroll.neighborhood._id;
      const url = `/api/certifiedResidency/isCertified?user=${username}&neighborhoodId=${neighborhoodId}`;
      const res = await fetch(url).then(async r => r.json());
      this.isCertified = res;
    },
    deleteStroll() {
        /**
         * Deletes this stroll.
         */
        const params = {
          method: 'DELETE',
          callback: () => {
            this.$store.commit('alert', {
              message: 'Successfully deleted stroll!', status: 'success'
            });
          }
        };
        this.request(params);
      },
      async request(params) {
        /**
         * Submits a request to the stroll's endpoint
         * @param params - Options for the request
         * @param params.body - Body for the request, if it exists
         * @param params.callback - Function to run if the the request succeeds
         */
        const options = {
          method: params.method, headers: {'Content-Type': 'application/json'}
        };
        if (params.body) {
          options.body = params.body;
        }
  
        try {
          const r = await fetch(`/api/strolls/${this.stroll._id}`, options);
          if (!r.ok) {
            const res = await r.json();
            throw new Error(res.error);
          }
  
          this.$store.commit('refreshStroll');
  
          params.callback();
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
      }
  }
};
</script>
  
<style scoped>
.author {
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: solid 1px lightgray;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stroll {
  margin: auto;
  width: 66%;
  border: solid 1px lightgray;
  border-style: solid;
  border-radius: 15px;
  margin-bottom: 1em;
  padding: 1em;
  position: relative;
}

.title {
  text-align: center;
}

.actions button {
    background-color: white;
    color: black;
    position: relative;
    border:solid 1px lightgray;
    padding: 0px 10px;
    border-radius: 14px;
    margin-left: 0.25em;
    margin-right: 0.25em;
    font-family: inherit;
    font-size: medium;
    font-weight: bold;
    height: 2em;
  }
  
  .actions button:hover {
    background-color: lightgray;
    color: black;
  }
</style>
  