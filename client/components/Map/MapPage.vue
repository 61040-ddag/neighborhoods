<template>
  <section>
    <div v-if="$store.state.username">
      <input
          class="searchInput"
          v-model="search_tag"
          placeholder="Search topic..."
      >
      <!-- <button @click="search()">Search</button> -->
      <button v-if="$store.state.username" @click="search">
       Search
    </button>
    </div>
  </section>
</template>



<script>
export default {
    name: 'SearchComponent',
    data() {
      return {
        
      };
      method:{
        async search(){
          const url = `/api/neighborhoods/:`
        }
      }
</script>