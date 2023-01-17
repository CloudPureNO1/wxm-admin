import { ref,unref, onMounted, onUnmounted } from 'vue'

/**
 * 计算table 高度或者最大高度
 * @param isCondition  是否有查询条件
 * @param isPagination 是否有分页栏
 * @returns 高度
 */
export const useTableHeight = (isCondition: boolean, isPagination: boolean,otherCls?:string[],num?:number) => {
    isCondition=unref(isCondition)
    isCondition=unref(isPagination)
    const maxHeight = ref<number>(300)
    const resizeFn = () => {
        if(document.querySelector('.wxm-content__main')){
            const contentEle = document.querySelector('.wxm-content__main') as HTMLElement
            maxHeight.value = contentEle.offsetHeight
        }
        if (isCondition && document.querySelector('.wxm-condition-box')) {
            const contentIndexEle = document.querySelector('.wxm-condition-box') as HTMLElement
            maxHeight.value = maxHeight.value - contentIndexEle.offsetHeight
        }
        if (isPagination && document.querySelector('.wxm-pagination')) {
            const paginationEle = document.querySelector('.wxm-pagination') as HTMLElement
            maxHeight.value = maxHeight.value - paginationEle.offsetHeight
        }
        if(otherCls){
            otherCls.forEach((item:string)=>{
                if(document.querySelector(item)){
                    const otherEle = document.querySelector(item) as HTMLElement
                    maxHeight.value = maxHeight.value - otherEle.offsetHeight
                }
            })
        }
        if(num) maxHeight.value=maxHeight.value-num
        maxHeight.value= maxHeight.value-28
    }

    onMounted(() => {
        resizeFn()
        window.addEventListener('resize', resizeFn)
    })
    onUnmounted(() => {
        window.removeEventListener('resize', resizeFn)
    })
    return maxHeight
}