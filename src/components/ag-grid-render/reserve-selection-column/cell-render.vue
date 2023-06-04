<template>
  <el-checkbox :model-value='checked' @change='onUpdateModelValue' />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { findIndex, get } from 'lodash';
import { SelectionRows, SelectionType, TableConfig } from '@/types';

const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  }
});

const selectionRows = computed<SelectionRows>(() => props.params.selectionRows.value);
const selectionType = computed<SelectionType>(() => props.params.selectionType.value);
const tableConfig = computed<TableConfig>(() => props.params.tableConfig.value);
const row = computed(() => props.params.data);


const currentKey = computed(() => get(row.value, tableConfig.value.rowKey));

const checked = computed(() => {
  const has = selectionRows.value.some((item) => currentKey.value === get(item, tableConfig.value.rowKey));

  if (selectionType.value === 'positive') {
    return has;
  } else {
    return !has;
  }
});

const onUpdateModelValue = (val) => {
  if (selectionType.value === 'positive') {
    if (val === true) {
      pushRow();
    } else {
      deleteRow();
    }
  } else {
    if (val === false) {
      pushRow();
    } else {
      deleteRow();
    }
  }
};

const pushRow = () => {
  const index = findIndex(selectionRows.value, (item) => get(item, tableConfig.value.rowKey) === currentKey.value);
  if (index < 0) {
    selectionRows.value.push(row.value);
  }
};

const deleteRow = () => {
  const index = findIndex(selectionRows.value, (item) => get(item, tableConfig.value.rowKey) === currentKey.value);
  if (index > -1) {
    selectionRows.value.splice(index, 1);
  }
};

</script>

<style scoped>

</style>