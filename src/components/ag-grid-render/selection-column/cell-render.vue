<template>
  <el-checkbox :checked='checked' @change='onChange' />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { findIndex, get } from 'lodash';
import { ColumnConfig, RowSelection, TableConfig } from '@/types';

const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  }
});


const columnConfigs = computed<ColumnConfig[]>(() => props.params.columnConfigs.value);
const rowSelection = computed<RowSelection>(() => props.params.rowSelection);
const tableConfig = computed<TableConfig>(() => props.params.tableConfig.value);
const index = computed<number>(() => props.params.index);
const column = computed(() => columnConfigs.value[index.value]);
const row = computed(() => props.params.data);


const checked = computed(() => rowSelection.value.rows.some(r => get(row.value, tableConfig.value.rowKey, undefined) === get(r, tableConfig.value.rowKey, null)));
const rowsIndex = computed(() => findIndex(rowSelection.value.rows, (r) => get(row.value, tableConfig.value.rowKey, undefined) === get(r, tableConfig.value.rowKey, null)));

const onChange = (val) => {
  if (val === true) {
    rowSelection.value.rows.push(props.params.data);
  } else {
    if (rowsIndex.value !== -1) {
      rowSelection.value.rows.splice(rowsIndex.value, 1);
    }
  }
};

</script>

<style scoped>

</style>