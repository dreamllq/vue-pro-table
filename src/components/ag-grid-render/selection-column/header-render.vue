<template>
  <el-checkbox :checked='checked' :indeterminate='indeterminate' @change='onChange' />
</template>

<script setup lang="ts">
import { RowSelection, TableConfig } from '@/types';
import { ElCheckbox } from 'element-plus';
import { findIndex, get } from 'lodash';
import { watch, computed } from 'vue';
// import { useTable } from '@/use-table';
const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  }
});

// const { columnConfigs, rowSelection } = useTable()!;

const rowSelection = computed<RowSelection>(() => props.params.rowSelection);
const tableConfig = computed<TableConfig>(() => props.params.tableConfig.value);
const data = computed(() => tableConfig.value.data);

const checkedStatusList = computed(() => data.value?.map((row) => rowSelection.value.rows.some((r) => get(row, tableConfig.value.rowKey, undefined) === get(r, tableConfig.value.rowKey, null))) || []);
const checkedList = computed(() => checkedStatusList.value.filter(item => item === true));
const checked = computed(() => checkedList.value.length === checkedStatusList.value.length);
const indeterminate = computed(() => checkedList.value.length > 0 && checkedList.value.length < checkedStatusList.value.length);

// const scope = computed(() => ({
//   row: props.params.data,
//   column: columnConfigs.value[props.params.index],
//   $index: props.params.rowIndex
// }));

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