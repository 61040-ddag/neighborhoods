<template>
    <div class="outermost-container">
        <main>
            <div class="container outer-container"> 
                <div v-if="$store.state.username" class="header text-center">
                    <header>
                        <h2 class="big-text">Welcome @{{ $store.state.username }}!</h2>
                    </header>
                    <GetNeighborhoodsForm
                        neighborhoodPlaceholder="Search for neighborhood name"
                        cityPlaceholder="Search for city"
                        button="🔎 Find neighborhoods!"
                    />
                </div>
                <div v-else>
                    <img src="../../public/home-page-image.jpg" alt="neighborhoods">
                    <header>
                        <h2 class="welcome">Welcome to <b>Neighborhoods!</b></h2>                
                    </header>
                    <br>
                     <h4>You will have access to </h4>
                     <div class="typed-out"><li>An insider glimpse into the neighborhood through scheduling meeting with residents via <b><u>Vibecheck</u></b></li></div>
                     <div class="typed-out"><li>A chance to checkout other people's <b><u>reviews</u></b> and <b><u>stroll</u></b> videos</li></div>
                     <div class="typed-out"><li>An overall understanding of the neighborhood through <b><u>statistics</u></b> like average price of a home, crime rate, and average age of residents</li></div>
                    
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
.welcome {
    margin-top: 10px;
}
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