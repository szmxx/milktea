<template>
  <div id="app">
    <!-- <Template msg="Welcome to Your Vue.js App" /> -->
    <div class="milk-tea-container">
      <Naicha></Naicha>
    </div>
    <div class="contact-container">
      <Contact></Contact>
    </div>
  </div>
</template>

<script>
// import Template from "./components/Template.vue";
import Naicha from "./components/Naicha";
import Contact from "./components/ContactMT";
import Vue from "vue";
export default {
  name: "App",
  data() {
    return {
      Emittier: new Vue()
    };
  },
  provide() {
    return {
      Emittier: this.Emittier
    };
  },
  components: {
    // Template,
    Naicha,
    Contact
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
.milk-tea-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.contact-container {
  width: 100%;
  height: 100%;
}
</style>
