<!-- Reusable component representing a single freet and its actions -->
<!-- We've tagged some elements with classes; consider writing CSS using those classes to style them... -->
  <template>
    <article
      class="freet"
    >
      <header>
        <div class="author">
        <h3>
          {{ stroll.author }}
        </h3>
        </div>
      </header>
      <div class="content">
        <h3> {{stroll.title}}</h3>
        <video ref="videoRef" :src="stroll.strollVideo" id="video-container" width="100%" controls></video>
    </div>
      <p class="info">
        Posted at {{ stroll.dateUploaded }}
      </p>
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
  export default {
    name: 'StrollComponent',
    props: {
      // Data from the stored freet
      stroll: {
        type: Object,
        required: true,
      },
      
    },
    
    data() {
      return {
        alerts: {} // Displays success/error messages encountered during freet modification
      };
    },
    methods: {
      async X(){
        const url = `/api/X`;
        const fields = new Object();
        fields.freetId = this.freet._id;
        const options = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            credentials: 'same-origin',
            body: JSON.stringify(fields),
        };
  
        const r = await fetch(url, options);
        const res = await r.json();
        if(r.ok) {
          this.isXed = true;
        }
      },
      async deleteFreet() {
        const url = `/api/freets/${this.freet._id}`;
          try{
              const r = await fetch(url,{method: 'DELETE'});
              const res = await r.json();
              if(!r.ok) {
                  console.log(res.error);
                  throw new Error(res.error);
                  this.alerts = res.error;
              }
              this.isdeleted = true;
          } catch (e) {
              console.log(e);
              console.log(e.message);
              console.log(typeof e.message);
              this.alerts = e.message;
              console.log(this.alerts);
              setTimeout(() => this.alerts = '', 3000);   
          }
      }
    }
  };
  </script>
  
  <style scoped>
  .author{
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 0.5px solid grey;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .X-container {
    border: 0.5px solid grey;
    border-bottom: none;
    display: flex;
    justify-content: flex-end;
  }
  .X {
    text-align: center;
    width: 2.5%;
  }
  .freet {
      border: 0.5px solid grey;
      padding-top: none;
      position: relative;
      margin: auto;
      margin-bottom: 20px;
      width: 66%;
      height: 600px;
      /* margin-left: 50%; */
      /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
  
  }

  video{
    height: 400px;
  }
  
  .content {
    text-align: center;
  }
  
  img {
    width:100%;
    height: 100%;
  }
  
  .deleteButton{
    height: 50%;
  }
  </style>
  