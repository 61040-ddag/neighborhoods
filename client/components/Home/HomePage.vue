<template>
    <main>
        <section v-if="$store.state.username">
            <header>
                <h2>Welcome @{{ $store.state.username }}!</h2>
            </header>
        </section>
        <section v-else>
            <header>
                <h2>Welcome to Neighborhoods!</h2>                
            </header>
            <article>
                <h3>
                    <router-link to="/login" class="routerLink">
                        Log in
                    </router-link>
                    to participate!
                </h3>
            </article>
        </section>
    </main>
</template>

<script>


export default {
    name: 'HomePage',
    components: {

    }
};
</script>

<style scoped>
.routerLink {
    text-decoration: none;
}
</style>