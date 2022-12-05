<!-- Reusable component representing a form in a block style -->

<template>
  <form @submit.prevent="submit">
    <h3>{{ title }}</h3>
    <article v-if="fields.length">
      <div 
        v-for="field in filteredFields" 
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
      <div v-if="isVideoUpload">
        <label> Add stroll: </label>
        <input  type="file" id="file" name="file" accept="video/*" @change="commitFile"/>
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
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD_uOxqo6xFc64CxF4cf1Fwc4e_s6Q_c_Y",
  authDomain: "nbhoods-8b7f9.firebaseapp.com",
  projectId: "nbhoods-8b7f9",
  storageBucket: "nbhoods-8b7f9.appspot.com",
  messagingSenderId: "956421104536",
  appId: "1:956421104536:web:5ff9a4aab04ba2008481ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

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
      hasQueryParams: false, // Whether or not form request has query parameters
      setUsername: false, // Whether or not stored username should be updated after form submission
      refreshReviews: false, // Whether or not stored reviews should be updated after form submission
      refreshStrolls: false, // Whether or not stored strolls should be updated after form submission
      isVideoUpload: false, // Whether or not we upload a video after form submission
      fileContent: null, // File content
      refreshCertifiedResidency: false, // Whether or not stored certifiedResidency should be updated after form submission
      alerts: {}, // Displays success/error messages encountered during form submission
      callback: null, // Function to run after successful form submission
    };
  },
  computed: {
    filteredFields() {
      return this.fields.filter(field => field.id !== 'neighborhoodId');
    }
  },
  methods: {
    commitFile(e){
      this.fileContent = e.target.files[0];
    },
    async submit() {
      /**
       * Submits a form with the specified options from data().
       */
      let url = this.url;
      const now = Date.now();
      let hasUploadedVideo = false;
      
      const options = {
        method: this.method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin' // Sends express-session credentials with request
      };

      if (this.isVideoUpload && this.fileContent) {
        const storageRef = ref(storage, this.$store.state.username + "/" + now.toString() + "_" + this.fileContent.name);

        await uploadBytes(storageRef, this.fileContent).then((snapshot) => {
          hasUploadedVideo = true;
          console.log('Uploaded a file!');
        }).catch((error) => {
          console.log("Failed to upload a file!")
        });

      }

      if (this.hasQueryParams) {
        let queryParams = '?';
        const params = [];

        for (const field of this.fields) {
          const { id, type, value } = field;
          if (type === 'queryParam') {
            let val = value.trim();
            if (id === 'name' || id === 'city' || id === 'state') {
              val = val.replace(' ', '_').toLowerCase();
            }
            params.push(`${id}=${val}`)
          }
        }
        queryParams += params.join('&');
        url += queryParams;
      }

      if (this.hasBody) {
        const bodyObject = Object.fromEntries(
          this.fields.filter(field => field.type === 'body').map(field => {
            const { id, value } = field;
            let val = value;
            if (id === 'name' || id === 'city' || id === 'state') {
              val = val.replace(' ', '_').toLowerCase();
            }

            field.value = '';
            return [id, val];
          })
        );

        if (this.isVideoUpload && hasUploadedVideo) {
          const storageRef = ref(storage, this.$store.state.username + '/' + now.toString() + '_' + this.fileContent.name);
          bodyObject.strollVideo = await getDownloadURL(storageRef)
            .then((url) => {
              return url;
              console.log("Successfully downloaded!")
            });
        } else {
          bodyObject.strollVideo = "";
        }

        options.body = JSON.stringify(bodyObject);
      }

      try {
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

        if (this.refreshReviews) {
          this.$store.commit('refreshReviews');
        }

        if (this.refreshStrolls) {
          this.$store.commit('refreshStrolls');
        }

        if (this.refreshCertifiedResidency) {
          this.$store.commit('refreshCertifiedResidency');
        }

        if (this.callback) {
          this.callback();
        }
      } catch (e) {
        // if I am trying to upload a video but there is a server error delete from firebase
        if (this.isVideoUpload && hasUploadedVideo) {
          const deleteRef = ref(storage, this.$store.state.username + '/' + now.toString() + '_' + this.fileContent.name);
          deleteObject(deleteRef).then(() => {
            console.log("file deleted successfully");
          }).catch((error) => {
            console.log('Uh-oh, an error occurred!')
          });
        }
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
