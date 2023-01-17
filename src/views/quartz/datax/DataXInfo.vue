<template>
  <div class="quartz-datax-info">
 

      <el-row :gutter="1">
        <el-col :span="12">

          <fieldset>
            <legend>源数据库</legend>

            <el-form :model="dbSource" :rules="rulesDBSource" :disabled="formDisabled" status-icon :size="size" label-width="auto" label-position="right" ref="dbSourceRef">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="数据库" prop="name">
                    <el-select v-model="dbSource.name" placeholder="" @change="handleNameChanged" style="width:100%;">
                      <el-option v-for="reader in nameReaders" :key="reader.value" :label="reader.label" :value="reader.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item v-show="showFetchSize" label="批量大小" prop="fetchSize">
                    <el-input-number v-model="dbSource.fetchSize" :max="2048" :min="0" placeholder="" style="width:100%;"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="URL" prop="jdbcUrl">
                    <el-input v-model="dbSource.jdbcUrl" style="width:100%;"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="1">
                <el-col :span="12">
                  <el-form-item label="用户名" prop="username">
                    <el-input v-model="dbSource.username" style="width:100%;"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="密码" prop="password">
                    <el-input v-model="dbSource.password" style="width:100%;"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="查询语句" prop="querySql">
                    <el-input type="textarea" v-model="dbSource.querySql" :rows="rows" placeholder=" 自定义sql,支持多表关联，当用户配置querySql时，直接忽略table、column、where条件的配置" show-word-limit/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="表名" prop="table">
                    <el-input type="textarea" v-model="dbSource.table" :rows="rows" placeholder="表名，多个使用逗号分割" show-word-limit/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="表字段" prop="column">
                    <el-input type="textarea" v-model="dbSource.column" :rows="rows" placeholder="表字段，多个使用逗号分割" show-word-limit/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="where条件" prop="where">
                    <el-input type="textarea" v-model="dbSource.where" :rows="rows" placeholder="指定的column、table、where条件拼接SQL，可以指定limit 10，也可以增量数据同步，如果该值为空，代表同步全表所有的信息" show-word-limit/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </fieldset>

        </el-col>
        <el-col :span="12">
          <fieldset>
            <legend>目标数据库</legend>

            <el-form :model="dbTarget" :rules="rulesDBTarget" :disabled="formDisabled" status-icon :size="size" label-width="auto" label-position="right" ref="dbTargetRef">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="数据库" prop="name">
                    <el-select v-model="dbTarget.name" style="width:100%;">
                      <el-option v-for="writer in nameWriters" :key="writer.value" :label="writer.label" :value="writer.value"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="批量大小" prop="batchSize">
                    <el-input-number v-model="dbTarget.batchSize" :max="2048" :min="100" style="width:100%;"/>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="写入模式" prop="writeMode">
                    <el-select v-model="dbTarget.writeMode" style="width:100%;">
                      <el-option v-for="writeMode in writeModes" :key="writeMode" :label="writeMode" :value="writeMode"/>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="URL" prop="jdbcUrl">
                    <el-input v-model="dbTarget.jdbcUrl" style="width:100%;"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="1">
                <el-col :span="12">
                  <el-form-item label="用户名" prop="username">
                    <el-input v-model="dbTarget.username" style="width:100%;"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="密码" prop="password">
                    <el-input v-model="dbTarget.password" style="width:100%;"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="同步前语句" prop="preSql">
                    <el-input type="textarea" v-model="dbTarget.preSql" :rows="rows" placeholder="写入数据到目的表前，会先执行这里的标准语句。例在导入表前先进行删除操作： delete from 表名 多个以逗号分割" show-word-limit/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="表名" prop="table">
                    <el-input type="textarea" v-model="dbTarget.table" :rows="rows" placeholder="表名，多个使用逗号分割" show-word-limit/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="表字段" prop="column">
                    <el-input type="textarea" v-model="dbTarget.column" :rows="rows" placeholder="表字段，多个使用逗号分割" show-word-limit/>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="24">
                  <el-form-item label="同步后语句" prop="postSql">
                    <el-input type="textarea" v-model="dbTarget.postSql" :rows="rows" placeholder="写入数据到目的表后，会执行这里的标准语句。（原理同 preSql ） 多个以逗号分割" show-word-limit/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </fieldset>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <fieldset>
            <legend>同步设置</legend>
            <el-row>
              <el-col :span="8">
                <el-form :model="quartzForm" :rules="rulesQuartz" :disabled="formDisabled" status-icon :size="size" label-position="top" ref="quartzFormRef">
                  <el-row>
                    <el-col :span="24">
                      <el-form-item label="执行规则设置：" prop="selectedCron">
                        <el-input v-model="quartzForm.cron" style="width:100%;" @input="setSelectedCron">
                          <template #prepend>
                            <el-select v-model="quartzForm.selectedCron" style="width:8rem;" @change="handleCronChange">
                              <el-option v-for="item in crons" :key="item.value" :label="item.label" :value="item.value"/>
                            </el-select>
                          </template>
                          <template #append>
                            <el-button plain :size="size" @click="handlerOpenCron">帮助</el-button>
                          </template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
              <el-col :span="8">
                <el-form :model="speed" :rules="rulesSpeed" :disabled="formDisabled" status-icon :size="size" label-position="top" ref="speedFormRef">
                  <el-row>
                    <el-col :span="11" :offset="1">
                      <el-form-item label="最大并发数：" prop="channel">
                        <el-input-number v-model="speed.channel" :max="32" :min="1" style="width:100%;"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1" prop="spByte">
                      <el-form-item label="传输速度(byte/s)：">
                        <el-input-number v-model="speed.spByte" :min="1024" :step="10" style="width:100%;"/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
              <el-col :span="8">
                <el-form :model="errorLimit" :rules="rulesErrorLimit" :disabled="formDisabled" status-icon :size="size" label-position="top" ref="errorListFromRef">
                  <el-row>
                    <el-col :span="11" :offset="1">
                      <el-form-item label="脏数据阈值：" prop="record">
                        <el-input-number v-model="errorLimit.record" :max="32" :min="0" style="width:100%;"/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="1">
                      <el-form-item label="脏数据占比阈值：" prop="percentage">
                        <el-input-number v-model="errorLimit.percentage" :min="0" :max="100" style="width:100%;"/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </el-col>
            </el-row>
          </fieldset>
        </el-col>
      </el-row>

  
   

      <div class="wxm-info-btn" style="margin-top:10px;">
        <el-button v-click-interval type="primary" :size="size" :disabled="formDisabled" plain @click="handleSave">提交</el-button>
        <el-button v-click-interval type="warning" :size="size" :disabled="formDisabled" plain @click="handleResetForm">重置</el-button>
     
    </div>
    <el-drawer title="Cron帮助文档!" v-model="showHelp"  size="50%">
      <!--md 文件样式-->
      <!-- <v-md-editor v-model="CronHelperMd"   height="100%"/> -->
      <v-md-editor v-model="CronHelperMd"  mode="preview" height="100%"/>
    </el-drawer>

  </div>
</template>
<script lang="ts" setup>
import CronHelperMd from '../CronHelper.md?raw'
import {initStaticData,initStoreData,init} from './ts/DataXInfo'
 
const rows=3
const { rulesDBSource,rulesDBTarget,rulesQuartz,rulesSpeed,rulesErrorLimit, crons ,nameReaders,nameWriters,writeModes}=initStaticData()
const {size}=initStoreData()
const {
    dbSourceRef, dbTargetRef, quartzFormRef, speedFormRef, errorListFromRef,
    formDisabled, dbSource, dbTarget, quartzForm, speed, errorLimit, showFetchSize, showHelp,
    handleNameChanged,handleSave,handleResetForm,setSelectedCron,handleCronChange,handlerOpenCron
}=init()
</script>
 
 