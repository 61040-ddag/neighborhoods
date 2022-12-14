<!-- Page for account sign-in -->
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
        <h2>Sign in to Neighborhoods!</h2>
      </header>
      <LoginForm button="Sign In" />
      <h4>
        Don't have an account?
        <router-link 
          to="/signup" 
          class="routerLink"
        >
          Sign up!
        </router-link>
      </h4>
    </section>
  </main>
</template>
  
<script>
import LoginForm from '@/components/Login/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: {
    LoginForm
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
  font-weight: bold;
  font-size: 25px;
  margin-top: 1em;
  margin-top: 2%;
  margin-bottom: 2%;
}

.routerLink {
  text-decoration: none;
}
</style>
  