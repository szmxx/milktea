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
  background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}

::-webkit-scrollbar {
  width: 5px;
  height: 6px;
  background-color: transparent;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  width: 0;
  border-radius: 0;
  background-color: transparent;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  width: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #e7ecf2;
}
/*滑块效果*/
::-webkit-scrollbar-thumb:hover {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.4);
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
