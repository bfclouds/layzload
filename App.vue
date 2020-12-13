<template>
  <ul class="box">
    <template v-for="item in 50">
      <li :key="item">
        <img v-lazy="'https://picsum.photos/100/100?random='+ Math.random()" alt="">
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
    
    }
  }
}
</script>

<style scoped>
.box {
  height: 400px;
  overflow-y: scroll;
}
img {
  width: 100px;
  height: 100px;
}
</style>
