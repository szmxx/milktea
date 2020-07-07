<template>
  <div class="mt-container">
    <canvas ref="bg-canvas" class="bg-canvas"></canvas>
    <canvas ref="pt-canvas" class="pt-canvas" @click="autoPlay"></canvas>
    <div class="mt-operate-container">
      <button @click="start">开始</button>
      <button @click="pause">暂停</button>
    </div>
  </div>
</template>

<script>
import {
  getRandomNum,
  getRandomAngle,
  getAnimationByType
} from "../utils/common";
const colorlist = [
  "#FFADAD",
  "#FFD6A5",
  "#FDFFB6",
  "#CAFFBF",
  "#9BF6FF",
  "#BDB2FF",
  "#FFC6FF",
  "#FFFFFC"
];
export default {
  data() {
    return {
      bgCtx: null, // 背景绘制上下文
      ptCtx: null, // 指针绘制上下文
      list: [
        "黄震",
        "刘周玮",
        "刘俊",
        "李恒",
        "王振洲",
        "何慧婷",
        "倪志航",
        "魏聪"
      ],
      timeout: null
    };
  },
  inject: ["Emittier"],
  mounted() {
    let bgCanvasEle = this.$refs["bg-canvas"];
    let ptCanvasEle = this.$refs["pt-canvas"];
    this.setCanvasSetting(bgCanvasEle);
    this.setCanvasSetting(ptCanvasEle);
    this.bgCtx = bgCanvasEle.getContext("2d");
    this.ptCtx = ptCanvasEle.getContext("2d");
    this.setStrokeStyle();
    this.setFontSetting();
    this.setFillStyle();
    this.setLineSetting();
    this.drawMilkTeaPanel();
    this.drawMilkTeaPie(this.list.length);
    this.drawMilkTeaPointer(getRandomAngle());
    this.Emittier.$on("update-list", this.reset);
    // this.drawTestGrapgic();
  },
  destroyed() {
    this.Emittier.$off("update-list", this.reset);
  },
  methods: {
    // 重置转盘
    reset(list) {
      this.list = list;
      this.bgCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.drawMilkTeaPanel();
      this.drawMilkTeaPie(this.list.length);
      this.drawMilkTeaPointer(getRandomAngle());
    },
    drawTestGrapgic() {
      // 遮盖和裁剪图形
      // this.bgCtx.globalCompositeOperation = "source-in";
      // this.bgCtx.globalCompositeOperation = "source-out";
      // this.bgCtx.globalCompositeOperation = "source-over";
      // this.bgCtx.globalCompositeOperation = "source-atop";
      // this.bgCtx.globalCompositeOperation = "destination-over";
      // this.bgCtx.globalCompositeOperation = "destination-in";
      // this.bgCtx.globalCompositeOperation = "destination-out";
      // this.bgCtx.globalCompositeOperation = "destination-atop";
      // this.bgCtx.globalCompositeOperation = "lighter";
      // this.bgCtx.globalCompositeOperation = "copy";
      // this.bgCtx.globalCompositeOperation = "xor";
      // this.bgCtx.globalCompositeOperation = "multiply";
      // this.bgCtx.globalCompositeOperation = "screen";
      // this.bgCtx.globalCompositeOperation = "overlay";
      // this.bgCtx.globalCompositeOperation = "darken";
      // this.bgCtx.globalCompositeOperation = "lighten";
      // this.bgCtx.globalCompositeOperation = "color-dodge";
      // this.bgCtx.globalCompositeOperation = "color-burn";
      // this.bgCtx.globalCompositeOperation = "hard-light";
      // this.bgCtx.globalCompositeOperation = "soft-light";
      // this.bgCtx.globalCompositeOperation = "difference";
      // this.bgCtx.globalCompositeOperation = "exclusion";
      // this.bgCtx.globalCompositeOperation = "hue";
      // this.bgCtx.globalCompositeOperation = "saturation";
      // this.bgCtx.globalCompositeOperation = "color";
      // this.bgCtx.globalCompositeOperation = "luminosity";
      this.bgCtx.moveTo(50, 50);
      this.bgCtx.beginPath();
      this.bgCtx.arc(100, 100, 50, 0, Math.PI * 2, false);
      // 只有在裁剪区域的才可见
      this.bgCtx.clip();
      this.bgCtx.beginPath();
      this.setFillStyle("#ff0000");
      this.bgCtx.arc(100, 100, 50, 0, Math.PI * 2, false);
      this.bgCtx.fill();
      this.bgCtx.closePath();
      this.bgCtx.beginPath();
      this.setFillStyle("#00ff00");
      this.bgCtx.arc(130, 160, 50, 0, Math.PI * 2, false);
      this.bgCtx.fill();
      this.bgCtx.closePath();
      this.bgCtx.beginPath();
      this.setFillStyle("#0000ff");
      this.bgCtx.arc(160, 110, 50, 0, Math.PI * 2, false);
      this.bgCtx.fill();
    },
    start() {
      let options = {
          time: 0,
          begin: 0,
          end: getRandomNum(3000, 4000),
          duration: (4000, 6000),
          type: "ease-in-out",
          callback: callback
        },
        that = this;
      function callback(value) {
        let angle = ((Math.PI * 2) / 360) * value;
        that.drawMilkTeaPointer(angle);
      }
      this.play(options);
    },
    pause() {
      if (this.timeout) {
        clearInterval(this.timeout);
        this.timeout = null;
      }
    },
    autoPlay() {
      const { x, y } = this.getCanvasCenter();
      this.bgCtx.moveTo(x, y);
      let options = {
          time: 0,
          begin: 0,
          type: "ease-in-out",
          end: getRandomNum(3000, 4000),
          duration: getRandomNum(4000, 6000),
          callback: callback
        },
        that = this;
      function callback(value) {
        that.$refs["bg-canvas"].style.transform = `rotate(${value}deg)`;
      }
      this.play(options);
    },
    setFontSetting() {
      this.bgCtx.font = "20px serif";
    },
    setLineSetting(lineWidth = 10) {
      this.bgCtx.lineWidth = lineWidth;
    },
    setFillStyle(color = "#000", context) {
      if (!context) {
        this.bgCtx.fillStyle = color;
      } else {
        context.fillStyle = color;
      }
    },
    setStrokeStyle(color = "#000") {
      this.bgCtx.strokeStyle = color;
      this.bgCtx.strokeWidth = 1;
    },
    // 绘制整体奶茶盘
    drawMilkTeaPanel() {
      this.bgCtx.beginPath();
      let radius = 200;
      const { x, y } = this.getCanvasCenter();
      let gradient = this.bgCtx.createRadialGradient(x, y, 200, x, y, 201);
      gradient.addColorStop(0, "#e0c3fc");
      gradient.addColorStop(1, "#8ec5fc");
      this.setStrokeStyle(gradient);
      this.bgCtx.arc(x, y, radius, 0, Math.PI * 2, false);
      this.bgCtx.stroke();
      this.bgCtx.closePath();
    },
    // 绘制奶茶盘的每个分块
    drawMilkTeaPie(pieNum = 6) {
      const { x, y } = this.getCanvasCenter();
      let angle = (Math.PI * 2) / pieNum;
      let radius = 200;
      for (let i = 0; i < pieNum; i++) {
        this.bgCtx.beginPath();
        let color = colorlist[i];
        this.setFillStyle(color);
        // true 逆时针，默认false
        this.bgCtx.arc(x, y, radius, angle * i, angle * (i + 1), false);
        this.bgCtx.lineTo(x, y);
        this.bgCtx.fill();
        this.bgCtx.closePath();
        this.bgCtx.beginPath();
        this.bgCtx.save();
        // 绘制引导线和文本
        this.setLineSetting(1);
        this.setCanvasTextSetting();
        let textY = Number(
          Math.round(Math.sin(angle / 2 + angle * i) * radius).toFixed(0)
        );
        let textX = Number(
          Math.round(Math.cos(angle / 2 + angle * i) * radius).toFixed(0)
        );
        this.bgCtx.translate(x + textX, y + textY);
        // 移到表面
        this.bgCtx.moveTo(0, 0);
        // 第一段引导线
        this.bgCtx.lineTo(Math.floor(textX * 0.1), Math.floor(textY * 0.1));
        // 原点移到第一段引导线末端
        this.bgCtx.translate(Math.floor(textX * 0.1), Math.floor(textY * 0.1));
        // 顺时针旋转30度
        this.bgCtx.rotate(Math.PI / 6);
        // 绘制第二段引导线
        this.bgCtx.lineTo(Math.floor(textX * 0.1), Math.floor(textY * 0.1));
        this.bgCtx.stroke();
        // 原点移到第二段引导线末端
        this.bgCtx.translate(
          Math.floor(textX * 0.15),
          Math.floor(textY * 0.15)
        );
        // 逆时针旋转30度，使得文本不会倾斜
        this.bgCtx.rotate(-Math.PI / 6);
        this.setFillStyle("#000");
        // 绘制文本
        this.bgCtx.fillText(
          this.list[i],
          Math.floor(textX * 0.05),
          Math.floor(textY * 0.05)
        );
        this.bgCtx.closePath();
        this.bgCtx.restore();
      }
    },
    drawMilkTeaGuideLine() {},
    drawMilkTeaText() {},
    // 绘制奶茶指针
    drawMilkTeaPointer(angle = 0) {
      const { x, y } = this.getCanvasCenter(this.ptCtx);
      let radius = 150;
      let gradient = this.ptCtx.createLinearGradient(0, 0, radius * 0.9, 0);
      gradient.addColorStop(0, "#e0c3fc");
      gradient.addColorStop(1, "#8ec5fc");
      this.setFillStyle(gradient, this.ptCtx);
      this.ptCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      this.ptCtx.save();
      this.ptCtx.translate(x, y);
      this.ptCtx.rotate(angle);
      this.ptCtx.beginPath();
      this.ptCtx.lineTo(radius * 0.8, 15);
      this.ptCtx.lineTo(radius * 0.9, 0);
      this.ptCtx.lineTo(radius * 0.8, -15);
      this.ptCtx.lineTo(0, 0);
      this.ptCtx.fill();
      this.ptCtx.closePath();
      this.ptCtx.restore();
    },
    setCanvasSetting(canvasEle) {
      canvasEle.width = window.innerWidth;
      canvasEle.height = window.innerHeight;
    },
    setCanvasTextSetting() {
      this.bgCtx.textAlign = "center";
      this.bgCtx.textBaseline = "middle";
    },
    getCanvasCenter() {
      let x = window.innerWidth / 2;
      let y = window.innerHeight / 2;
      return { x: x, y: y };
    },
    play(options) {
      return new Promise(resolve => {
        let { time, begin, end, duration, type, callback } = options;
        let durNums = Math.ceil(duration / 16.7);
        if (!window.requestAnimationFrame) {
          window.requestAnimationFrame = function(fn) {
            setTimeout(fn, 16.7);
          };
        }
        function step() {
          const value = getAnimationByType(type)(time, begin, end, durNums);
          callback(value);
          time++;
          if (time <= durNums) {
            window.requestAnimationFrame(step);
          } else {
            resolve();
          }
        }
        step();
      });
    }
  }
};
</script>

<style scoped>
.mt-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.mt-operate-container {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  bottom: 10%;
}
.mt-operate-container button {
  margin: 10px;
  padding: 5px 20px;
  outline-width: 0;
  border: 0;
  line-height: 1rem;
  margin-right: 1rem;
  border-radius: 0.3rem;
  background: rgb(249, 247, 232);
}
.bg-canvas,
.pt-canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
