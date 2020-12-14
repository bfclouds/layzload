<template>
  <div>
    <button @click="showMessage">点我</button>
  </div>
</template>

<script>
import { Message } from './vue-message/index.js'

export default {
  components: {
  },
  data () {
    return {
    
    }
  },
  mounted () {
  },
  methods: {
    showMessage () {
      const type = ['success', 'error', 'warning'][this.getRandomIntInclusive(0, 2)]
      console.log(type, this.getRandomIntInclusive(0, 2))
      Message({
        type: type,
        message: '我是内容我是内容我是内容我是内容我是内容'
      })
    },
    getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
    }
  }
}
</script>

<style scoped>
</style>
