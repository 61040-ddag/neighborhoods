<script>

export default {
  data() {
    return {
      message: 'Hello World!'
    }
  }
}
</script>

<template>
  <div class="customContainer container row col-md-8 mx-auto">
    <h1 class="h1 text-center">Welcome to VibeCheck!</h1>
    <button 
    class="styledButton" 
    onclick="
    window.open('https://mit.zoom.us/s/91389409521','_blank');
    ">
    Launch Meeting
  </button>
  </div>
  
</template>

<style>

.customContainer {
  margin-top: 5%;
}

.styledButton {
  background: #0e72ed;
  border-radius: 12px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  line-height: 32px;
  margin-top: 40px;
  padding: 8px 40px;
  text-align: center;
}

</style>