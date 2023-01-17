<template>
  <div class="quartz-ordinary-info">
      <el-row>
        <el-col :span="24">
          <fieldset>
            <legend>同步设置</legend>
            <el-form :model="quartzForm" :disabled="formDisabled" :rules="rulesQuartz" status-icon :size="size" label-width="auto" label-position="right" ref="quartzFormRef">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="执行规则设置">
                    <el-input v-model="quartzForm.cron" style="width:100%;" @input="setSelectedCron">
                      <template #prepend>
                        <el-select v-model="quartzForm.selectedCron" style="width:13.85rem;" @change="handleCronChange">
                          <el-option v-for="item in crons" :key="item.value" :label="item.label" :value="item.value"/>
                        </el-select>
                      </template>
                      <template #append>
                        <el-button :size="size" plain @click="handlerOpenHelper('1')">帮助</el-button>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="定时任务类">
                    <el-input v-model="quartzForm.className" style="width:100%;" @input="handleSetClass">
                      <template #prepend>
                        <el-select v-model="quartzForm.selectedClassName" style="width:13.85rem;" @change="handleClassChange">
                          <el-option v-for="item in classList" :key="item.value" :label="item.label" :value="item.value"/>
                        </el-select>
                      </template>
                      <template #append>
                        <el-button :size="size" plain @click="handlerOpenHelper('2')">帮助</el-button>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item v-show="showCustomClass" label="自定义内容实现类">
                    <el-input v-model="quartzForm.customClassName" style="width:100%;">
                      <template #append>
                        <el-button :size="size" plain @click="handlerOpenHelper('2')">帮助</el-button>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </fieldset>
        </el-col>
      </el-row>

 <div class="wxm-info-btn" style="margin-top:10px;">
        <el-button v-click-interval type="primary" plain :size="size" :disabled="formDisabled" @click="handleSave(quartzFormRef)">提交</el-button>
        <el-button v-click-interval type="warning" plain :size="size" :disabled="formDisabled" @click="useReset(quartzFormRef)">重置</el-button>
    </div>
    <el-drawer title="" v-model="showHelp"   size="50%">
      <!--md 文件样式-->
      <v-md-editor v-if="showHelp&&showHelpType==='1'" v-model="CronHelperMd"   height="100%"/>
      <v-md-editor v-if="showHelp&&showHelpType==='2'"  v-model="OrdinaryHelperMd"   height="100%"/>
 
    </el-drawer>
  </div>
</template>
<script lang="ts" setup>
import CronHelperMd from '../CronHelper.md?raw'
import OrdinaryHelperMd from '../OrdinaryHelper.md?raw'
 import {initStaticData,initStore,init} from './ts/OrdinaryJobInfo'
 import { useReset } from '../../../composable/baseOperator';
 const { rulesQuartz, crons,classList }=initStaticData()
 const  {size}=initStore()
 const  { 
    quartzFormRef,  formDisabled, quartzForm,showCustomClass,showHelp ,showHelpType,
 handlerOpenHelper,setSelectedCron,handleCronChange,handleClassChange,handleSetClass,handleSave
 }=init()
</script>

 