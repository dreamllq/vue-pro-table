# lc-vue-pro-table

高级表格组件

基于vue3 + element-plus el-table 开发

- 新增跨页多选/跨页全选反选功能
- 新增自定义列功能（新增/删除/排序）

## 安装

```
npm i lc-vue-pro-table
```

## 依赖

- vue@3.x
- element-plus@2.x
- lodash
- uuid
- @vueuse/core
- vuedraggable
- @element-plus/icons

## Demo

[demo](https://unpkg.com/lc-vue-pro-table/docs/.vitepress/dist/index.html)

## 基本使用

```vue
<template>
  <div>
    <el-checkbox v-model="showSelectionAlert">showSelectionAlert</el-checkbox>
  </div>
    <div>
      <CustomColumnPop ref="customColumnPopRef" @submit="onSubmit">
        <template #reference>
          <el-button :icon="Setting" @click="onSetting"/>
        </template>
      </CustomColumnPop>
    </div>
  <div style="height: 600px;" class="reset">
    <AutoPagination :fetch-data="fetchData" ref="pagination" auto-init>
      <template #default="{data, indexMethod}">
        <AutoHeightWrapper>
        <template #default="{size}">
          <ProTable :data="data" rowKey="id" :height="size.height" :showSelectionAlert="showSelectionAlert" ref="tableRef">
            <ProTableColumn type="selection" label="选择" prop="selection"> </ProTableColumn>
            <ProTableColumn type="reserveSelection" label="跨页选择" prop="reserveSelection"> </ProTableColumn>
            <ProTableColumn type="index" label="c" prop="c"></ProTableColumn>
            <ProTableColumn prop="id" label="id"></ProTableColumn>
            <ProTableColumn prop="b" label="bb" disabled>
              <template #default="{row}">{{ row }}</template>
            </ProTableColumn>
          </ProTable>
        </template>
      </AutoHeightWrapper>  
      </template>
    </AutoPagination>
  </div>
  <div>
    <el-button @click="getReserveSelection">获取选择记录</el-button>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { AutoPagination } from 'lc-vue-auto-pagination';
import { AutoHeightWrapper } from 'lc-vue-auto-height-wrapper';
import { ProTable, ProTableColumn, CustomColumnPop } from 'lc-vue-pro-table';
import { Setting } from '@element-plus/icons';

const tableRef = ref<InstanceType<typeof ProTable>>()
const customColumnPopRef = ref<InstanceType<typeof CustomColumnPop>>()

const showSelectionAlert=ref(true)

const fetchData: InstanceType<typeof AutoPagination>['$props']['fetchData'] = async ({ pageNo, pageSize }) => {
  const list:any[] = [];

  for(let i=0; i<pageSize; i++){
    list.push({
      id: (pageNo-1)*pageSize + i,
      a: 10,
      b: 11
    })
  }

  return {
    list: list,
    total: 201
  }
}

const getReserveSelection = ()=>{
  console.log(tableRef.value.getReserveSelection())
}

const onSetting = ()=>{
  const columns = tableRef.value.getCustomColumns()
  customColumnPopRef.value.show(columns)
}

const onSubmit = (list)=>{
  tableRef.value.updateCustomColumns(list)
}

</script>

<style scoped>

</style>
```

## 较 el-table 变更的 Api

### ProTable Props

| 属性名 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| showSelectionAlert | 是否显示选项提示 | boolean | false |
| renderTableType | table渲染类型 | string | 'el-table' | 'ag-grid' |

### ProTable Exposes

| 名称 | 描述 | 类型 |
| ---- | ---- | ---- |
| getRowSelection | 获取选择信息,ProTableColumn.type='reserveSelection' | () => \{ rows: any[]; type: "reverse" \| "positive"; \} ；positive 为正选；reverse为反选 |

### FormGrid Events

| 事件名 | 说明 | 类型 |
| ---- | ---- | ---- |
| reserve-selection-change | 多选变化(支持全选排除) | \{ rows: any[]; type: "reverse" \| "positive"; \} |
| selection-change | 选择变化 | \{ rows: any[]; type: "positive"; \} |


## 较 el-table-column 变更的 Api

### ProTableColumn Props

| 属性名 | 说明 | 类型 | 默认值 |
| ---- | ---- | ---- | ---- |
| type | 新增跨页多选类型 | reserveSelection | - |

## el-table 和 ag-grid 支持对比

| 功能 | el-table | ag-grid |
| ---- | ---- | ---- |
| 数据展示 | 有 | 有 |
| 自定义单元格 | 有 | 无 |
| 行多选 | 有 | 无 |
| 自定义列调整 | 有 | 有 |

## TODO

- [ ] 支持 ag-grid 按需加载
- [*] 支持 ag-grid 自定义单元格
- [ ] 支持 ag-grid 行多选
- [ ] 支持 ag-grid 行反向多选
- [ ] 支持 ag-grid 排序
- [ ] 支持 ag-grid header渲染