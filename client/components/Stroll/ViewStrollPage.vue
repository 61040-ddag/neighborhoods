<!-- page that also displays strolls -->

<template>
    <main>
        <section
          v-if="$store.state.strolls.length"
        >
          <StrollComponent
            v-for="stroll in $store.state.strolls"
            :key="stroll.id"
            :stroll="stroll"
          />
        </section>
        <article
          v-else
        >
          <h3>No strolls found.</h3>
        </article>
    </main>
  </template>
  
  <script>
  import { initializeApp } from "firebase/app";
  import { getStorage, ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";
  import StrollComponent from '@/components/Stroll/StrollComponent.vue';
  
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
    name: 'ViewStrollPage',
    components: {StrollComponent},
    // mounted() {
    //   this.$refs.getFreetsForm.submit();
    // },
    methods: {
        async loadFile(stroll){            
            const lRef = ref(storage, stroll.strollVideo);
            const result = await getDownloadURL(lRef)
            .then((url) => {
                return url;
                console.log("successfullt downloaded")
            })
            console.log(result);
            return result;
        }
    },
  };
  </script>
  
  <style scoped>
  section {
    display: flex;
    flex-direction: column;
  }
  
  header, header > * {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  
  button {
      margin-right: 10px;
  }
  
  section .scrollbox {
    flex: 1 0 50vh;
    padding: 3%;
    overflow-y: scroll;
  }
  </style>
  