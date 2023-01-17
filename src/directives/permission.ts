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



// permission.ts
// Runtime directive used on component with non-element root node 。自定义指令不能放到组件上，而是要放到自有的元素上 比如原来的div span 等
// 引入vue中定义的指令对应的类型定义 
import type { Directive } from 'vue'
export const permission: Directive = {
  // mounted是指令的一个生命周期
  mounted(el, binding) {
    // value 获取用户使用自定义指令绑定的内容
    const { value } = binding

    const permission = sessionStorage.getItem('permission')

    // 获取用户所有的权限按钮
    const permissionBtn: string[] = (permission == null ? [] : JSON.parse(permission)) as string[]
    // 判断用户使用自定义指令，是否使用正确了
    if (value && value instanceof Array && value.length > 0) {
      const permissionFunc = value
      if (!permissionFunc.includes('ALL')) {
        //判断传递进来的按钮权限，用户是否拥有
        //Array.some(), 数组中有一个结果是true返回true，剩下的元素不会再检测
        const hasPermission = permissionBtn.some((role: any) => {
          return permissionFunc.includes(role)
        })
        // 当用户没有这个按钮权限时，设置隐藏这个按钮
        if (!hasPermission) {
          // el.style.display = 'none'
          // 通过父元素，移除当前节点
          el.parentNode && el.parentNode.removeChild(el);
        }
      }

    } else {
      throw new Error('need permissions Like v-permission="[\'admin:delete\',\'user:editor\']"  or v-permission="[\'ALL\']"')
    }
  }
}