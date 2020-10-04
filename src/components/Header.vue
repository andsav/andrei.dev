<template>
  <header>
    <h1>Andrei Savin</h1>
    <p>Hello World</p>
  </header>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang="scss" scoped>
header {
  z-index: 10;
  position: fixed;
  top: 33%;
  width: 100%;
  margin: auto;
  text-align: center;
  transition: left 1s ease;
}

h1 {
  font-size: 2.5em;
  user-select: none;
}
</style>
