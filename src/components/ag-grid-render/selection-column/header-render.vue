<template>
  <el-checkbox :model-value='checked' :indeterminate='indeterminate' @change='onChange' />
</template>

<script setup lang="ts">
import { ColumnConfig, SelectionRows, TableConfig } from '@/types';
import { ElCheckbox } from 'element-plus';
import { findIndex, get } from 'lodash';
import { watch, computed } from 'vue';
const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  }
});


const columnConfig = computed<ColumnConfig>(() => props.params.columnConfig);
const selectionRows = computed<SelectionRows>(() => props.params.selectionRows.value);
const tableConfig = computed<TableConfig>(() => props.params.tableConfig.value);
const data = computed(() => tableConfig.value.data);

const checkedStatusList = computed(() => data.value?.map((row) => selectionRows.value.some((r) => get(row, tableConfig.value.rowKey, undefined) === get(r, tableConfig.value.rowKey, null))) || []);
const checkedList = computed(() => checkedStatusList.value.filter(item => item === true));
const checked = computed(() => checkedList.value.length === checkedStatusList.value.length);
const indeterminate = computed(() => checkedList.value.length > 0 && checkedList.value.length < checkedStatusList.value.length);

watch(() => tableConfig.value.data, () => {
  if (columnConfig.value.reserveSelection === false) {
    selectionRows.value.splice(0, selectionRows.value.length);
  }
}, { deep: true });

const onChange = (val) => {
  if (val === true) {
    data.value?.forEach(row => {
      if (!selectionRows.value.some(r => get(row, tableConfig.value.rowKey, undefined) === get(r, tableConfig.value.rowKey, null))) {
        selectionRows.value.push(row);
      }
    });
  } else {
    data.value?.forEach(row => {
      const index = findIndex(selectionRows.value, r => get(row, tableConfig.value.rowKey, undefined) === get(r, tableConfig.value.rowKey, null));
      if (index > -1) {
        selectionRows.value.splice(index, 1);
      }
    });
  }
};

</script>

<style scoped>

</style>