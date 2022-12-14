<template>
  <div class="map-container">
<<<<<<< HEAD
    <div id = "sb" class = "sideBar"> 
      <div  @mouseover="changeColor(neighborhood)" @mouseleave="changeBack(neighborhood)" class = "ntab" v-for="neighborhood in $store.state.neighborhoods" style="box-shadow: 10px;">
      <h4>{{ neighborhood.name }}, {{ neighborhood.city }}, {{ neighborhood.state }} </h4>
      <ul>
        <li> Crime Rate: {{ neighborhood.crimeRate }} </li>
        <li> Average Price: {{ neighborhood.averagePrice }} </li>
        <li> Average Age: {{ neighborhood.averageAge }} </li>
      </ul>
      <button @click="viewNeighborhood(neighborhood)"> Click to view Reviews, strolls, or schedule meeting </button>
      </div>

    </div>
    <div  id = "map" style="width: 70%; margin-left: 30%"> 

    </div>  
=======
    <div id="sb" class="sideBar">
      <div>
        <b-dropdown id="dropdown-1" text="Filter Crime Rate" class="m-md-2" variant="primary">
          <b-dropdown-item @click="sortByCrimeRate(true)">Sort Ascending</b-dropdown-item>
          <b-dropdown-item @click="sortByCrimeRate(false)">Sort Descending</b-dropdown-item>
        </b-dropdown>
      </div>

      <div>
        <b-dropdown id="dropdown-2" text="Filter Average Price" class="m-md-2" variant="primary">
          <b-dropdown-item @click="sortByAveragePrice(true)">Sort Ascending</b-dropdown-item>
          <b-dropdown-item @click="sortByAveragePrice(false)">Sort Descending</b-dropdown-item>
        </b-dropdown>
      </div>

      <div>
        <b-dropdown id="dropdown-3" text="Filter Average Age" class="m-md-2" variant="primary">
          <b-dropdown-item @click="sortByAverageAge(true)">Sort Ascending</b-dropdown-item>
          <b-dropdown-item @click="sortByAverageAge(false)">Sort Descending</b-dropdown-item>
        </b-dropdown>
      </div>

      <div @mouseover="changeColor(neighborhood)" @mouseleave="changeBack(neighborhood)" class="ntab"
        v-for="neighborhood in $store.state.neighborhoods" style="box-shadow: 10px;">
        <h4>{{ neighborhood.name }}, {{ neighborhood.city }}, {{ neighborhood.state }} </h4>
        <ul>
          <li> <b>Crime Rate:</b> {{ neighborhood.crimeRate }} </li>
          <li> <b>Average Price:</b> {{ neighborhood.averagePrice }} </li>
          <li> <b>Average Age:</b> {{ neighborhood.averageAge }} </li>
        </ul>
        <button class="btn btn-primary" @click="viewNeighborhood(neighborhood)"> Click to view Reviews, Strolls, or Schedule a Vibe Check (Meeting) </button>
      </div>
    </div>
    <div id="map" style="width: 70%; margin-left: 30%">

    </div>
>>>>>>> d28b898eabe9bd7f918b098ebc62451d835709bb
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
      alerts: {},
      filter: false,
    };
  },
  methods: {
<<<<<<< HEAD
    changeColor(neighborhood){
      const mapML = document.getElementById("map");
      const markers = [...mapML.childNodes[1].childNodes];
      for(const marker of markers){
        if (marker.id === neighborhood._id){
          console.log(marker);
          marker.style.color="red";
        }
      } 
    },
    changeBack(neighborhood){
      const mapML = document.getElementById("map");
      const markers = [...mapML.childNodes[1].childNodes];
      for(const marker of markers){
        if (marker.id === neighborhood._id){
          console.log(marker);
          marker.style.color="blue";
        }
      } 
=======
    sortByCrimeRate(ascending) {
      function compareAscending(a, b) {
        if (a.crimeRate < b.crimeRate) {
          return -1;
        } else if (a.crimeRate > b.crimeRate) {
          return 1;
        } else {
          return 0;
        }
      }
      function compareDescending(a, b) {
        if (a.crimeRate < b.crimeRate) {
          return 1;
        } else if (a.crimeRate > b.crimeRate) {
          return -1;
        } else {
          return 0;
        }

      }
      if (ascending) {
        this.$store.commit('sortNeighborhoods', compareAscending);
      } else {
        this.$store.commit('sortNeighborhoods', compareDescending);
      }
    },
    sortByAveragePrice(ascending) {
      function compareAscending(a, b) {
        if (a.averagePrice < b.averagePrice) {
          return -1;
        } else if (a.averagePrice > b.averagePrice) {
          return 1;
        } else {
          return 0;
        }
      }
      function compareDescending(a, b) {
        if (a.averagePrice < b.averagePrice) {
          return 1;
        } else if (a.averagePrice > b.averagePrice) {
          return -1;
        } else {
          return 0;
        }

      }
      if (ascending) {
        this.$store.commit('sortNeighborhoods', compareAscending);
      } else {
        this.$store.commit('sortNeighborhoods', compareDescending);
      }
    },
    sortByAverageAge(ascending) {
      function compareAscending(a, b) {
        if (a.averageAge < b.averageAge) {
          return -1;
        } else if (a.averageAge > b.averageAge) {
          return 1;
        } else {
          return 0;
        }
      }
      function compareDescending(a, b) {
        if (a.averageAge < b.averageAge) {
          return 1;
        } else if (a.averageAge > b.averageAge) {
          return -1;
        } else {
          return 0;
        }

      }
      if (ascending) {
        this.$store.commit('sortNeighborhoods', compareAscending);
      } else {
        this.$store.commit('sortNeighborhoods', compareDescending);
      }
    },

    changeColor(neighborhood) {
      const mapML = document.getElementById("map");
      const markers = [...mapML.childNodes[1].childNodes];
      for (const marker of markers) {
        if (marker.id === neighborhood._id) {
          console.log(marker);
          marker.style.color = "red";
        }
      }
    },
    changeBack(neighborhood) {
      const mapML = document.getElementById("map");
      const markers = [...mapML.childNodes[1].childNodes];
      for (const marker of markers) {
        if (marker.id === neighborhood._id) {
          console.log(marker);
          marker.style.color = "blue";
        }
      }
>>>>>>> d28b898eabe9bd7f918b098ebc62451d835709bb
    },
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
        const el = document.createElement("i");
        el.id = nbhood._id;
        el.className = "fa fa-map-marker";
        el.style.fontSize = "40px";
        el.style.color = "blue";
        // const popup = this.featurePopup(i, nbhood.name, nbhood.city, nbhood.state, new Map([["Crime Rate", nbhood.crimeRate], ["Average Price", nbhood.averagePrice], ["Average Age", nbhood.averageAge]]));
        // const marker = new mapboxgl.Marker(el).setLngLat([nbhood.longitude, nbhood.latitude]).setPopup(popup).addTo(this.map);
        const marker = new mapboxgl.Marker(el).setLngLat([nbhood.longitude, nbhood.latitude]).addTo(this.map);
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

      return new mapboxgl.Popup({ offset: 25 }).setDOMContent(card);
    },
    viewNeighborhood(neighborhood) {
      console.log(neighborhood);
      this.$store.commit('setNeighborhood', neighborhood);
      this.$router.push({ name: 'Neighborhood' });
    }

  }

}
</script>

