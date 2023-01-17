<template>
    <div class="img-cropping">
        <div class="cropper-box">
             <vueCropper ref="cropper" 
             :img="option.img" 
             :outputSize="option.outputSize" 
             :outputType="option.outputType"
             :autoCrop="option.autoCrop"
             :autoCropWidth="option.autoCropWidth"
             :autoCropHeight="option.autoCropHeight"
             :mode="option.mode"
             @realTime="realTime"/>
        </div>
        <div class="op-box">
            <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event, 1)"/>
            <el-button-group>
                 <el-button type="primary" plain :icon="icon.Switch" @click="changeImg">切换图片</el-button>
                 <el-button type="primary" plain :icon="icon.Upload" @click="chooseImg">更多图片</el-button>
                 <el-button type="primary" plain :icon="icon.ZoomIn"  @click="changeScale(1)">放大</el-button>
                 <el-button type="primary" plain :icon="icon.ZoomOut" @click="changeScale(-1)">缩小</el-button>
                 <el-button type="primary" plain :icon="icon.RefreshRight" @click="rotateRight">右旋转90度</el-button>
                 <el-button type="primary" plain :icon="icon.RefreshLeft" @click="rotateLeft">左旋转90度</el-button>
                 <el-button type="primary" plain :icon="icon.View" @click="finish('base64')">预览(base64)</el-button>
                 <el-button type="primary" plain :icon="icon.View" @click="finish('blob')">预览(blob)</el-button>
                 <el-button type="primary" plain :icon="icon.Download" @click="download('base64')">下载(base64)</el-button>
                 <el-button type="primary" plain :icon="icon.Download" @click="download('blob')">下载(blob)</el-button>
                 <el-button type="primary" plain :icon="icon.VideoPlay" @click="startCrop" v-if="crap">开始</el-button>
                 <el-button type="primary" plain :icon="icon.VideoPause" @click="stopCrop" v-else>结束</el-button>
                 <el-button type="primary" plain :icon="icon.Delete" @click="clearCrop">清除</el-button>
                 <el-button type="primary" plain :icon="icon.Refresh" @click="refreshCrop">刷新</el-button>
            </el-button-group>
        </div>
        <div class="preview-box">
            <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',
                'margin': '5px'}">
            <div :style="previews.div">
                <img :src="previews.url" :style="previews.img"/>
            </div>
            </div>
            <p>中等大小</p>
            <div :style="previewStyle1"> 
            <div :style="previews.div">
                <img :src="previews.url" :style="previews.img"/>
            </div>
            </div>

            <p>迷你大小</p>
            <div :style="previewStyle2"> 
            <div :style="previews.div">
                <img :src="previews.url" :style="previews.img"/>
            </div>
            </div>
        </div>

        <div class="model" v-show="showModel" @click="showModel = false">
            <div class="model-show">
                <img :src="modelSrc" alt=""/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import 'vue-cropper/dist/index.css'
import { VueCropper } from "vue-cropper";
// import VueCropper from "vue-cropper/lib"
import { init } from './ts/ImageCropping'
// import { defineComponent } from 'vue';
const icon={
    Refresh:'Refresh',
    ZoomIn:'ZoomIn',
    ZoomOut:'ZoomOut',
    RefreshRight:'RefreshRight',
    RefreshLeft:'RefreshLeft',
    View:'View',
    VideoPlay:'VideoPlay',
    VideoPause:'VideoPause',
    Delete:'Delete',
    Download:'Download',
    Upload:'Upload',
    Switch:'Switch',
}
const
    {
        cropper,showModel,modelSrc,crap,
        option, previews, previewStyle1, previewStyle2,
        realTime,changeImg,changeScale,rotateRight,rotateLeft,
        finish,startCrop,stopCrop,clearCrop,refreshCrop,uploadImg,
        chooseImg,download
    } = init()
</script>


<style scoped lang="scss">
.img-cropping {
    padding: 0;

    .cropper-box{
        height: 450px;
    }


    .model {
        position: fixed;
        z-index: 10;
        width: 100vw;
        height: 100vh;
        overflow: auto;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);


        
      .model-show {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
      }

      img {
        display: block;
        margin: auto;
        max-width: 80%;
        user-select: none;
        background-position: 0px 0px, 10px 10px;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
      }
    }
}
</style>