<template>
  <div class="dictionary-info">
    <el-form :model="dictionaryForm" :rules="rules" :disabled="formDisabled" status-icon :size="store.size" label-width="auto" label-position="right" ref="dictionaryFormRef">
      <el-row>
        <el-col :span="11" :offset="1">
          <el-form-item label="字典类别" prop="dictType">
            <el-input v-model="dictionaryForm.dictType" style="width:100%;" placeholder="eg:AAA100"/>
          </el-form-item>
        </el-col>

        <el-col :span="11" :offset="1">
          <el-form-item label="状态" prop="dictStatus">
            <el-select v-model="dictionaryForm.dictStatus" placeholder="请选择" style="width:100%;">
              <el-option v-for="item in store.dictStatus" :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11" :offset="1">
          <el-form-item label="字典值" prop="dictValue">
            <el-input v-model="dictionaryForm.dictValue" style="width:100%;" />
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="同类别排序" prop="orderNum">
            <el-input v-model="dictionaryForm.orderNum" style="width:100%;" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11" :offset="1">
          <el-form-item label="字典名称" prop="dictLabel">
            <el-input v-model="dictionaryForm.dictLabel" style="width:100%;" />
          </el-form-item>
        </el-col>

        <el-col :span="11" :offset="1">
          <el-form-item label="父字典值" prop="dictParentValue">
            <el-input v-model="dictionaryForm.dictParentValue" style="width:100%;" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col class="wxm-btn-info">
          <el-button v-click-interval plain type="primary" :size="store.size" @click="handleSave(dictionaryFormRef)">提交</el-button>
          <el-button v-click-interval plain type="warning" :size="store.size" @click="useReset(dictionaryFormRef)">重置</el-button>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script setup lang="ts">
import { dictionaryRules as rules } from '../rbacRules';
import { useReset } from '../../../composable/baseOperator';
import { init } from './ts/DictionaryInfo';

const { store, formDisabled, dictionaryForm, dictionaryFormRef, handleSave } =
  init();
</script>
 