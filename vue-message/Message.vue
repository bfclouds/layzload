<template>
  <transition name="message">
    <div
      id="vue-message"
      class="vue-message"
      :style="{top: offsetTop + 'px'}"
      v-show="visible">
    <span :class="type">
      {{ message }}
    </span>
    </div>
    
  </transition>
</template>

<script>
export default {
  name: 'message',
  components: {
  },
  data () {
    return {
      type: '',
      message: '',
      visible: false,
      duration: 3000,
      offsetTop: 0
    }
  },
  mounted () {
    const nodes = document.querySelectorAll('#vue-message')
    const currentNode = nodes[nodes.length - 1]
    if (currentNode) {
      const { offsetTop, clientHeight } = currentNode
      this.offsetTop = offsetTop + clientHeight + 20
    } else {
      this.offsetTop = 20
    }
    
    if (this.duration > 0) {
      setTimeout(() => {
        this.$destroy()
        this.$el.parentNode.removeChild(this.$el)
      }, this.duration) 
    }
  }

}
</script>

<style>
  .vue-message {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100%;
    text-align: center;
  }
  span {
    padding: 8px 12px;
  }
  .success {
    color: #44bd32;
    background: rgba(68,189,50, .4);
  }
  .error {
    color: #e84118;
    background: rgba(232,65,24, .4);
  }
  .warning {
    color: #fbc531;
    background: rgba(251,197,49, .4);
  }
  .message-enter-active {
    transition: all 1s linear;
  }
  .message-enter {
    opacity: 0;
  }
  .message-enter-to {
    opacity: 1;
  }

</style>
