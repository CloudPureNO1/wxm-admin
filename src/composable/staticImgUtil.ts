/**
 * 加载图片资源方法，
 * 外部定位的要定位到src目录下 ：../../src/assets/img/9.gif
 * Vue界面中写的：可以相对定位 ： ../../../assets/img/9.gif
 */
 

  export const useLoadImg = (path: string) => {
    return new URL(path, import.meta.url).href
  }