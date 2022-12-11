<!-- Reusable component representing a single review and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->

<template>
    <article
      class="review"
    >
      <header class="author">
        <h3 v-if="isCertified">
          @{{ review.author }}☑️
        </h3>
        <h3 v-else>
          @{{ review.author }}
        </h3>
      </header>
      <p class="rating">
        Rating:
      </p>
      <star-rating 
      v-bind:read-only="true" 
      v-bind:show-rating="false"
      v-bind:star-size="25"
      v-model="review.rating">
      </star-rating>
      <p class="review-text">
        Review:
      </p>
      <p
        class="content"
      >
        {{ review.content }}
      </p>
      <p class="info">
        Posted at {{ review.dateCreated }}
      </p>
      <section>
        <div
          v-if="$store.state.username === review.author"
          class="actions"
        >
          <button @click="deleteReview">
            🗑️ Delete
          </button>
        </div>
      </section>
      <section class="alerts">
        <article
          v-for="(status, alert, index) in alerts"
          :key="index"
          :class="status"
        >
          <p>{{ alert }}</p>
        </article>
      </section>
    </article>
  </template>
  
  <script>
  import StarRating from 'vue-star-rating';
  export default {
    name: 'ReviewComponent',
    props: {
      // Data from the stored review
      review: {
        type: Object,
        required: true
      }
    },
    components: {
      StarRating
    },
    data() {
      return {
        isCertified: false,
        draft: this.review.content, // Potentially-new content for this review
        alerts: {}, // Displays success/error messages encountered during review modification
        rating: 5
      };
    },
    async created() {
      this.checkCertified()
    },
    methods: {
      async checkCertified() {
        const username = this.review.author;
        const neighborhoodId = this.review.neighborhood._id;
        const url = `/api/certifiedResidency/isCertified?user=${username}&neighborhoodId=${neighborhoodId}`;
        const res = await fetch(url).then(async r => r.json());
        this.isCertified = res;
      },
      deleteReview() {
        /**
         * Deletes this review.
         */
        const params = {
          method: 'DELETE',
          callback: () => {
            this.$store.commit('alert', {
              message: 'Successfully deleted review!', status: 'success'
            });
          }
        };
        this.request(params);
      },
      async request(params) {
        /**
         * Submits a request to the review's endpoint
         * @param params - Options for the request
         * @param params.body - Body for the request, if it exists
         * @param params.callback - Function to run if the the request succeeds
         */
        const options = {
          method: params.method, headers: {'Content-Type': 'application/json'}
        };
        if (params.body) {
          options.body = params.body;
        }
  
        try {
          const r = await fetch(`/api/reviews/${this.review._id}`, options);
          if (!r.ok) {
            const res = await r.json();
            throw new Error(res.error);
          }
  
          this.$store.commit('refreshReviews');
  
          params.callback();
        } catch (e) {
          this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  
  .review {
      border:solid 1px lightgray;
      border-style: solid;
      border-radius: 15px;
      margin-bottom: 1em;
      padding: 1em;
      position: relative;
  }
  .actions button {
    background-color: white;
    color: black;
    position: relative;
    border:solid 1px lightgray;
    padding: 0px 10px;
    border-radius: 14px;
    margin-left: 0.25em;
    margin-right: 0.25em;
    font-family: inherit;
    font-size: medium;
    font-weight: bold;
    height: 2em;
  }
  
  .actions button:hover {
    background-color: lightgray;
    color: black;
  }
  .review-text {
    font-weight: bold;
    width: 38em;
    margin-top: 0.5em; 
    margin-bottom: 0px;
  }
  .rating {
    font-weight: bold;
    width: 38em;
    margin-bottom: 0px;
  }
  .content {
    font-weight: bold;
    width: 38em;
    margin-top: 0.5em;
  }
  
  textarea {
      resize: none;
      max-width: 96.5em;
      font-family: inherit;
  }
  </style>