<template>
  <div class="reset">
    <div>
      <el-button @click="clearSort">clearSort</el-button>
      <el-button @click="sort">sort</el-button>
    </div>
    <div>
      <el-button :icon="Setting" ref="settingRef"/>
    </div>
    <ProTable :data="data" ref="proTableRef" rowKey="id" :customColumnVirtualRef="settingRef" renderTableType="ag-grid" @selection-change="onSelectionChange" :defaultSort="{order:'descending', prop:'a'}"
      @sort-change="onSortChange">
      <ProTableColumn type="selection" label="选择" prop="reserveSelection"> </ProTableColumn>
      <ProTableColumn prop="id" label="id" fixed="right"></ProTableColumn>
      <ProTableColumn prop="a" label="aa" sortable :sortOrders="['ascending', 'descending']"></ProTableColumn>
      <ProTableColumn prop="b" label="bb" disabled sortable>
        <template #default="{row}">{{ row }}</template>
      </ProTableColumn>
    </ProTable>
  </div>
</template>

<script setup lang="ts">
import { ProTable, ProTableColumn, CustomColumnPop } from 'lc-vue-pro-table';
import { Setting } from '@element-plus/icons';
import { ref } from 'vue';

const settingRef = ref();

const data = ref([{
  id: 1,
  a:10,
  b:11
}, {
  id:2,
  a:20,
  b:22
}])

const customColumnPopRef = ref();
const proTableRef = ref();

const onSetting = ()=>{
  const columns = proTableRef.value.getCustomColumns()
  customColumnPopRef.value.show(columns)
}

const onSubmit = (list)=>{
  proTableRef.value.updateCustomColumns(list)
}

const onSelectionChange = (rows)=>{
  console.log(rows)
}

const onSortChange = (sort)=>{
  console.log(sort);
}

const clearSort = ()=>{
  proTableRef.value.clearSort()
}

const sort = ()=>{
  proTableRef.value.sort('a', 'descending')
}
</script>

<style scoped>

</style>