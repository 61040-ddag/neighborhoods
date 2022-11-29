<script>

const domain = 'meet.jit.si';
const options = {
    roomName: 'Neighborhood meeting',
    width: 700,
    height: 700,
    parentNode: document.querySelector('#meet')
};
const api = new JitsiMeetExternalAPI(domain, options);

export default {
  data() {
    return {
      message: 'Hello World!'
    }
  }
}
</script>

<template>
  <h1>{{ message }}</h1>
</template>