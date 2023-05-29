<template>
  <el-checkbox :model-value='checked' @change='onUpdateModelValue' />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTable } from '@/use-table';
import { get, findIndex } from 'lodash';

const props = defineProps<{ row:any, column:any, index:number }>();

const { rowSelection, tableConfig } = useTable()!;

const currentKey = computed(() => get(props.row, tableConfig.value.rowKey));

const checked = computed(() => {
  const has = rowSelection.rows.some((item) => currentKey.value === get(item, tableConfig.value.rowKey));

  if (rowSelection.type === 'positive') {
    return has;
  } else {
    return !has;
  }
});

const onUpdateModelValue = (val) => {
  if (rowSelection.type === 'positive') {
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
  const index = findIndex(rowSelection.rows, (item) => get(item, tableConfig.value.rowKey) === currentKey.value);
  if (index < 0) {
    rowSelection.rows.push(props.row);
  }
};

const deleteRow = () => {
  const index = findIndex(rowSelection.rows, (item) => get(item, tableConfig.value.rowKey) === currentKey.value);
  if (index > -1) {
    rowSelection.rows.splice(index, 1);
  }
};

</script>

<style scoped>

</style>