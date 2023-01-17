 
<template>
  <el-config-provider :locale="locale">
    <router-view/>
  </el-config-provider>
</template>

<script lang="ts" setup>
import type { Locale } from './comm/type'
import { computed } from 'vue'
import {useAppStore} from './store/app'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
 

const locales:Locale={
  'zh-cn':zhCn,
  'en':en
}
const appStore = useAppStore()
const locale = computed(() => {
  return locales[appStore.locale]
})


</script>

