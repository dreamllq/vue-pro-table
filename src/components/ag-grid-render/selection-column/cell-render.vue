<template>
  <el-checkbox :model-value='checked' @change='onChange' />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { findIndex, get } from 'lodash';
import { SelectionRows, TableConfig } from '@/types';

const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  }
});


const selectionRows = computed<SelectionRows>(() => props.params.selectionRows.value);
const tableConfig = computed<TableConfig>(() => props.params.tableConfig.value);
const row = computed(() => props.params.data);


const checked = computed(() => selectionRows.value.some(r => get(row.value, tableConfig.value.rowKey, undefined) === get(r, tableConfig.value.rowKey, null)));
const rowsIndex = computed(() => findIndex(selectionRows.value, (r) => get(row.value, tableConfig.value.rowKey, undefined) === get(r, tableConfig.value.rowKey, null)));

const onChange = (val) => {
  if (val === true) {
    selectionRows.value.push(props.params.data);
  } else {
    if (rowsIndex.value !== -1) {
      selectionRows.value.splice(rowsIndex.value, 1);
    }
  }
};

</script>

<style scoped>

</style>