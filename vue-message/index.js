import Vue from 'vue'
import MessageComponent from './Message.vue'


let MessageConstructor = Vue.extend(MessageComponent)

const Message = (options) => {
  console.log(options)
  // 实例
  let instance = new MessageConstructor({
    data: options
  })

  instance.$mount() // 挂载实例，挂载后的结果放在instance.$el上
  document.body.appendChild(instance.$el)
  instance.visible = true
}

['success', 'error', 'warning'].forEach(type => {
  Message[type] = function (options) {
    options.type = type
    return Message(options)
  }
})

export { Message }