<!-- Reusable component representing a form in a block style -->

<template>
  <form @submit.prevent="submit">
    <h3>{{ title }}</h3>
    <article v-if="fields.length">
      <div 
        v-for="field in fields" 
        :key="field.id"
      >
        <label :for="field.id">{{ field.label }}:</label>
        <textarea 
          v-if="field.id === 'content'" 
          :name="field.id" 
          :value="field.value"
          @input="field.value = $event.target.value" 
        />
        <input 
          v-else 
          :type="field.id === 'password' ? 'password' : 'text'" 
          :name="field.id" :value="field.value"
          @input="field.value = $event.target.value"
        >
      </div>
    </article>
    <article v-else>
      <p>{{ content }}</p>
    </article>
    <button type="submit">
      {{ button }}
    </button>
    <section class="alerts">
      <article 
        v-for="(status, alert, index) in alerts" 
        :key="index" 
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </form>
</template>
  
<script>

export default {
  name: 'BlockForm',
  props: {
    button: {
      type: String,
      default: 'Submit'
    }
  },
  data() {
    /**
     * Options for submitting this form.
     */
    return {
      url: '', // Url to submit form to
      method: 'GET', // Form request method
      hasBody: false, // Whether or not form request has a body
      setUsername: false, // Whether or not stored username should be updated after form submission
      deleteNeighborhood: false, // Whether or not we are deleting a nbhood
      updateNeighborhood: false,
      alerts: {}, // Displays success/error messages encountered during form submission
      callback: null // Function to run after successful form submission
    };
  },
  methods: {
    async submit() {
      /**
        * Submits a form with the specified options from data().
        */
      const options = {
        method: this.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin' // Sends express-session credentials with request
      };
      if(this.updateNeighborhood || this.deleteNeighborhood){
        var extra = '';
        console.log(this.fields);
        for(const field of this.fields){          
          const {id, value} = field;
          if(id == "name" || id == "city" || id == "state"){
            const val = value.trim().replace(" ", "_");
            extra+=`&${id}=${val}`;
          }
        }
        extra = extra.substring(1);
      }
      if (this.hasBody) {
        options.body = JSON.stringify(Object.fromEntries(
          this.fields.map(field => {
            const { id, value } = field;
            field.value = '';
            return [id, value.trim().replace(" ", "_")];
          })
        ));
      }

      try {
        let url = "";
        if(this.updateNeighborhood || this.deleteNeighborhood){
          url = this.url + extra;
        }else{
          url = this.url;
        }
        console.log(url);
        const r = await fetch(url, options);
        if (!r.ok) {
          // If response is not okay, we throw an error and enter the catch block
          const res = await r.json();
          throw new Error(res.error);
        }

        if (this.setUsername) {
          const text = await r.text();
          const res = text ? JSON.parse(text) : { user: null };
          this.$store.commit('setUsername', res.user ? res.user.username : null);
          this.$store.commit('setDateJoined', res.user ? res.user.dateJoined : null);
          this.$store.commit('setIsAdmin', res.user ? res.user.isAdmin : null);
        }

        if (this.callback) {
          this.callback();
        }
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>
  
<style scoped>
form {
  border: solid 1px #ccc;
  border-style: solid;
  border-radius: 8px;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1em;
  position: relative;
}

article>div {
  display: flex;
  flex-direction: column;
}

form>article p {
  margin: 0;
}

form h3,
form>* {
  margin: 0.3em 0;
}

form h3 {
  margin-top: 0;
}

button {
  background-color: grey;
  color: white;
  border: none;
  border-radius: 50px;
  width: fit-content;
  padding: 0px 10px;
  height: 2em;
  font-family: inherit;
  font-size: medium;
  font-weight: bold;
}

button:hover {
  background-color: #6e6e6e;
}

textarea {
  border: solid 1px #ccc;
  resize: none;
  font-family: inherit;
  font-size: inherit;
}
</style>
