<template>
  <el-checkbox :checked='checked' :indeterminate='indeterminate' @change='onChange' />
</template>

<script setup lang="ts">
import { ColumnConfig, RowSelection, TableConfig } from '@/types';
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
const rowSelection = computed<RowSelection>(() => props.params.rowSelection);
const tableConfig = computed<TableConfig>(() => props.params.tableConfig.value);
const data = computed(() => tableConfig.value.data);

const checkedStatusList = computed(() => data.value?.map((row) => rowSelection.value.rows.some((r) => get(row, tableConfig.value.rowKey, undefined) === get(r, tableConfig.value.rowKey, null))) || []);
const checkedList = computed(() => checkedStatusList.value.filter(item => item === true));
const checked = computed(() => checkedList.value.length === checkedStatusList.value.length);
const indeterminate = computed(() => checkedList.value.length > 0 && checkedList.value.length < checkedStatusList.value.length);

watch(() => tableConfig.value.data, () => {
  if (columnConfig.value.reserveSelection === false) {
    rowSelection.value.rows.splice(0, rowSelection.value.rows.length);
  }
}, { deep: true });

const onChange = (val) => {
  if (val === true) {
    data.value?.forEach(row => {
      if (!rowSelection.value.rows.some(r => get(row, tableConfig.value.rowKey, undefined) === get(r, tableConfig.value.rowKey, null))) {
        rowSelection.value.rows.push(row);
      }
    });
  } else {
    data.value?.forEach(row => {
      const index = findIndex(rowSelection.value.rows, r => get(row, tableConfig.value.rowKey, undefined) === get(r, tableConfig.value.rowKey, null));
      if (index > -1) {
        rowSelection.value.rows.splice(index, 1);
      }
    });
  }
};

</script>

<style scoped>

</style>