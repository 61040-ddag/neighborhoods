<!-- Reusable component representing a form in a block style -->

<template>
    <form @submit.prevent="submit">
      <h3>Post Your Review for Back Bay!</h3>
          <star-rating 
          v-model="rating"
          v-bind:show-rating="false"
          />
          <br />
          <textarea 
            placeholder="Leave a review"
            v-model="review"
          />
      <button 
      @submit="submit">
        Review
      </button>
    </form>
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
            review: ""
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
                    content: this.review
                }),
                headers: { 'Content-Type': 'application/json' }
            };
            try {
                const r = await fetch('/api/reviews', options);
                const response = await r.json();
                if (!r.ok) {
                    throw new Error(response.error);
                }
                console.log(response);

                // refresh page
                window.location.reload();
                } catch (e) {
                    console.error(`Error: ${e}`);
                    throw new Error(err.message);
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
  </style>
  