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
      alerts: {}
    };
  },
  methods: {
    initMap() {
      let centerLat = 0;
      let centerLong = 0;

      const numOfNbhoods = this.$store.state.neighborhoods.length;
      for (const nbhood of this.$store.state.neighborhoods) {
        centerLat += nbhood.latitude;
        centerLong += nbhood.longitude;
      }
      centerLat = centerLat / numOfNbhoods;
      centerLong = centerLong / numOfNbhoods;
      mapboxgl.accessToken = "pk.eyJ1IjoiZGRhZyIsImEiOiJjbGF4MGJtNmEwa3k2M29ucDZveXlrYzAwIn0.TbztEorLFsbqFilStlji0g";
      this.map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [centerLong, centerLat],
        zoom: 12,
      });
      this.map.on("load", () => {
        this.map.addControl(new mapboxgl.NavigationControl({
          showCompass: false,
          showZoom: true
        }));

        if (this.markers.length > 0) {
          this.resetMarkers();
        }
        if (this.currentFeatures) {
          this.updateMarkers();
        }
      });
      // add markers

      for (let i = 0; i < this.$store.state.neighborhoods.length; i++) {
        const nbhood = this.$store.state.neighborhoods[i];
        const el = document.createElement("div");
        el.className = "marker";
        const popup = this.featurePopup(i, nbhood.name, nbhood.city, nbhood.state, new Map([["Crime Rate", nbhood.crimeRate], ["Average Price", nbhood.averagePrice], ["Average Age", nbhood.averageAge]]));
        const marker = new mapboxgl.Marker(el).setLngLat([nbhood.longitude, nbhood.latitude]).setPopup(popup).addTo(this.map);
      }
    },
    featurePopup(index, name, city, state, info) {
      const card = document.createElement("div");
      card.setAttribute("id", "styled-div-parent");
      const p = document.createElement("p");
      p.innerHTML = name + ", " + city + ", " + state
      card.appendChild(p);
      const ul = document.createElement("ul");
      for (const [key, value] of info) {
        const li = document.createElement("li");
        li.innerHTML = key + ": " + value;
        ul.appendChild(li);
      }
      card.append(ul);

      const newDiv = document.createElement("div");
      newDiv.setAttribute("id", "styled-div");
      card.append(newDiv);

      const button = document.createElement("button");

      button.index = index;
      button.addEventListener('click', this.viewNeighborhood);
      button.innerHTML = "View Neighborhood";
      button.setAttribute("id", "neighborhood-button");
      button.classList.add('btn');
      button.classList.add('btn-primary');
      newDiv.appendChild(button);


      button.setAttribute("id", "neighborhood-button");
      newDiv.appendChild(button);
      const vibeButton = document.createElement("button");
      vibeButton.onclick = this.showVibePage;
      vibeButton.innerHTML = "Vibe Check";
      vibeButton.setAttribute("id", "vibe-button")
      newDiv.appendChild(vibeButton);

      return new mapboxgl.Popup({ offset: 25 }).setDOMContent(card);
    },
    viewNeighborhood(e) {
      const neighborhood = this.$store.state.neighborhoods[e.target.index];
      this.$store.commit('setNeighborhood', neighborhood);

      this.$router.push({ name: 'Neighborhood' });
    },
    showVibePage() {
      this.$router.push({ name: "Vibe" });
    }
  }

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

.marker-container {
  position: absolute;
}

#vibe-button {
  display: inline-block;
  margin: 5px;
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

.marker:before {
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

.mapboxgl-ctrl-zoom-in {
  background-image: url(data:image/svg+xml;charset=utf8,<svg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27>%0A%20%20<path%20style%3D%27fill%3A%23ff0000%3B%27%20d%3D%27M%2010%206%20C%209.446%206%209%206.4459904%209%207%20L%209%209%20L%207%209%20C%206.446%209%206%209.446%206%2010%20C%206%2010.554%206.446%2011%207%2011%20L%209%2011%20L%209%2013%20C%209%2013.55401%209.446%2014%2010%2014%20C%2010.554%2014%2011%2013.55401%2011%2013%20L%2011%2011%20L%2013%2011%20C%2013.554%2011%2014%2010.554%2014%2010%20C%2014%209.446%2013.554%209%2013%209%20L%2011%209%20L%2011%207%20C%2011%206.4459904%2010.554%206%2010%206%20z%27%20%2F>%0A<%2Fsvg>%0A) !important;
}

.mapboxgl-ctrl-zoom-out {
  background-image: url(data:image/svg+xml;charset=utf8,<svg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27>%0A%20%20<path%20style%3D%27fill%3A%23ff0000%3B%27%20d%3D%27m%207%2C9%20c%20-0.554%2C0%20-1%2C0.446%20-1%2C1%200%2C0.554%200.446%2C1%201%2C1%20l%206%2C0%20c%200.554%2C0%201%2C-0.446%201%2C-1%200%2C-0.554%20-0.446%2C-1%20-1%2C-1%20z%27%20%2F>%0A<%2Fsvg>%0A) !important;
}
</style>