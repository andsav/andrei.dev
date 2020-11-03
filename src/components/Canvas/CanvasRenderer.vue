<script>
import { inject } from "vue";

export default {
  props: {
    onPointUpdate: {
      type: Function,
    },
  },
  name: "CanvasRenderer",
  setup(props) {
    let initialized = false;

    const canvas = inject("canvas", {
      context: null,
      width: 0,
      height: 0,
      points: [],
    });
    const decayPoints = inject("decayPoints", () => {});

    const clear = () => {
      canvas.context.clearRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      clear();
      decayPoints();

      for (let i = 1; i < canvas.points.length; ++i) {
        canvas.context.globalAlpha = canvas.points[i].life / 120;
        props.onPointUpdate(canvas.context, canvas.points[i]);
      }

      requestAnimationFrame(animate);
    };

    const init = () => {
      initialized = true;
      canvas.context.lineJoin = "round";
      clear();

      if (matchMedia("(pointer:fine)").matches) {
        animate();
      }
    };

    return () => {
      if (!canvas.context) {
        return false;
      }

      if (!initialized) {
        init();
      }
      return true;
    };
  },
};
</script>
