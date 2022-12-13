<!-- page that also displays strolls -->

<template>
  <main>
    <section>
      <CreateStrollForm button="Upload Stroll" />
    </section>
    <section v-if="$store.state.strolls.length">
      <StrollComponent v-for="stroll in $store.state.strolls" :key="stroll.id" :stroll="stroll" />
    </section>
    <article v-else>
      <h3>No strolls found. Be the first to upload a stroll for {{ this.$store.state.neighborhood.name }}!</h3>
    </article>
  </main>
</template>
  
<script>
import StrollComponent from '@/components/Stroll/StrollComponent.vue';
import CreateStrollForm from '@/components/Stroll/CreateStrollForm.vue';

export default {
  name: 'StrollPage',
  components: {
    StrollComponent, 
    CreateStrollForm
  }
};
</script>

<style>
.review {
  margin-top: 2%;
  margin-bottom: 5%;
}
</style>
  