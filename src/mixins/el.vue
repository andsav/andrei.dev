<script>
export default {
  name: "el",
  methods: {
    getX(e) {
      const scroll =
        window.pageXOffset ||
        document.documentElement.scrollLeft ||
        document.body.scrollLeft ||
        0;
      const rect = e.target.getBoundingClientRect();
      return e.pageX - rect.left - scroll;
    },
    getY(e) {
      const scroll =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      const rect = e.target.getBoundingClientRect();
      return e.pageY - rect.top - scroll;
    },
  },
};
</script>
