<template>
  <div class="canvas-wrapper">
    <canvas ref="c" @mousemove="mousemove" @mouseout="mouseout"></canvas>
    <slot></slot>
  </div>
</template>

<script>
import debounce from "lodash/debounce";
import el from "../../mixins/el.vue";

export default {
  name: "Canvas",
  mixins: [el],
  props: {
    getNearestPoint: {
      type: Function,
    },
  },
  mounted() {
    window.addEventListener("resize", debounce(this.resize, 150));
    this.provider.context = this.$refs["c"].getContext("2d");
    this.resize();
  },
  unmounted() {
    window.removeEventListener("resize", debounce(this.resize, 150));
  },
  data() {
    return {
      provider: {
        mouseX: -1,
        mouseY: -1,
        context: null,
        points: [],
        decayPoints: this.decayPoints,
        width: 0,
        height: 0,
      },
    };
  },
  provide() {
    return {
      provider: this.provider,
    };
  },
  methods: {
    mousemove(e) {
      this.provider.mouseX = this.getX(e);
      this.provider.mouseY = this.getY(e);
      this.addPoint();
    },
    mouseout() {
      this.provider.mouseX = -1;
      this.provider.mouseY = -1;
    },
    resize() {
      const canvas = this.$refs["c"];
      this.provider.width = canvas.width = canvas.style.width =
        canvas.parentElement.clientWidth;
      this.provider.height = canvas.height = canvas.style.height =
        canvas.parentElement.clientHeight;
    },
    addPoint() {
      if (this.provider.mouseX === -1 || this.provider.mouseY === -1) {
        return;
      }

      const { x, y } = this.getNearestPoint(
        this.provider.mouseX,
        this.provider.mouseY
      );

      this.provider.points.push({
        x,
        y,
        life: 42,
      });
    },
    decayPoints() {
      this.provider.points.forEach((_, i) => {
        this.provider.points[i].life--;
      });
      this.provider.points = this.provider.points.filter(
        ({ life }) => life > 0
      );
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
