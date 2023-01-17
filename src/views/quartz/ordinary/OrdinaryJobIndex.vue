<template>
  <WxmPanel :tableData="tableData" permission-prefix="quartz-ordinary" ref="panelRef">
    <template #dialog>
      <el-dialog v-model="dialogVisible" title="" top="5vh" width="80%" :fullscreen="dialogFullscreen" :close-on-press-escape="false" :close-on-click-modal="false" class="datax-info-dialog">
        <template #title>
          <span v-if="dialogVisible">定时任务设置</span>
          <i style="float:right;margin-right:30px;" @click="dialogFullscreen=!dialogFullscreen">
            <el-icon>
              <FullScreen />
            </el-icon>
          </i>
        </template>
        <el-card shadow="never">
          <OrdinaryJobInfo v-if="dialogVisible" />
        </el-card>
      </el-dialog>
    </template>
  </WxmPanel>

</template>
  
  
  
  
  <script lang="ts" setup>
import OrdinaryJobInfo from './OrdinaryJobInfo.vue';
import { init } from './ts/OrdinaryJobIndex';
const { panelRef, tableData, dialogVisible, dialogFullscreen } = init();
</script>