<style>
<<<<<<< HEAD

.sideBar{
  width: 30%;  
  float: left;  
  overflow:auto;
  padding: 10px;
  z-index: 10;
}
.sideBar .ntab {
      border:solid 1px lightgray;
      border-style: solid;
      border-radius: 15px;
      margin-bottom: 1em;
      padding: 1em;
      position: relative;
      transition: 1s ease;
  }

.ntab:hover{
-webkit-transform: scale(1.03);
-ms-transform: scale(1.03);
transform: scale(1.03);
transition: 1s ease;
=======
.sideBar {
  height: 81vh;
  width: 30%;
  float: left;
  overflow-y: scroll;
  padding: 10px;
  z-index: 10;

}

.sideBar .ntab {
  border: solid 1px lightgray;
  border-style: solid;
  border-radius: 15px;
  margin-bottom: 1em;
  padding: 1em;
  position: relative;
  transition: 1s ease;
}

.ntab:hover {
  -webkit-transform: scale(1.03);
  -ms-transform: scale(1.03);
  transform: scale(1.03);
  transition: 1s ease;
>>>>>>> d28b898eabe9bd7f918b098ebc62451d835709bb
}

.map-container {
  position: relative;
  width: 100%;
  overflow-y: hidden;
  margin: 0;
  height: 100%;
}

#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 81vh;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}

.marker-container {
  position: absolute;
  /* overflow: hidden; */
}

#vibe-button {
  display: inline-block;
  margin: 5px;
}

.mapboxgl-ctrl-zoom-in {
  background-image: url(data:image/svg+xml;charset=utf8,<svg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27>%0A%20%20<path%20style%3D%27fill%3A%23ff0000%3B%27%20d%3D%27M%2010%206%20C%209.446%206%209%206.4459904%209%207%20L%209%209%20L%207%209%20C%206.446%209%206%209.446%206%2010%20C%206%2010.554%206.446%2011%207%2011%20L%209%2011%20L%209%2013%20C%209%2013.55401%209.446%2014%2010%2014%20C%2010.554%2014%2011%2013.55401%2011%2013%20L%2011%2011%20L%2013%2011%20C%2013.554%2011%2014%2010.554%2014%2010%20C%2014%209.446%2013.554%209%2013%209%20L%2011%209%20L%2011%207%20C%2011%206.4459904%2010.554%206%2010%206%20z%27%20%2F>%0A<%2Fsvg>%0A) !important;
}

.mapboxgl-ctrl-zoom-out {
  background-image: url(data:image/svg+xml;charset=utf8,<svg%20viewBox%3D%270%200%2020%2020%27%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27>%0A%20%20<path%20style%3D%27fill%3A%23ff0000%3B%27%20d%3D%27m%207%2C9%20c%20-0.554%2C0%20-1%2C0.446%20-1%2C1%200%2C0.554%200.446%2C1%201%2C1%20l%206%2C0%20c%200.554%2C0%201%2C-0.446%201%2C-1%200%2C-0.554%20-0.446%2C-1%20-1%2C-1%20z%27%20%2F>%0A<%2Fsvg>%0A) !important;
}
.filter {
  margin-top: 2%;
  margin-bottom: 2%;
}
</style>