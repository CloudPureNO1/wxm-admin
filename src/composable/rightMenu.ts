 

 
const getChildren=(element:Element):Element[]=>{
  const eleList:Element[]=[]
  const children:HTMLCollection=element.children
  if(children&&children.length!==0){
    eleList.push(...Array.from(children))
    for(let i=0;i<children.length;i++){
     eleList.push(...getChildren(children[i]))
    }
  }
  return eleList;
}
const getAllElements=(unityClass:string):Element[]=>{
  const eleList:Element[]=[]
  const elements:NodeListOf<Element>=document.querySelectorAll(`.${unityClass}`)
  if(elements&&elements.length!==0){
    eleList.push(...Array.from(elements))
    for(let i=0;i<elements.length;i++){
      eleList.push(...getChildren(elements[i]))
    }
  }
  return eleList
}
const getId=(element:any,unityClass: string):string=>{
  if(element){
    const elClass:string=element.getAttribute('class') as string
    if(elClass&&elClass.includes(unityClass)){
      const id:string = (element.getAttribute('id')?element.getAttribute('id'):'') as string
      return id;
    }
    const parent:HTMLElement|null=element.parentElement
    return getId(parent,unityClass)
  }
  return ''
}
export const useRightMenu = (id: string, tabClass: string, unityClass: string) => {
    const rightMenu = document.getElementById(id)
    const baseTabsBox = document.querySelector(`.${tabClass}`)
    if (baseTabsBox) {
        //  document.oncontextmenu = () => {}
        //  mainIndex.oncontextmenu = (e) => {
        document.oncontextmenu = (e) => {
            const evt = e || window.event
            rightMenu!.style.display = 'none'
            if (evt.button === 2) { // 当事件属性button的值为2时，表用户按下了右键
                const target = evt.target
                const eleList:Element[]=getAllElements(unityClass)
                if(eleList.length!==0){
                  if (eleList.findIndex(ele => ele === target) !== -1) {
                    sessionStorage.setItem('currentTag',getId(target,unityClass))
                    evt.preventDefault() // 默认阻止标准DOM的右键菜单，IE8及以下无效
                    rightMenu!.style.cssText = 'position:absolute;display:block;top:' + evt.clientY + 'px;' + 'left:' + evt.clientX + 'px;'
                  } 
                }
            }
        }
    }

    // 鼠标点击其他位置时隐藏菜单
    document.onclick = function () {
        rightMenu!.style.display = 'none'
    }
}

 