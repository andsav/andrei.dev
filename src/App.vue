<template>
  <Name msg="Hello" />
</template>

<script>
import Name from "./components/Name.vue";

export default {
  name: "App",
  components: {
    Name
  },
  methods: {
    toggleDarkMode() {}
  }
};
</script>
