<!-- <template>
  <main>
    <section>
      <header>
        
      </header>
      <div v-if="$store.state.username">
        <div id="map"></div>

      </div>
    </section>
  </main>
</template>

<script>
import leaflet from 'leaflet';
import {onMounted} from 'vue';

export default {
    name: 'MapPage',
    setup(){
      let map;
      onMounted(() => {
        //init map
        map = leaflet.map('map').setView([28.538336, -81.379234], 10);
        
      // add tile layer
      leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
      })

    },
    data() {
      return {
        
      };
    }
};
</script>

<style>
#map{
  height: 500px;
}
</style> -->

<!-- <template>
  <section>
  <p> Yo ho ho</p>
  <div id="mapContainer" class="basemap"></div>
</section>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "MapPage",
  data() {
    return {
      accessToken: "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiZGRhZyIsImEiOiJjbGF4MGJtNmEwa3k2M29ucDZveXlrYzAwIn0.TbztEorLFsbqFilStlji0g"

    };
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;
    // console.log(this.accessToken);

    new mapboxgl.Map({
      container: "mapContainer",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [103.811279, 1.345399],
      zoom: 12,
      maxBounds: [
        [103.6, 1.1704753],
        [104.1, 1.4754753],
      ],
    });
  },
};
</script>

<style>
.basemap {
  width: 100%;
  height: 100%;
}
</style> -->


<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { mapState } from "vuex";

export default {
  mounted() {
    this.initMap();
  },

  data() {
    return {
      map: null,
      markers: [],
    };
  },