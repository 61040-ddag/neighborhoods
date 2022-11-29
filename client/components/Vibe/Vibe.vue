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
    <iframe src="https://calendar.google.com/calendar/embed?src=vibecheckbot1%40gmail.com&ctz=America%2FNew_York" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
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
  padding-bottom: 10%;
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