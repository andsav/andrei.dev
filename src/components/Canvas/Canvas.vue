<template>
  <div class="canvas-wrapper" :class="open && 'dn'">
    <canvas ref="c" @mousemove="mousemove" @mouseout="mouseout" />
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
    open: {
      type: Boolean,
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
  watch: {
    open(newValue) {
      if (!newValue) {
        this.resize();
      }
    },
  },
  mounted() {
    this.canvas.context = this.$refs["c"].getContext("2d");
    window.addEventListener("resize", debounce(this.resize, 150));
    setTimeout(() => {
      this.resize();
    }, 10);
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
      this.canvas.width = canvas.width = canvas.style.width = window.innerWidth;
      this.canvas.height = canvas.height = canvas.style.height =
        window.innerHeight;
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

<style lang="scss" scoped>
.canvas-wrapper {
  height: 100vh;
  width: 100%;

  canvas {
    background-color: transparent;
    border: none;
    height: 100vh;
  }
}
</style>
