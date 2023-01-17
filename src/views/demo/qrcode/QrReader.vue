<template>
    <div class="wxm-qr-reader">
        <img id="fg" :src="imgSrc" style="width:300px;" />

        <div>
            选择二维码图片:
            <input type="file" ref="hiddenfile" accept="image/*" @change="readQr" class="hiddenInput" />
        </div>

        <div>
            <el-input v-model="qrText" :rows="2" type="textarea" placeholder="..." readonly="true"
                style="width:500px;" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// 只支持png
import qrcodeParser from 'qrcode-parser'

//图片的src
const imgSrc = ref<any>("");
//读取到的数据
const qrText = ref("");
//读取exif
const readQr = (e: any) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        //显示图片
        imgSrc.value = reader.result;
        //解析二维码图片
        qrcodeParser(file).then(res => {
            console.log(res);
            qrText.value = res;
        }).catch((err) => {
            console.log('error', err)
            qrText.value = "图片中未解析到数据";
        })
    }
}
</script>