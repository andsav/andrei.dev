<template>
  <Name msg="Hello" />
  <button @click="toggleDarkMode">Hello</button>
</template>

<script>
import Name from "./components/Name.vue";

export default {
  name: "App",
  components: {
    Name
  },
  data() {},
  methods: {
    toggleDarkMode() {
      document.body.classList.toggle("dark");
    }
  }
};
</script>
