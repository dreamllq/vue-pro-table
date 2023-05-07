<template>
  <div class="reset">
    <div>
      <el-button :icon="Setting" ref="settingRef"/>
    </div>
    <ProTable :data="data" ref="proTableRef" rowKey="id" :customColumnVirtualRef="settingRef">
      <ProTableColumn type="reserveSelection" label="跨页选择" prop="reserveSelection">
      </ProTableColumn>
      <ProTableColumn type="index" label="c" prop="c"></ProTableColumn>
      <ProTableColumn prop="a" label="aa"></ProTableColumn>
      <ProTableColumn prop="b" label="bb" disabled>
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
</script>

<style scoped>

</style>