<template>
  <div class="wxm-json-pretty">
    <div style="width:800px;text-shadow: 2px 2px 5px #777;
          line-height: 28px;font-size: 28px;color: rgb(90, 90, 90);
          margin-top: 20px;">
      Json格式化
    </div>

    <div style="text-align: left;margin-top:10px;">json:</div>
    <el-input
        id="jsonText"
        v-model="jsonText"
        :rows="4"
        type="textarea"
        placeholder="待格式化的json文本"
        style="margin-top:10px;width:800px;"
    />

    <div style="text-align: left;margin-top:10px;">格式化:</div>
    <vue-json-pretty :data="jsonObj" :deep="3" showLine showLineNumber showIcon showLength editable/>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';

//json文本
const jsonText = ref<string>("");
//json对象
const jsonObj = computed(() => { //计算属性传递参数
  if (jsonText.value.trim() == '') {
    return {}
  } else {
    let obj = {};
    try {
      obj = JSON.parse(jsonText.value)
      console.log(obj);
    } catch (e) {
      alert("解析出错:" + e);
    }
    return obj
  }
})
</script>
