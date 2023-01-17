/**
 * https://github.com/xyxiao001/vue-cropper
 * 
 * npm install vue-cropper@next
    import 'vue-cropper/dist/index.css'
    import { VueCropper }  from "vue-cropper";
 */

import { inject, ref } from 'vue'
import { useLoadImg } from '../../../composable/staticImgUtil'
import {useUploadBase64File} from '../../../composable/FileUtil'
type Img = {
  img: string
}
type Previews = {
  w?: number,
  h?: number,
  div?: any,
  url?: string,
  img?: string
}
type PreviewStyle = {
  width?: string,
  height?: string,
  overflow?: string,
  margin?: string,
  zoom?: number,
  borderRadius?:string
}
interface Options {
  img: string | ArrayBuffer | undefined,//	裁剪图片的地址	空	url 地址, base64, blob
  outputSize?: number,//	裁剪生成图片的质量	1	0.1 ~ 1
  outputType?: string,//	裁剪生成图片的格式	jpg (jpg 需要传入jpeg)	jpeg, png, webp
  info?: boolean,//	裁剪框的大小信息	true	true, false
  canScale?: boolean,//	图片是否允许滚轮缩放	true	true, false
  autoCrop?: boolean,//	是否默认生成截图框	false	true, false
  autoCropWidth?: number,//	默认生成截图框宽度	容器的 80%	0 ~ max
  autoCropHeight?: number,//	默认生成截图框高度	容器的 80%	0 ~ max
  fixed?: boolean,//	是否开启截图框宽高固定比例	false	true, false
  fixedNumber?: Array<number>,//	截图框的宽高比例	[1, 1]	[ 宽度 , 高度 ]
  full?: boolean,//	是否输出原图比例的截图	false	true, false
  fixedBox?: boolean,//	固定截图框大小	不允许改变	false
  canMove?: boolean,//	上传图片是否可以移动	true	true, false
  canMoveBox?: boolean,//	截图框能否拖动	true	true, false
  original?: boolean,//	上传图片按照原始比例渲染	false	true, false
  centerBox?: boolean,//	截图框是否被限制在图片里面	false	true, false
  high?: boolean,//	是否按照设备的dpr 输出等比例图片	true	true, false
  infoTrue?: boolean,//	true 为展示真实输出图片宽高 false 展示看到的截图框宽高	false	true, false
  maxImgSize?: number,//	限制图片最大宽度和高度	2000	0 ~ max
  enlarge?: number,//	图片根据截图框输出比例倍数	1	0 ~ max(建议不要太大不然会卡死的呢)
  mode?: string//	图片默认渲染方式	contain	contain , cover, 100px, 100% auto
}

export   const lists = ref<Array<Img>>([
  { img: useLoadImg('../../../../../src/assets/img/1122.png') },
  { img: useLoadImg('../../../../../src/assets/img/11.png') },
  { img: useLoadImg('../../../../../src/assets/img/12.png') },

  { img: useLoadImg('../../../../../src/assets/img/1102.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1103.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1104.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1105.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1106.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1107.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1108.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1109.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1110.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1111.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1112.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1113.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1114.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1115.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1116.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1117.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1118.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1119.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1120.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1121.jpeg') },

  { img: useLoadImg('../../../../../src/assets/img/1124.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1125.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1126.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1127.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1128.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1129.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1130.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1131.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1132.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1133.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1134.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1135.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1136.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1137.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1138.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1139.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1140.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1141.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1142.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1143.jpeg') },
  { img: useLoadImg('../../../../../src/assets/img/1144.jpeg') }
])



