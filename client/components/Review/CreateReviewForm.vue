<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
    name: 'CreateReviewForm',
    mixins: [BlockForm],
    data() {
        return {
            url: '/api/reviews',
            method: 'POST',
            hasBody: true,
            fields: [
                { id: 'locationId', type: 'body', value: this.$store.state.neighborhood._id },
                { id: 'rating', type: 'body', label: 'Enter rating out of 10', value: '' },
                { id: 'content', type: 'body', label: 'Write a review', value: '' }
            ],
            title: `Post Your Review for ${this.$store.state.neighborhood.name}!`,
            refreshReviews: true,
            callback: () => {
                const message = 'Successfully created a review!';
                this.$set(this.alerts, message, 'success');
                setTimeout(() => this.$delete(this.alerts, message), 3000);
            }
        };
    }
};
</script>