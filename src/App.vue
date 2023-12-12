<template>
<div id="app">
  <div class="container">
    <h3>Nautilus RATM BRM Sensors</h3>
      <input type="text" v-model="searchText" @keyup="findElement" id="search" autofocus autocomplete="off" placeholder="GS753" />
      <div class="description" >
        <p v-for="item in searchHandler" :key="item.code">
          {{ item.code }} - {{ item.desc }} 
        </p>
      </div>
      <div class="sensors">
        <sensors />
      </div>
  </div>
</div>
</template>

<script>
import sensors from './components/sensors.vue';
import { sensors_desc } from './data/sensors_description.js';

export default {
  name: 'App',
  
  components: {
    sensors
  },

  data() {
    return {
      searchText: '',
      data: []
    };
  },

  created() {
    this.data = sensors_desc;
    this.searchText = "gs";
  },

  computed: {
    searchHandler(){
      if (this.validateSearchText()) {
        return this.data.filter(elem => { 
          return elem.code.toLowerCase().includes(this.searchText.toLowerCase()); 
          });
      } else {
        return null
      }
    }
  },

  methods: {

    validateSearchText(){
      var st = this.searchText
      var stl = st.length;
      let pattern = /^g[s,l][0-9]+$/i;
      if(stl > 4 && stl < 6 && pattern.test(st)){
        return true;
      } else {
        return false;
      }
    },

    findElement(){
      if(this.validateSearchText()){
        var element = document.querySelector("#" + this.searchText.toLowerCase());
        if(element){
          element.style.fill = "#F80707";
          element.style.stroke = "#F80707";
          element.setAttribute("class", "pulse");
        }
      } else {
        this.resetElementsColor();
      }
    },

    resetElementsColor(){
      const elements = document.querySelectorAll(`[id^="g"]`);
      for(let elem of elements){
        elem.style.fill = "#00ffff";
        elem.style.stroke = "#000000";
        elem.removeAttribute("class");
      }
    }
    
  },

}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.container {
  text-align: center;
}

h3 {
  color: #949494;
}

.container {
  padding: 20px 20px 20px 20px;
}

input {
  font-size: 20px;
  padding: 5px 5px 5px 5px;
  border: none;
  border-bottom: 1px solid #c2c1c1;
}
input:focus { 
  outline:none;
  border-bottom: 1px solid #3a3a3a;
  
}
input::placeholder {
  color: #c2c1c1;
  text-align: center;
}

svg {
  max-width: 210mm;
  max-height: 170mm;
}

.description{
  text-align: center;
  font-size: 12px;
  color: #5f5f5f;
}

.pulse{
  animation: animate_grow 2s infinite;
}

@keyframes animate_grow {
	0% {
		opacity: 1;
	}
	25% {
		opacity: 0.6;
	}
	50% {
		opacity: 0.1;
	}
	75% {
		opacity: 0.6;
	}
	100% {
		opacity: 1;
	}
}
</style>
