<template>
  <Header />
  <Canvas :get-nearest-point="getNearestPoint">
    <canvas-renderer :on-point-update="onPointUpdate" />
  </Canvas>
  <dark-mode-toggle
    :dark-mode="darkMode"
    :on-toggle-dark-mode="toggleDarkMode"
  />
</template>

<script>
import { ref, computed } from "vue";

import Header from "./components/Header.vue";
import DarkModeToggle from "./components/DarkModeToggle.vue";
import Canvas from "./components/Canvas/Canvas.vue";
import CanvasRenderer from "./components/Canvas/CanvasRenderer.vue";

export default {
  name: "App",
  components: {
    CanvasRenderer,
    Canvas,
    DarkModeToggle,
    Header,
  },
  setup() {
    const browserDarkMode = window.matchMedia("(prefers-color-scheme: dark)")
      .matches;
    const darkMode = ref(browserDarkMode);

    const getNearestPoint = computed(() =>
      darkMode.value
        ? (mouseX, mouseY) => {
            const cX = ~~(mouseX / 54) * 54 + 26;
            const cY = ~~(mouseY / 58) * 58 + 29;

            return [
              [cX, cY],
              [cX - 27, cY - 29],
              [cX - 27, cY + 29],
              [cX + 27, cY - 29],
              [cX + 27, cY + 29],
            ]
              .map(([x, y]) => ({
                x,
                y,
                d: Math.sqrt((x - mouseX) ** 2 + (y - mouseY) ** 2),
              }))
              .sort((a, b) => a.d - b.d)[0];
          }
        : (mouseX, mouseY) => {
            const cX = 16 + ~~(mouseX / 47) * 47;
            const cY = 12 + ~~(mouseY / 30) * 30;

            let triangles = [
              [
                [cX - 25, cY],
                [cX, cY - 15],
                [cX, cY + 15],
              ],
              [
                [cX, cY - 15],
                [cX + 25, cY],
                [cX, cY + 15],
              ],
            ];
            triangles = triangles.concat(
              triangles.map((points) => points.map(([x, y]) => [x, y - 30])),
              triangles.map((points) => points.map(([x, y]) => [x, y + 30])),
              triangles.map((points) =>
                points.map(([x, y]) => [x - 25, y + 15])
              ),
              triangles.map((points) =>
                points.map(([x, y]) => [x - 25, y - 15])
              ),
              triangles.map((points) =>
                points.map(([x, y]) => [x + 25, y + 15])
              ),
              triangles.map((points) =>
                points.map(([x, y]) => [x + 25, y - 15])
              )
            );

            const triangle = triangles[~~(Math.random() * triangles.length)];

            return {
              x: triangle.map(([x, y]) => x),
              y: triangle.map(([x, y]) => y),
            };
          }
    );

    const onPointUpdate = computed(() =>
      darkMode.value
        ? (ctx, point) => {
            ctx.fillStyle = "#20457c";
            ctx.beginPath();
            ctx.moveTo(point.x - 26, point.y);
            ctx.lineTo(point.x, point.y - 15);
            ctx.lineTo(point.x + 26, point.y);
            ctx.lineTo(point.x, point.y + 15);
            ctx.closePath();
            ctx.fill();
          }
        : (ctx, { x, y }) => {
            ctx.fillStyle = "#fefdfb";
            ctx.beginPath();
            ctx.moveTo(x[0], y[0]);
            ctx.lineTo(x[1], y[1]);
            ctx.lineTo(x[2], y[2]);
            ctx.closePath();
            ctx.fill();
          }
    );

    if (browserDarkMode) {
      document.body.classList.add("dark");
    }

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
      document.body.classList.toggle("dark");
      document.body.classList.toggle("light");
    };

    return {
      darkMode,
      toggleDarkMode,
      onPointUpdate,
      getNearestPoint,
    };
  },
};
</script>
