<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Account settings for @{{ $store.state.username }}</h2>
      </header>
      <ChangeUsernameForm 
        button="Change Username" 
      />
      <ChangePasswordForm 
        button="Change Password" 
      />
    </section>
    <section>
      <header>
        <h2>Account management</h2>
      </header>
      <LogoutForm 
        button="Sign Out" 
      />
      <DeleteAccountForm 
        button="Delete Account" 
      />
    </section>
    <section v-if="$store.state.isAdmin">
      <header>
        <h2> Neighborhood Management </h2>
      </header>
      <CreateNeighborhoodForm
      button="Create Neighborhood"
      />
      <DeleteNeighborhoodForm
      button="Delete Neighborhood"
      />
      <UpdateNeighborhoodForm
      button="Update Neighborhood"
      />
    </section>
  </main>
</template>
  
<script>
import ChangeUsernameForm from '@/components/Account/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';
import LogoutForm from '@/components/Account/LogoutForm.vue';
import CreateNeighborhoodForm from '@/components/Account/CreateNeighborhoodForm.vue';
import DeleteNeighborhoodForm from '@/components/Account/DeleteNeighborhoodForm.vue';
import UpdateNeighborhoodForm from '@/components/Account/UpdateNeighborhoodForm.vue';

export default {
  name: 'AccountPage',
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    LogoutForm,
    CreateNeighborhoodForm,
    DeleteNeighborhoodForm,
    UpdateNeighborhoodForm
  }
};
</script>
  