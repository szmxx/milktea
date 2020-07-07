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
      <div class="content">
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
        <div class="content-container" v-if="list.length">
          <ul v-for="(item, i) in list" :key="i">
            <li @mouseover="mouseEnter" @mouseleave="mouseLeave">
              {{ item }}<span @click="removeItem(item)">+</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="isShowModal" class="naicha__modal">
      <Modal @submit="submitlocal" @close="close"></Modal>
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
      projects: [
        {
          name: "演讲",
          color: "#FFADAD",
          list: [
            "黄震",
            "刘周玮",
            "刘俊",
            "李恒",
            "王振洲",
            "何慧婷",
            "倪志航",
            "魏聪"
          ]
        }
      ],
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
    // this.initData(
    //   function(list) {
    //     this.projects = list;
    //   }.bind(this)
    // );
  },
  methods: {
    // 接口暂时不用
    async initData(callback) {
      let res = await getNaichaProject();
      let result = [];
      if (res.status === "success") {
        result = res.list;
      }
      callback(result);
    },
    // 接口暂时不用
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
    submitlocal(e) {
      let project = {
        name: e.name,
        list: this.list
      };
      this.projects.push(project);
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
  width: 25%;
  height: 45%;
  padding: 1rem 0.5rem 0.5rem 0.5rem;
  background-image: linear-gradient(-60deg, #e0c3fc98 0%, #8ec5fc8f 100%);
  pointer-events: all;
  border-radius: 1rem;
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
  height: 3rem;
  line-height: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 1rem;
}
.header input {
  padding: 0.3rem 0.5rem;
  outline-width: 0;
  border: 0;
  line-height: 1rem;
  margin-right: 1rem;
}
.header input[type="text"] {
  width: 60%;
}
.header input[type="button"] {
  /* margin: 0 1rem; */
  border-radius: 0.3rem;
  background: rgb(249, 247, 232);
}
.header input[type="button"]:focus {
  background: #8ec5fc;
}
.content {
  height: calc(100% - 3rem);
  overflow-y: scroll;
  overflow-x: scroll;
  padding: 0 0.5rem 0 1rem;
}
.project-container div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  color: #fff;
  margin: 0 0 0.5rem 0;
}
.project-container div span {
  display: inline-block;
  padding: 0.3rem;
  border-radius: 5px;
  min-width: 3rem;
  cursor: pointer;
}
.content-container ul {
  margin: 0;
  padding: 0;
  text-align: left;
  list-style-type: none;
}
.content-container ul li {
  padding: 0.2rem 0.5rem;
  line-height: 2rem;
  border-top: 1px solid #e0c3fc98;
  background: rgba(0, 0, 0, 0.1);
  color: #fff;
}
.content-container ul li span {
  display: none;
  transform: rotate(45deg);
  float: right;
  font-size: 1.5rem;
}
</style>
