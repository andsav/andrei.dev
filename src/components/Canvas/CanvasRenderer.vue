<script>
export default {
  inject: ["provider"],
  props: {
    onPointUpdate: {
      type: Function,
    },
  },
  data() {
    return {
      ctx: null,
      initialized: false,
    };
  },
  beforeUnmount() {
    cancelAnimationFrame(this.animate);
  },
  name: "CanvasRenderer",
  render() {
    if (!this.provider.context) return;
    this.ctx = this.provider.context;

    if (!this.initialized) {
      this.init();
    }
    return true;
  },
  methods: {
    init() {
      this.initialized = true;
      this.clear();
      this.ctx.lineJoin = "round";

      if (matchMedia("(pointer:fine)").matches) {
        this.animate();
      }
    },
    animate() {
      this.clear();
      this.provider.decayPoints();

      for (let i = 1; i < this.provider.points.length; ++i) {
        const point = this.provider.points[i];
        this.ctx.globalAlpha = point.life / 100;
        this.onPointUpdate(this.ctx, point);
      }

      requestAnimationFrame(this.animate);
    },
    clear() {
      this.ctx.clearRect(0, 0, this.provider.width, this.provider.height);
    },
  },
};
</script>
