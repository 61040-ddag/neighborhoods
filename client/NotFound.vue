<!-- Catch-all page for visiting invalid URLs that haven't been registered -->

<template>
  <main>
    <section>
      <h2>Page Not Found</h2>
      <p>The page that you requested could not be found.</p>
      <h3>
        <router-link to="/" class="routerLink">
          Return to the home page
        </router-link>
      </h3>
    </section>
  </main>
</template>

<style scoped>
.routerLink {
  text-decoration: none;
}
</style>