<template>
  <div>
    <el-button @click="setCurrentRow">setCurrentRow</el-button>
  </div>
  <div>
    <el-checkbox v-model="showSelectionAlert">showSelectionAlert</el-checkbox>
    <el-checkbox v-model="reserveSelection">reserveSelection</el-checkbox>
  </div>
  <div>
    <el-button :icon="Setting" ref="settingRef"/>
  </div>
  <div style="height: 600px;" class="reset">
    <AutoPagination :fetch-data="fetchData" ref="pagination" auto-init >
      <template #default="{data, indexMethod}">
        <AutoHeightWrapper>
          <template #default="{size}">
            <ProTable :data="data" rowKey="id" :height="size.height" renderTableType="ag-grid" :showSelectionAlert="showSelectionAlert" ref="tableRef" :customColumnVirtualRef="settingRef" @selection-change="onSelectionChange" @row-selection-change="onRowSelectionChange">
              <ProTableColumn type="reserveSelection" label="跨页选择" prop="reserveSelection" :reserveSelection="reserveSelection"> </ProTableColumn>
              <ProTableColumn type="selection" label="选择" prop="reserveSelection1" :reserveSelection="reserveSelection"></ProTableColumn>
              <ProTableColumn type="index" label="csdfasdfasdfasdfasdfsd" prop="c"></ProTableColumn>
              <ProTableColumn prop="d" label="dasdfasdfasdf">
                <template #header="{$index}">
                  <span>{{ $index }}</span>
                </template>
              </ProTableColumn>
              <ProTableColumn prop="d2" label="dasdfasdfasdf">
                <template #header="{$index}">
                  <span>{{ $index }}</span>
                </template>
              </ProTableColumn>
              <ProTableColumn prop="d3" label="dasdfasdfasdf">
                <template #header="{$index}">
                  <span>{{ $index }}</span>
                </template>
              </ProTableColumn>
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
    <el-button @click="getRowSelection">获取选择记录</el-button>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import { AutoPagination } from 'lc-vue-auto-pagination';
import { AutoHeightWrapper } from 'lc-vue-auto-height-wrapper';
import { ProTable, ProTableColumn, CustomColumnPop } from 'lc-vue-pro-table';
import { Setting } from '@element-plus/icons';

const settingRef = ref()
const tableRef = ref<InstanceType<typeof ProTable>>()
const customColumnPopRef = ref<InstanceType<typeof CustomColumnPop>>()

const showSelectionAlert=ref(true)
const reserveSelection=ref(true)

const fetchData: InstanceType<typeof AutoPagination>['$props']['fetchData'] = async ({ pageNo, pageSize }) => {
  const list:any[] = [];

  for(let i=0; i<pageSize; i++){
    list.push({
      id: (pageNo-1)*pageSize + i,
      a: '撒旦看风景啊螺丝钉咖啡碱阿斯利康大家发阿斯利康大家flask觉得分厘卡世界的分厘卡是阿斯兰的看风景阿拉山口大家flask酱豆腐立刻',
      b: 11,
      d:'撒旦看风景啊螺丝钉咖啡碱阿斯利康大家发阿斯利康大家flask觉得分厘卡世界的分厘卡是阿斯兰的看风景阿拉山口大家flask酱豆腐立刻'
    })
  }

  return {
    list: list,
    total: 201
  }
}

const setCurrentRow = ()=>{
  tableRef.value.setCurrentRow({
      id: 2,
      a: '撒旦看风景啊螺丝钉咖啡碱阿斯利康大家发阿斯利康大家flask觉得分厘卡世界的分厘卡是阿斯兰的看风景阿拉山口大家flask酱豆腐立刻',
      b: 11,
      d:'撒旦看风景啊螺丝钉咖啡碱阿斯利康大家发阿斯利康大家flask觉得分厘卡世界的分厘卡是阿斯兰的看风景阿拉山口大家flask酱豆腐立刻'
    })
}

const getRowSelection = ()=>{
  console.log(tableRef.value.getRowSelection())
}

const onSetting = ()=>{
  const columns = tableRef.value.getCustomColumns()
  customColumnPopRef.value.show(columns)
}

const onSubmit = (list)=>{
  tableRef.value.updateCustomColumns(list)
}

const onSelectionChange = (rowSelection)=>{
  console.log('onSelectionChange', rowSelection)
}

const onRowSelectionChange = (rowSelection)=>{
  console.log('onRowSelectionChange', rowSelection)
}

</script>

<style scoped>

</style>