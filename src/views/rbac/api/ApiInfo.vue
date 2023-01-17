<template>
    <div class="api-info">
        <el-form :model="apiForm" :rules="rules" :disabled="formDisabled" status-icon :size="store.size" label-width="auto" label-position="right" ref="apiFormRef">
            <el-row>
          <el-col :span="11" :offset="1">
            <el-form-item label="接口标题" prop="apiTitle">
              <el-input v-model="apiForm.apiTitle"  style="width:100%;"/>
            </el-form-item>
          </el-col>

          <el-col :span="11" :offset="1">
            <el-form-item label="状态" prop="apiStatus">
              <el-select v-model="apiForm.apiStatus" placeholder="请选择" style="width:100%;">
                <el-option v-for="item in store.apiStatus" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
            <el-col :span="21" :offset="1">
            <el-form-item label="接口地址" prop="apiUrl">
              <el-input v-model="apiForm.apiUrl" style="width:100%;"/>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="23" :offset="1">
            <el-form-item label="接口描述" prop="apiDesc">
              <el-input v-model="apiForm.apiDesc" type="textarea" :rows="3" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col  class="wxm-btn-info">
            <el-button v-click-interval type="primary" :size="store.size"  plain @click="handleSave(apiFormRef)">提交</el-button>
            <el-button v-click-interval type="warning" :size="store.size" plain @click="useReset(apiFormRef)">重置</el-button>
          </el-col>
        </el-row>

      </el-form>
    </div>
</template>

<script setup lang="ts">
import {apiRules as rules} from '../rbacRules'
import { useReset } from '../../../composable/baseOperator';
import { init} from './ts/ApiInfo';



const {store, formDisabled, apiForm, apiFormRef,handleSave}= init();



</script>
 