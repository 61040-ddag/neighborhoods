<!-- Reusable component representing a form in a block style -->

<template>
    <section>
      <form @submit.prevent="submit">
        <h3>Post Your Review for {{this.$store.state.neighborhood.name}}!</h3>
            <star-rating 
            v-model="rating"
            v-bind:show-rating="false"
            v-bind:star-size="25"
            />
            <textarea 
              placeholder="Leave a review"
              v-model="content"
            />
        <button 
        @submit="submit">
          Review
        </button>
        <section class="alerts">
          <article 
            v-for="(status, alert, index) in alerts" 
            :key="index" 
            :class="status"
          >
            <p>{{ alert }}</p>
          </article>
        </section>
      </form>
    </section>
  </template>
    
<script>
import StarRating from 'vue-star-rating';

export default {
  name: 'ReviewForm',
  components: {
    StarRating
  },
  data() {
    return {
      rating: 0,
      content: "",
      alerts: {}, // Displays success/error messages encountered during form submission
    }
  },
  methods: {
    submit() {
      this.postReview()
    },
    async postReview() {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          neighborhoodId: this.$store.state.neighborhood._id,
          rating: this.rating,
          content: this.content
        }),
        headers: { 'Content-Type': 'application/json' },
        callback: () => {
          const message = `Successfully created a review for ${this.$store.state.neighborhood.name}!`;
          this.$set(this.alerts, message, 'success');
          setTimeout(() => this.$delete(this.alerts, message), 3000);
        }
      };

      // Reset review after posting
      this.rating = 0;
      this.content = '';
      try {
        const r = await fetch('/api/reviews', options);
        if (!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }

        this.$store.commit('refreshReviews');

        options.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>
    
<style scoped>
  form {
    border: solid 1px #ccc;
    border-style: solid;
    border-radius: 8px;
    padding: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 1em;
    position: relative;
  }
  
  article>div {
    display: flex;
    flex-direction: column;
  }
  
  form>article p {
    margin: 0;
  }
  
  form h3,
  form>* {
    margin: 0.3em 0;
  }
  
  form h3 {
    margin-top: 0;
  }
  
  button {
    background-color: grey;
    color: white;
    border: none;
    border-radius: 50px;
    width: fit-content;
    padding: 0px 10px;
    height: 2em;
    font-family: inherit;
    font-size: medium;
    font-weight: bold;
  }
  
  button:hover {
    background-color: #6e6e6e;
  }
  
  textarea {
    border: solid 1px #ccc;
    resize: none;
    font-family: inherit;
    font-size: inherit;
  }
  .review {
    margin-top: 2%;
    margin-bottom: 5%;
  }
  </style>
  