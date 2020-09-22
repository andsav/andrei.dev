<script>
export default {
  inject: ["provider"],
  props: {
    onPointUpdate: {
      type: Function
    }
  },
  data() {
    return {
      ctx: null,
      width: 0,
      height: 0,
      initialized: false
    };
  },
  beforeUnmount() {
    cancelAnimationFrame(this.animate);
  },
  name: "CanvasRenderer",
  render() {
    if (!this.provider.context) return;
    this.ctx = this.provider.context;
    this.width = this.provider.context.canvas.width;
    this.height = this.provider.context.canvas.height;

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
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }
};
</script>
