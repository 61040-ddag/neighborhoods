<template>
    <div class="outermost-container">
        <main>
            <div class="container outer-container"> 
                <div v-if="$store.state.username" class="header text-center">
                    <header>
                        <h2 class="big-text">Welcome @{{ $store.state.username }}!</h2>
                    </header>
                    <GetNeighborhoodsForm
                        neighborhoodPlaceholder="Opt: Enter neighborhood"
                        cityPlaceholder="Req: Enter city. Ex: Boston"
                        statePlaceholder="Req: Enter state. Ex: MA, NY"
                        button="🔄 Get neighborhood(s)"
                    />
                </div>
                <div v-else>
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
                </div>
            </div>
        </main>
    </div>
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
.header {
    margin: auto;
    text-align: center;
    display: inline;
    margin: auto;
    width: 60%;
    padding: 10px;
    align-items: center;
}

.outer-container {
}

.outermost-container {
    padding-top: 20%;
    border: 3px solid blue;
}

.routerLink {
    text-decoration: none;
}

.big-text {
    font-size: 50px;
}
</style>