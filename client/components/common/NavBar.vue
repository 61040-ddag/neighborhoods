<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
    <nav>
        <div class="left">
            <img src="../../public/logo.svg">
            <h1 class="title">
                Neighborhoods
            </h1>
        </div>
        <div class="right">
            <button>
                <router-link 
                    to="/" 
                    class="link"
                >
                    🏠 Home
                </router-link>
            </button>
            <button v-if="$store.state.isAdmin">
                <router-link
                    to="/neighborhoods"
                    class="link"
                >
                    🏘️ Neighborhoods
                </router-link>
            </button>
            <button v-if="$store.state.username">
                <router-link 
                    to="/account" 
                    class="link"
                >
                    🔒 Account
                </router-link>
            </button>
            <button v-else>
                <router-link 
                    to="/login" 
                    class="link"
                >
                    🔓 Login
                </router-link>
            </button>
        </div>
        <section class="alerts">
            <article 
                v-for="(status, alert, index) in $store.state.alerts" 
                :key="index" 
                :class="status"
            >
                <p>{{ alert }}</p>
            </article>
        </section>
    </nav>
</template>

<style scoped>
nav {
    padding: 1vw 2vw;
    background-color: grey;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index:100;
}

.title {
    font-size: 32px;
    margin: 0 5px;
}

img {
    height: 34px;
}

.left {
	display: flex;
	align-items: normal;
}

.right {
    font-size: 20px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    align-items: center;
}

.right a {
    margin-left: 5px;
}

.alerts {
    width: 25%;
}
button {
  background-color: white;
  padding: 0px 10px;
  border-radius: 20px;
  border: 2px solid grey;
}
button:hover {
  background-color: lightgray;
  color: black;
}
.link {
  font-size: large;
  color: black;
  text-decoration: none;
}
</style>
