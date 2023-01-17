import { defineStore } from "pinia";
import screenfull from 'screenfull'
import { isDark } from "../composable";
import {MenuColors as colors} from '../comm/Data'


// useStore 可以是 useUser、useCart 之类的任何东西
// 第一个参数是应用程序中 store 的唯一 id
export const useLayoutStore = defineStore("layoutStore", {
  state: () => ({
    size:'default', // large / default /small
    collapse: false,
    fullScreen:false,
    mode:'vertical',// horizontal / vertical   菜单模式
    keepAliveList:[] as string[],
    showTags:true,//是否显示标签栏
    layoutMode:'aside-main', // aside-main / header-main   菜单模式  左右  、上下  默认上下
    // locale:'en', // 国际化默认为zh-cn 中文,
    menuBgColor:'', // 默认透明与不设置一致  #2c3e50
  }),
  getters:{
    isVertical:(state):boolean=>{
      return state.mode==='vertical'
    },
    isHeaderMain:(state)=>{
      return state.layoutMode==='header-main'
    },
    getMenuBgColor:(state):string=>{
      if(isDark.value){
        return ''
      }
      if(state.mode==='horizontal'){
        return ''
      }
      if(!state.menuBgColor||state.menuBgColor===''||state.menuBgColor==='default'){
        return ''
      }
      return state.menuBgColor
    },
    getMenuTextColor:(state):string|null=>{
      if(state.mode==='horizontal'){
        return ''
      }
      const color=colors.find(color=>color.menuBgColor===state.menuBgColor)
      if(color){
        return color.menuTextColor
      }
      return ''
    },
    getMenuActiveTextColor:(state):string|null=>{
      if(state.mode==='horizontal'){
        return ''
      }
      const color=colors.find(color=>color.menuBgColor===state.menuBgColor)
      if(color){
        return color.menuActiveTextColor
      }
      return ''
    }
  },
  actions:{
    changeSize(size:string){
      this.size=size?size:'default'
    },
    toggleCollapse(){
      this.collapse=!this.collapse
    },
    addKeepAliveList(name:string){
      const isExists=this.keepAliveList.some(item=>item===name)
      if(!isExists) this.keepAliveList.push(name)
    },
    changeMode(mode:string){
      this.mode=mode?mode:'vertical'
    },
    toggleShowTags(){
      this.showTags=!this.showTags
    },
    changeLayout(layoutMode:string){
      this.changeMode('vertical')
      this.layoutMode=layoutMode?layoutMode:'header-main'
    },
    // changeLocale(locale:string){
    //   this.locale=locale?locale:'zh-cn'
    //   sessionStorage.setItem('locale',this.locale)
    // },
    toggleFullScreen(){
      if (screenfull.isEnabled) {
        screenfull.toggle();
        this.fullScreen=!screenfull.isFullscreen
      } else {
        console.log('>>>>>当前浏览器不支持全屏>>>>')
      }
    },
    changeMenuBgColor(bgColor:string){
      this.menuBgColor=bgColor
    },
 
  }
});
