/**
 * 
 const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
 */


// Runtime directive used on component with non-element root node 。自定义指令不能放到组件上，而是要放到自有的元素上 比如原来的div span 等
// Repeat click interval

import type { Directive } from "vue";

export const clickInterval:Directive={
    mounted(el, binding) {
        let {value}=binding
        if(!value){
            value=1000
        }
        el.addEventListener('click', () => {
            if (!el.disabled) {
              el.disabled = true
              setTimeout(() => {
                el.disabled = false
              }, value)
            }
        })
    },
}
