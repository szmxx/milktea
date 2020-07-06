<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
  data() {
    return {
      context: null
    };
  },
  mounted() {
    let canvasEle = this.$refs["canvas"];
    this.context = canvasEle.getContext("2d");
    this.setCanvasSetting();
    // this.drawRectGraphic("fill", 0, 0, 400, 400);
    // this.drawArcGraphic("stroke", true, 150, 100, 50, 20, 30);
    this.drawArcGraphic("stroke", true, 150, 100, 50, 20, 30);
    // this.clearAllCanvas();
  },
  methods: {
    setCanvasSetting() {
      this.$refs["canvas"].width = window.innerWidth;
      this.$refs["canvas"].height = window.innerHeight;
      this.context.fillStyle = "#000";
      this.context.strokeStyle = "rgba(0,0,0,1)";
    },
    setCanvasOpacity(value) {
      // 设置canvas全局透明度
      this.context.globalAlpha = value || 1;
    },
    setCanvasLineStyle(width) {
      this.context.lineWidth = width;
      this.context.lineCap = "";
    },
    getCanvasSetting() {
      let settings = {};
      settings.width = this.$refs["canvas"].width;
      settings.height = this.$refs["canvas"].height;
      return settings;
    },
    clearAllCanvas() {
      const { width, height } = this.getCanvasSetting();
      console.log(width, height);
      this.context.clearRect(0, 0, width, height);
    },
    drawRectGraphic(type, ...setting) {
      switch (type) {
        case "fill":
        default:
          this.context.fillRect(...setting);
          break;
        case "stroke":
          this.context.strokeRect(...setting);
          break;
      }
    },
    drawArcGraphic(type, senier, ...setting) {
      this.context.beginPath();
      if (senier) {
        // 两个控制点+半径
        // this.context.arcTo(x1,y1,x2,y2,radius)
        this.context.arcTo(...setting);
      } else {
        // this.context.arc(x,y,radius,startAngle,endAngle,order)
        this.context.arc(...setting);
      }
      switch (type) {
        case "fill":
        default:
          this.context.fill();
          break;
        case "stroke":
          this.context.stroke();
          break;
      }
      this.context.closePath();
    },
    drawLineGraphic(...settings) {
      // 从当前位置到指定x,y位置
      // this.context.lineTo(x,y);
      this.context.lineTo(...settings);
    },
    movePenPosition(...settings) {
      // 移动笔触到某个位置
      // this.context.moveTo(x,y)
      this.context.moveTo(...settings);
    },
    drawCurveGraphic(type, curveType, ...setting) {
      this.context.beginPath();
      switch (curveType) {
        case "quadratic":
          // 一个控制点+结束点
          // this.context.quadraticCurveTo(cp1x,cp1y,x,y)
          this.context.quadraticCurveTo(...setting);
          break;
        case "bezier":
          // 两个控制点+结束点
          // this.context.quadraticCurveTo(cp1x,cp1y,cp2x,cp2y,x,y)
          this.context.bezierCurveTo(...setting);
          break;
      }
      switch (type) {
        case "fill":
        default:
          this.context.fill();
          break;
        case "stroke":
          this.context.stroke();
          break;
      }
      // 会做一个闭合操作
      this.context.closePath();
    },
    drawGraphicByPath2D() {
      // 建立一个路径对象,可以支持传参，path和svg
      let path1 = new Path2D();
      let path = new Path2D();
      path.rect(0, 0, 100, 200);
      path.moveTo(0, 0);
      path.arc(0, 0, 200, 0, Math.PI * 2, false);
      path.addPath(path1);
      this.context.fill(path);
      this.context.stroke(path1);
    }
  }
};
</script>

<style scoped></style>
