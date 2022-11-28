<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { mapState } from "vuex";
import CreateNeighborhoodForm from "@/components/Neighborhood/CreateNeighborhoodForm.vue";
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
  methods: {
  initMap() {
      let centerLat = 0;
      let centerLong = 0;
      console.log(this.$store.state.neighborhoods);
      const numOfNbhoods = this.$store.state.neighborhoods.length;
      for(const nbhood of this.$store.state.neighborhoods){
        centerLat+=nbhood.latitude;
        centerLong+=nbhood.longitude;
      }
      centerLat = centerLat/numOfNbhoods;
      centerLong = centerLong/numOfNbhoods;
      mapboxgl.accessToken = "pk.eyJ1IjoiZGRhZyIsImEiOiJjbGF4MGJtNmEwa3k2M29ucDZveXlrYzAwIn0.TbztEorLFsbqFilStlji0g";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [centerLong, centerLat],
        zoom: 12,
        // zoom: -5,
      });
      this.map.on("load", () => {
        this.map.addControl(new mapboxgl.NavigationControl(), "top-right");
        this.map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
          }),
          "top-right"
        );
        this.map.addControl(
          new mapboxgl.ScaleControl({
            maxWidth: 100,
            unit: "metric",
          })
        );

        if (this.markers.length > 0) {
          this.resetMarkers();
        }
        if (this.currentFeatures) {
          this.updateMarkers();
        }
      });
      // add markers
      for (const nbhood of this.$store.state.neighborhoods){
        const el = document.createElement("div");
        el.className = "marker";
        const popup = this.featurePopup(nbhood.name, nbhood.city, nbhood.state, new Map([["crime Rate", nbhood.crimeRate], ["Average Price", nbhood.averagePrice], ["Average Age", nbhood.averageAge]]));
        const marker = new mapboxgl.Marker(el).setLngLat([nbhood.longitude, nbhood.latitude]).setPopup(popup).addTo(this.map);
      }

    },
    featurePopup(name, city, state, info) {
      const card = document.createElement("div");
      const p = document.createElement("p");
      p.innerHTML = name+", "+city+", "+state
      card.appendChild(p);
      const ul = document.createElement("ul");
      for (const [key, value] of info){
        console.log(key, value);
        const li = document.createElement("li");
        li.innerHTML=key+": " + value;
        ul.appendChild(li);
      }
      card.append(ul);
      const button = document.createElement("button");
      button.onclick = this.callf;
      button.innerHTML = "View Reviews";
      card.appendChild(button);
      return new mapboxgl.Popup({ offset: 25 }).setDOMContent(card
      );
    },
    callf(){
      // show reviews
    }
  }
  
}

function buttonFunc(){
  console.log("heeee");
}
</script>

<style>
.map-container {
  position: relative;
  width: 100%;
  height: 95vh;
}
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}

.marker-container{ 
  position: absolute;
}

/* 
.marker-container .info-container{
  position: absolute;
  content: "Back Bay";
  background-color: yellow;
  width: 100px;
  height: 100px;
  margin-bottom: 35px;
} */

.marker:before{
  /* content: "Back Bay"; */
  content: "";
  cursor: pointer;
  position: absolute;
  width: 25px;
  height: 25px;
  border: 1px solid #ccc;
  border-radius: 75% 45% 75% 0%;
  background: #3498db;
  bottom: 0;
  transform-origin: 0% 100%;
  transform: rotate(-45deg) scale(1);

}
</style>