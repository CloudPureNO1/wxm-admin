<template>
  <div class="wxm-panel" :id="IDData.panelID" :style="'height:'+height+'px'">
    <WxmConditionButton :permission-prefix="props.permissionPrefix" :elementId="IDData.panelID" :targetId="IDData.othersId">
      <template #search>
        <slot name="search">
            <div class="search-btn">
                <div class="title"><span>条件搜索</span></div>
                <div class="btn">
                    <el-button type="primary" plain :icon="icons.Search" @click="search">搜索</el-button>
                    <el-button type="warning" plain :icon="icons.RefreshLeft" @click="useReset(searchFormRef)">重置 </el-button>
                </div>
            </div>
            
                    <el-form :model="searchForm" :size="size" inline ref="searchFormRef">
                        <template v-for="item in searchFormData" :key="item.prop">
                            <el-form-item v-if="item.show&&item.elType==='input'" :label="item.label" :prop="item.prop">
                                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder?item.placeholder:'请录入'"   />
                            </el-form-item>
                            <el-form-item v-else-if="item.show&&item.elType==='select'" :label="item.label" :prop="item.prop">
                                <el-select v-model="searchForm[item.prop]" :placeholder="item.placeholder?item.placeholder:'请选择'"  >
                                    <el-option v-for="dict in getDicts(item)" :key="getData('1',dict,dict.props)" :label="getData('2',dict,dict.props)" :value="getData('1',dict,dict.props)"/>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-else-if="item.show&&item.elType==='date-picker'" :label="item.label" :prop="item.prop">
                                从&nbsp;&nbsp;
                                <el-date-picker  v-model="searchForm[item.prop+'Start']" :type="item.type?item.type:'date'" :placeholder="item.placeholder?item.placeholder:'请选择'"  />
                                &nbsp;至&nbsp;&nbsp;
                                <el-date-picker  v-model="searchForm[item.prop+'End']" :type="item.type?item.type:'date'" :placeholder="item.placeholder?item.placeholder:'请选择'"  />
                            </el-form-item>
                            <el-form-item v-else-if="item.show&&item.elType==='cascader'" :label="item.label" :prop="item.prop"  :placeholder="item.placeholder?item.placeholder:'请选择'"  >
                                <el-cascader v-model="searchForm[item.prop]" :options="item.options" :props="props"/>
                            </el-form-item>
                            <!-- 一些其他的查询条件，比如一些大型的级联，或者下拉选择，传入参数太大，可以在自己界面实现 -->
                            <slot></slot>
                        </template>
                    </el-form>
 

        </slot>

        <!-- <div class="search-condition-btn">
            <el-button type="primary" plain :icon="icons.Search" @click="handleSearch">搜索</el-button>
            <el-button type="warning" plain :icon="icons.RefreshLeft" @click="useReset(searchFormRef)">重置</el-button>
        </div> -->
      </template>

      <template #btn>
        <slot name="btn"></slot>
      </template>
    </WxmConditionButton>
    <!-- 内容：包含表格和分页 -->
    <slot name="body">
      <WxmTable :tableData="props.tableData" :colList="colList" ref="wxmTableRef" />
      <WxmPagination />
      <div class="others" :id="IDData.othersId"> </div>
    </slot>
    <slot name="dialog"></slot>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, provide, inject, reactive } from 'vue';
import type { FormInstance } from 'element-plus';
import { ConditionButtonKey} from '../../symbol/Symbol';
import type { BaseType,DictType } from '../../comm/type';
import { useTableHeight } from '../../composable/tableHeight';
import { useReset } from '../../composable/baseOperator';
import {useLayoutStore} from '../../store/layout'
import {PaginationKey} from '../../symbol/Symbol'
import {useRbacStore} from '../../store/rbac'
import {useBizStore} from '../../store/biz'
import {useOthersStore} from '../../store/others'
import { nanoid } from 'nanoid';
 
const IDData = computed(() => {
  return {
    panelID: `panel-${nanoid}`,
    othersId: `others-${nanoid}`,
  };
});
const icons={
    Search:'Search',
    RefreshLeft:'RefreshLeft'
}
const props = defineProps({
  permissionPrefix: { type: String, default: null },
  tableData: { type: Array, default: () => [] },
});
const rbacStore=useRbacStore()
const bizStore=useBizStore()
const othersStore=useOthersStore()
const layoutStore=useLayoutStore()
const size=computed(()=>{
    return layoutStore.size
})
const stores:any=computed(()=>{
    return {
        rbac:rbacStore,
        biz:bizStore,
        others:othersStore
    }
})

const { colList } = inject(ConditionButtonKey);
const searchFormData=computed(()=>{
    if(!colList||!colList.value||colList.value.length===0) return []
    return colList.value.filter((col:BaseType<any>)=>col.search).map((item:any)=>{
        return {
            ...item.search,
            label:item.label,
            prop:item.prop,
            show:item.show,
        }
    })
})
 
const searchForm=reactive<BaseType<any>>({})
const searchFormRef=ref<any>()
const height = useTableHeight(true, false);
const wxmTableRef = ref<FormInstance>();
const {search}=inject(PaginationKey)
provide('wxmTableRef', wxmTableRef);


const getData=(type:string,dict:BaseType<any>,props?:BaseType<string>)=>{

    if(!props) {
        if(Object.prototype.hasOwnProperty.call(dict,'label')&&Object.prototype.hasOwnProperty.call(dict,'value')){
            return type==='1'?dict.value:dict.label
        }

        if(Object.prototype.hasOwnProperty.call(dict,'dictLabel')&&Object.prototype.hasOwnProperty.call(dict,'dictValue')){
            return type==='1'?dict.dictValue:dict.dictLabel
        }
        throw new Error(`没有提供正确的字典变量[{label:'',value:''}]或者[{dictLabel:'',dictValue:''}],请添加props属性 例如prps:{label:'AAA103',value:'AAA102'}`)
    }
    if(props&&Object.prototype.hasOwnProperty.call(props,'label')&&Object.prototype.hasOwnProperty.call(props,'value'))
    return type==='1'?dict[props.value]:dict[props.label]
}

const getDicts=(item:BaseType<any>)=>{
    if(item.piniaDict){
        const state:any=stores.value[item.piniaDict]?stores.value[item.piniaDict].$state :null
        if(state){
            const dictList:Array<DictType>=state[`${item.prop}Dicts`] 
            return dictList
        }
        throw new Error('没有对应的pinia字典存储文件或者字典信息')
    }
     
    return item.dicts
}
const removeOthersContent=()=>{
   const el= document.getElementById(IDData.value.othersId) as HTMLElement
   el.innerHTML=''
}
defineExpose({
    searchForm,
    removeOthersContent
})
</script>

<style scoped lang="scss">
.search-btn{
    display: flex;
    flex-direction: row;
    justify-content:space-between;

    padding: 0 0 4px 0;
    margin: 0 0 4px 0;
    border-bottom: 1px dashed var(--el-border-color) ;

    .title{
        &>span{
            font-size: 1rem;
            color:#409eff;
        }
    }
}
</style>