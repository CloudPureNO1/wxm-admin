import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'

export const useHtml2Img=(element:HTMLElement,target?:HTMLElement)=>{
        // Why is the produced canvas empty or cuts off half way through?
    // Make sure that canvas element doesn't hit browser limitations for the canvas size or use the window configuration options to set a custom window size based on the canvas element:
    if(!element){
      element=document.body
    }
    if(!target){
      target=document.body
    }
    const options={
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        useCORS: true // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
    }
    html2canvas(element,options).then((canvas)=>{
        if(target){
          target.appendChild(canvas)
          
        }else{

          document.body.appendChild(canvas);
        }
    });
}

/**
 * 
 * @param element 
 * @param options 
 */
export const useHtml2ImgURL=async (element:HTMLElement):Promise<string>=>{
    // Why is the produced canvas empty or cuts off half way through?
    // Make sure that canvas element doesn't hit browser limitations for the canvas size or use the window configuration options to set a custom window size based on the canvas element:
    const options={
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        useCORS: true // 如果截图的内容里有图片,可能会有跨域的情况,加上这个参数,解决文件跨域问题
    }
    console.log('html2ImgURL>>>>>>>>>>>>>>>>>>0000')
    let dataUrl:string=''
    await html2canvas(element,options).then(canvas=>{
        dataUrl=canvas.toDataURL("image/png");
        console.log('html2ImgURL>>>>>>>>>>>>>>>>>>11111')
    })
    console.log('html2ImgURL>>>>>>>>>>>>>>>>>>2222')
    return dataUrl;
}


export const useHtml2ImgBase64=(element:HTMLElement)=>{
    const dataURL= useHtml2ImgURL(element)
    return dataURL.toString().replace('data:image/png;base64,', '')//base64
}



export const useHtml2PdfDownload= async (ele:HTMLElement, pdfName:string) =>{
    const eleW = ele.offsetWidth// 获得该容器的宽
    const eleH = ele.offsetHeight// 获得该容器的高
  
    const eleOffsetTop = ele.offsetTop // 获得该容器到文档顶部的距离
    const eleOffsetLeft = ele.offsetLeft // 获得该容器到文档最左的距离
  
    const canvas = document.createElement('canvas')
    let abs = 0
  
    const winIn = document.documentElement.clientWidth || document.body.clientWidth // 获得当前可视窗口的宽度（不包含滚动条）
    const winOut = window.innerWidth // 获得当前窗口的宽度（包含滚动条）
  
    if (winOut > winIn) {
      // abs = (win_o - win_i)/2;    // 获得滚动条长度的一半
      abs = (winOut - winIn) / 2 // 获得滚动条宽度的一半
      // console.log(a, '新abs');
    }
  
    canvas.width = eleW * 2 // 将画布宽&&高放大两倍
    canvas.height = eleH * 2
  
    const context:any = canvas.getContext('2d')
  
    context.scale(2, 2)
  
    context.translate(-eleOffsetLeft - abs, -eleOffsetTop)
    // 这里默认横向没有滚动条的情况，因为offset.left(),有无滚动条的时候存在差值，因此
    // translate的时候，要把这个差值去掉
  
    // html2canvas(element).then( (canvas)=>{ //报错
    // html2canvas(element[0]).then( (canvas)=>{
    await html2canvas(ele, {
        windowWidth: ele.scrollWidth,
        windowHeight: ele.scrollHeight,
      // allowTaint: true,  //允许 canvas 污染， allowTaint参数要去掉，否则是无法通过toDataURL导出canvas数据的
      useCORS: true // 允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。
    }).then((canvas) => {
      const contentWidth = canvas.width
      const contentHeight = canvas.height
      // 一页pdf显示html页面生成的canvas高度;
      const pageHeight = contentWidth / 592.28 * 841.89
      // 未生成pdf的html页面高度
      let leftHeight = contentHeight
      // 页面偏移
      let position = 0
      // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      const imgWidth = 595.28
      const imgHeight = 595.28 / contentWidth * contentHeight
  
      const pageData = canvas.toDataURL('image/jpeg', 1.0)
  
      const pdf = new JsPDF(undefined, 'pt', 'a4')
  
      // 有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      // 当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
        // 在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        // pdf.addImage(pageData, 'JPEG', 20, 40, imgWidth, imgHeight);
      } else { // 分页
        while (leftHeight > 0) {
          pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
          leftHeight -= pageHeight
          position -= 841.89
          // 避免添加空白页
          if (leftHeight > 0) {
            pdf.addPage()
          }
        }
      }
  
      // 可动态生成
      pdf.save(pdfName)
    })
  }