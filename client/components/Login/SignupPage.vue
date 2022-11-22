<!-- Page for account registration -->
<!-- User should be NOT authenticated in order to see this page -->

<template>
  <main>
    <header class="back">
      <router-link 
        to="/" 
        class="backLink"
      >
        ← Back to Home
      </router-link>
    </header>
    <section>
      <header>
        <h2>Join Neighborhoods Today!</h2>
      </header>
      <RegisterForm button="Create Account" />
      <h4>
        Have an account already?
        <router-link 
          to="/login" 
          class="routerLink"
        >
          Log in!
        </router-link>
      </h4>
    </section>
  </main>
</template>
  
<script>
import RegisterForm from '@/components/Login/RegisterForm.vue';

export default {
  name: 'SignupPage',
  components: {
    RegisterForm,
  }
};
</script>
  
<style scoped>
.back {
  margin-top: 1em;
}

.backLink {
  text-decoration: none;
  color: black;
  margin-top: 1em;
}

.routerLink {
  text-decoration: none;
}
</style>