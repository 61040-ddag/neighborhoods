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
                    <img src="../Home/suburb-houses-beautiful-sunset-landscape-dusk_107791-9152.jpg" alt="neighborhood">
                    <header>
                        <h2>Welcome to Neighborhoods!</h2>                
                    </header>
                    <br>
                     <h4>You will have access to </h4>
                     <div class="typed-out"><li>An insider glimpse into the neighborhood through scheduling meeting with residents via <b><u>Vibecheck</u></b></li></div>
                     <div class="typed-out"><li>A chance to checkout other people's reviews and stroll videos</li></div>
                     <div class="typed-out"><li>An overall understand of the neighborhood through statistics like crime rate</li></div>
                    
                     <br>
                    <article>
                        <h3>
                            <router-link to="/login" class="routerLink">
                                Log in/Sign Up
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

.outermost-container {
    padding-top: 5%;
}

.routerLink {
    text-decoration: none;
}

.big-text {
    font-size: 50px;
}

img{
    width: 100%;
    height: auto;
}

.typed-out{
  overflow: hidden;
  white-space: nowrap;
  font-size: 1.6rem;
  width: 0;
  animation: 
    typing 1s steps(40, end) forwards;
}
@keyframes typing {
      from { width: 0 }
      to { width: 100% }
    }
</style>