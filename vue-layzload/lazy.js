export default (Vue) => {
  class ReactiveListener {
    constructor ({el, src, elRenderer , options}) {
      this.el = el
      this.src = src
      this.elRenderer = elRenderer
      this.options = options
      this.state = {loading: false}
    }
    
    checkInView () {
      let { top } = this.el.getBoundingClientRect()
      // console.log(top < window.innerHeight * this.options.preLoad)
      return top < window.innerHeight * this.options.preLoad
    }

    load () {
      this.elRenderer(this, 'loading')
      loadImageAsync (this.src, () => {
        // 成功的回调
        this.state.loading = true
        this.elRenderer(this, 'onloade')
      }, () => {
        // 失败的回掉
        this.elRenderer(this, 'error')
      })
    }
  }

  function loadImageAsync (src, resolve, reject) {
    let img = new Image()
    img.src = src
    img.onload = resolve
    img.error = reject
  }

  return class LazyClass {
    constructor(options) {
      this.options = options
      this.listenerQueue = []
      this.bindHander = false
      this.timer = 0

      this.layzLoadHandler = () => {
        // if (type === 'scroll') {
        //   const timer = new Date().getTime()
        //   console.log(timer - this.timer < 30)
        //   if (timer - this.timer < 30) {
        //     return
        //   }
        //   this.timer = timer
        // }
        let catIn = false
        this.listenerQueue.forEach(listener => {
          // console.log(this.listenerQueue, listener)
          if (listener.state.loading) { return }
          catIn = listener.checkInView()
          catIn && listener.load()
        })
      }
    }
    add (el, bindings) {
      Vue.nextTick(() => {
        function scrollParent () {
          let parent = el.parentNode 
          while(parent) {
            if (/scroll/.test(getComputedStyle(parent)['overflow-y'])) {
              return parent
            }
            parent = parent.parentNode
          }
          return parent
        }
        let parent = scrollParent()

        const src = bindings.value
        let listener = new ReactiveListener({
          el,
          src,
          elRenderer: this.elRenderer.bind(this),
          options: this.options
        })
        this.listenerQueue.push(listener)
        if (!this.bindHander) {
          this.bindHander = true
          parent.addEventListener('scroll', this.layzLoadHandler) // 滚动时渲染
        }
        // 加载后默认先渲染一次
        
        this.layzLoadHandler()
      })
    }
    elRenderer (listener, state) {
      let { el } = listener
      let src = ''
      switch (state) {
        case 'loading':
          src = listener.options.loading || ''
          break
        case 'error':
          src = listener.options.error || ''
          break
        default:
          src = listener.src
      }
      el.setAttribute('src', src)
    }
  }
} 