<template>
  <b-container fluid class="mt-3">
    <Slide></Slide>
    <News></News>
  </b-container>
</template>

<script>
import Slide from './components/Slide';
import News from './components/News';
export default {
  components: {
    Slide,
    News,
  },
};
</script>

<style lang="scss" scoped>
</style>
