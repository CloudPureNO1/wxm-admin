


export const useIsArray=(arg:any)=>{
    if (!Array.isArray) {
      Object.prototype.toString.call(arg) === '[object Array]'   
    }
   return  Array.isArray(arg)
}
 