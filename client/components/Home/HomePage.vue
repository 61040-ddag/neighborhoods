<template>
    <main>
        <section v-if="$store.state.username">
            <header>
                <h2>Welcome @{{ $store.state.username }}!</h2>
            </header>
            <GetNeighborhoodsForm
                neighborhoodPlaceholder="Opt: Enter neighborhood"
                cityPlaceholder="Req: Enter city. Ex: Boston"
                statePlaceholder="Req: Enter state. Ex: MA, NY"
                button="🔄 Get neighborhood(s)"
            />
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
                    to find your dream neighborhood and start a family!
                </h3>
            </article>
        </section>
    </main>
</template>

<script>
import GetNeighborhoodsForm from '@/components/Neighborhood/GetNeighborhoodsForm.vue';

export default {
    name: 'HomePage',
    components: {
        GetNeighborhoodsForm
    },
};
</script>

<style scoped>
.routerLink {
    text-decoration: none;
}
</style>