export const init = (img:string | ArrayBuffer | undefined) => {
  const resetAvatarSrc:any=inject('resetAvatarSrc')
  const closeUserCenter:any=inject('closeUserCenter')


  const cropper = ref()

  const previews = ref<Previews>({})
  const showModel = ref<boolean>(false)
  const crap = ref<boolean>(false)
  const modelSrc = ref<string>('')

  const src=ref<string>('')

  const option = ref<Options>({
    img: img,
    outputSize: 1,
    outputType: 'jpg',
    autoCrop: true,
    autoCropWidth: 200,
    autoCropHeight: 200,
    mode: 'auto'
  })

  const previewStyle1 = ref<PreviewStyle>({})
  const previewStyle2 = ref<PreviewStyle>({})


  const realTime = (data: Previews) => {
    previews.value = data  // 这里的图片其实是原本图片，里面带有裁剪框的参数，界面展示通过样式设置

    cropper.value.getCropData((data: any) => { // 这里才是裁剪后的图片，这里采用base64位
      // downImg.value = data;
      src.value=data
    });
  }

  const changeImg = () => {
    option.value.img = lists.value[~~(Math.random() * lists.value.length)].img;
  }

  const changeScale = (num: number) => {
    cropper.value.changeScale(num || 1)
  }

  const rotateRight = () => {
    cropper.value.rotateRight()
  }

  const rotateLeft = () => {
    cropper.value.rotateLeft()
  }

  const finish = (type: string) => {
    // 输出
    // var test = window.open('about:blank')
    // test.document.body.innerHTML = '图片生成中..'
    if (type === 'blob') {
      cropper.value.getCropBlob((data: any) => {
        console.log('裁剪>>>>>', data);
        const img = window.URL.createObjectURL(data);
        showModel.value = true;
        modelSrc.value = img;
      });
    } else {
      cropper.value.getCropData((data: any) => {
        showModel.value = true;
        modelSrc.value = data;
      });
    }
  }

 

  const startCrop = () => {
    // start
    crap.value = false;
    cropper.value.startCrop();
  }
  const stopCrop = () => {
    //  stop
    crap.value = true;
    cropper.value.stopCrop();
  }
  const clearCrop = () => {
    // clear
    cropper.value.clearCrop();
  }
  const refreshCrop = () => {
    // clear
    crap.value = false
    cropper.value.refresh();
  }


  const uploadImg = (e: any, num: number) => {
    //上传图片
    // option.img
    const file = e.target.files[0];
    if (!/\.(gif|jpg|jpeg|png|bmp|webp|GIF|JPG|PNG|WEBP)$/.test(e.target.value)) {
      alert('图片类型必须是.gif,jpeg,jpg,png,bmp,webp中的一种');
      return false;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      let data;
      if (typeof e.target!.result === 'object') {
        // 把Array Buffer转化为blob 如果是base64不需要
        data = window.URL.createObjectURL(new Blob([e.target!.result as ArrayBuffer]));
      } else {
        data = e.target!.result;
      }
      if (num === 1) {
        option.value.img = data;
      } else if (num === 2) {
        // example2.img = data;
        console.log('>>>>>img>>>>', data)
      }
    };
    // 转化为base64
    // reader.readAsDataURL(file)
    // 转化为blob
    reader.readAsArrayBuffer(file);
  }

  const chooseImg = () => {
    document.getElementById('uploads')!.click()
  }

  const download = (type: string) => {
    // event.preventDefault()
    const aLink = document.createElement('a');
    aLink.download = 'demo';
    // 输出
    if (type === 'blob') {
      cropper.value.getCropBlob((data: any) => {
        // downImg.value = window.URL.createObjectURL(data);
        aLink.href = window.URL.createObjectURL(data);
        src.value=window.URL.createObjectURL(data)
        aLink.click();
      });
    } else {
      cropper.value.getCropData((data: any) => {
        // downImg.value = data;
        aLink.href = data;
        src.value=data
        aLink.click();
      });
    }
  }

  /**
   * data:image/png;base64,iVBORw0KGgoAAAANS。。。
   * @param type 
   */
  const handleUpload=(type:string)=>{
    if (type === 'blob') {// blob
      cropper.value.getCropBlob((data: any) => {
        // downImg.value = window.URL.createObjectURL(data);
        src.value=window.URL.createObjectURL(data)
      });
    } else {// base64
      cropper.value.getCropData((data: any) => {
        // downImg.value = data;
        src.value=data
      });
    }

    // 上传
    // const apiUrl=''
    // const data=useUploadBase64File(apiUrl,src.value)
    const data=src.value
    resetAvatarSrc(data)
    closeUserCenter()
  }
 

  return {
    cropper, showModel, modelSrc, crap,src,
    option, previews, previewStyle1, previewStyle2,
    realTime, changeImg, changeScale, rotateRight, rotateLeft,
    finish, startCrop, stopCrop, clearCrop, refreshCrop, uploadImg,
    chooseImg, download,handleUpload
  }
}