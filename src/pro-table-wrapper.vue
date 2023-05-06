

<template>
  <div ref='hiddenItems' class='hidden'>
    <slot /> 
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { clearTable, useTable } from '@/store/use-table';

const { getCustomColumns, updateCustomColumns, setTableConfig } = useTable();

onUnmounted(() => {
  clearTable();
});

defineExpose({
  getCustomColumns,
  updateCustomColumns,
  setTableConfig
});
</script>

<style scoped lang="scss">
.pro-table{
  .hidden{
    display: none;
  }
}
</style>