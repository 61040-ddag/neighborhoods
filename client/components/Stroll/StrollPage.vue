<!-- page that also displays strolls -->

<template>
  <main>
    <section>
      <b-button v-b-modal.modal-center-2 class="btn btn-primary stroll">Post a Stroll!</b-button>
        <b-modal id="modal-center-2" hide-footer centered title="Post a Stroll!">
          <CreateStrollForm button="Upload Stroll" />
        </b-modal>
      <!-- <CreateStrollForm button="Upload Stroll" /> -->
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
.stroll {
  margin-top: 2%;
  margin-bottom: 5%;
}
</style>
  