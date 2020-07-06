<template>
  <div class="contact contact__container">
    <div class="container">
      <div class="header">
        <input type="text" placeholder="输入添加项..." v-model="inputVal" />
        <input type="button" value="添加" @click="addItem()" />
        <input
          type="button"
          value="保存"
          @click="saveProject()"
          :disabled="list.length <= 2"
        />
      </div>
      <div class="project-container" v-if="projects.length > 0">
        <div>
          <span
            v-for="(item, i) in projects"
            :key="i"
            @click="openProject(item)"
            :style="{ background: item.color }"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
      <div class="content" v-if="list.length">
        <ul v-for="(item, i) in list" :key="i">
          <li @mouseover="mouseEnter" @mouseleave="mouseLeave">
            {{ item }}<span @click="removeItem(item)">+</span>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="isShowModal" class="naicha__modal">
      <Modal @submit="submit" @close="close"></Modal>
    </div>
  </div>
</template>
<script>
import { isDiffArr } from "../utils/common";
import { saveNaichaProject, getNaichaProject } from "@/api/naicha";
import Modal from "./Modal";
export default {
  components: {
    Modal
  },
  data() {
    return {
      inputVal: "",
      list: [],
      projects: [],
      isShowModal: false
    };
  },
  inject: ["Emittier"],
  watch: {
    list(newval) {
      this.Emittier.$emit("update-list", newval);
    }
  },
  beforeMount() {
    this.initData(
      function(list) {
        this.projects = list;
      }.bind(this)
    );
  },
  methods: {
    async initData(callback) {
      let res = await getNaichaProject();
      let result = [];
      if (res.status === "success") {
        result = res.list;
      }
      callback(result);
    },
    async submit(e) {
      let project = {
        name: e.name,
        list: this.list
      };
      let res = await saveNaichaProject(project);
      if (res.status === "success") {
        this.initData(
          function(list) {
            this.projects = list;
          }.bind(this)
        );
        this.list = [];
      } else {
        console.log(res);
      }
    },
    close() {
      this.isShowModal = false;
    },
    addItem() {
      if (this.list.indexOf(this.inputVal) < 0 && this.inputVal.trim()) {
        this.list.push(this.inputVal);
      }
      this.inputVal = "";
    },
    removeItem(item) {
      if (this.list.indexOf(item) > -1) {
        this.list.splice(this.list.indexOf(item), 1);
      }
    },
    mouseEnter(e) {
      if (e.target) {
        let span = e.target.firstElementChild;
        if (span && span.style) {
          span.style.display = "block";
        }
      }
    },
    mouseLeave(e) {
      if (e.target) {
        let span = e.target.firstElementChild;
        if (span && span.style) {
          span.style.display = "none";
        }
      }
    },
    saveProject() {
      this.isShowModal = true;
    },
    openProject(item) {
      if (isDiffArr(this.list, item.list)) {
        this.list = JSON.parse(JSON.stringify(item.list));
      }
    }
  }
};
</script>
<style scoped>
.contact__container {
  position: relative;
  height: 100%;
  pointer-events: none;
}
.container {
  float: right;
  width: 30%;
  height: 35%;
  padding: 2rem 0.5rem 2rem 0.5rem;
  background: rgba(0, 0, 0, 0.4);
  pointer-events: all;
}
.naicha__modal {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: all;
}
.header {
  width: 100%;
  height: 2.5rem;
}
.header input {
  margin: 0 0.4rem;
  padding: 0.3rem 0.5rem;
  line-height: 1.2rem;
  outline-width: 0;
  min-width: 3.5rem;
  max-height: 2rem;
  vertical-align: middle;
  border: 0;
}
.header input[type="button"]:focus {
  background: #f1e318;
}
.content,
.project-container {
  margin: 0 0.4rem;
  padding: 0rem 2rem;
  max-height: 60%;
  margin-top: 0.2rem;
  overflow: auto;
}
.project-container div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding: 0rem 1rem;
  color: #fff;
}
.project-container div span {
  display: inline-block;
  padding: 0.3rem;
  margin: 0.3rem;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 5px;
  min-width: 2rem;
  cursor: pointer;
}
.content ul {
  margin: 0;
  padding: 0;
  text-align: left;
  list-style-type: none;
}
.content ul li {
  margin: 0 1.3rem;
  padding: 0.2rem 0.5rem;
  line-height: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.4);
}
.content ul li span {
  display: none;
  transform: rotate(45deg);
  float: right;
  font-size: 1.5rem;
  color: #fff;
}
</style>
