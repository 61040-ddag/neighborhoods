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
    <section>
      <AddCertifiedResidencyForm
        button="Add Residency"/>
    </section>
    <section>
      <DeleteCertifiedResidencyForm 
        button="Delete Residency"/>
    </section>
  </main>
</template>
  
<script>
import ChangeUsernameForm from '@/components/Account/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';
import LogoutForm from '@/components/Account/LogoutForm.vue';
import AddCertifiedResidencyForm from '@/components/Account/AddCertifiedResidencyForm.vue';
import DeleteCertifiedResidencyForm from '@/components/Account/DeleteCertifiedResidencyForm.vue';

export default {
  name: 'AccountPage',
  components: {
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    LogoutForm,
    AddCertifiedResidencyForm,
    DeleteCertifiedResidencyForm
  }
};
</script>
  