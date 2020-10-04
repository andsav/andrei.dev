<template>
  <div class="canvas-wrapper">
    <canvas ref="c" @mousemove="mousemove" @mouseout="mouseout"></canvas>
    <slot></slot>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import hover from "../../mixins/hover.vue";
import { provide, reactive, readonly } from "vue";

export default {
  name: "Canvas",
  mixins: [hover],
  props: {
    getNearestPoint: {
      type: Function,
    },
  },
  setup() {
    const canvas = reactive({
      context: null,
      width: 0,
      height: 0,
      points: [],
    });
    const mouse = reactive({
      x: -1,
      y: -1,
    });

    provide("canvas", readonly(canvas));
    // provide("mouse", readonly(mouse));

    provide("decayPoints", () => {
      canvas.points.forEach((_, i) => {
        canvas.points[i].life--;
      });
      canvas.points = canvas.points.filter(({ life }) => life > 0);
    });

    return {
      canvas,
      mouse,
    };
  },
  mounted() {
    this.canvas.context = this.$refs["c"].getContext("2d");
    window.addEventListener("resize", debounce(this.resize, 150));
    this.resize();
  },
  unmounted() {
    window.removeEventListener("resize", debounce(this.resize, 150));
  },
  methods: {
    mousemove(e) {
      this.mouse.x = this.getX(e);
      this.mouse.y = this.getY(e);
      this.addPoint();
    },
    mouseout() {
      this.mouse.x = -1;
      this.mouse.y = -1;
    },
    resize() {
      const canvas = this.$refs["c"];
      this.canvas.width = canvas.width = canvas.style.width =
        canvas.parentElement.clientWidth;
      this.canvas.height = canvas.height = canvas.style.height =
        canvas.parentElement.clientHeight;
    },
    addPoint() {
      if (this.mouse.x === -1 || this.mouse.y === -1) {
        return;
      }

      const { x, y } = this.getNearestPoint(this.mouse.x, this.mouse.y);

      this.canvas.points.push({
        x,
        y,
        life: 42,
      });
    },
  },
};
</script>

<style></style>

<style lang="scss" scoped>
.canvas-wrapper {
  height: 100vh;
  width: 100%;

  canvas {
    background-color: transparent;
    border: none;
  }
}
</style>
