<template>
  <div>
    <div>
      <CustomColumnPop ref="customColumnPopRef" @submit="onSubmit">
        <template #reference>
          <el-button :icon="Setting" @click="onSetting"/>
        </template>
      </CustomColumnPop>
    </div>
    <ProTable :data="data" ref="proTableRef">
      <ProTableColumn type="index" label="c" prop="c"></ProTableColumn>
      <ProTableColumn prop="a" label="aa"></ProTableColumn>
      <ProTableColumn prop="b" label="bb">
        <template #default="{row}">{{ row }}</template>
      </ProTableColumn>
    </ProTable>
  </div>
</template>

<script setup lang="ts">
import { ProTable, ProTableColumn, CustomColumnPop } from 'lc-vue-pro-table';
import { Setting } from '@element-plus/icons';
import { ref } from 'vue';
const data = ref([{
  a:10,
  b:11
}, {
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