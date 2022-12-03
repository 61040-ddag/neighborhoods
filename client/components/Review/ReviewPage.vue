<template>
    <main>
        <section>
            <CreateReviewForm 
                button="Review"
            />
        </section>
        <section
            v-if="$store.state.reviews.length"
        >
        <ReviewComponent 
            v-for="review in $store.state.reviews" 
            :key="review.id" 
            :review="review" />
        </section>
        <article
            v-else
            class="text"
        >
            <h3>No reviews found. Be the first to share a review for {{this.$store.state.neighborhood.name}}!</h3>
        </article>
    </main>
</template>

<script>
import ReviewComponent from '@/components/Review/ReviewComponent.vue';
import CreateReviewForm from '@/components/Review/CreateReviewForm.vue';

export default {
    name: 'ReviewPage',
    components: {
        ReviewComponent,
        CreateReviewForm
    }
}

</script>

<style scoped>
.text {
    text-align: center;
}
</style>