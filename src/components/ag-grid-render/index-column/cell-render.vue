<template>
  <span>{{ rowIndex }}</span>
</template>

<script setup lang="ts">
import { ColumnConfig } from '@/types';
import { isFunction, isNumber } from 'lodash';
import { computed } from 'vue';

const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  }
});

const columnConfig = computed<ColumnConfig>(() => props.params.columnConfig);
const rowIndex = computed<number>(() => {
  if (columnConfig.value.index) {
    if (isNumber(columnConfig.value.index)) {
      return columnConfig.value.index;
    } else if (isFunction(columnConfig.value.index)) {
      return columnConfig.value.index(props.params.rowIndex);
    }
  }
  return props.params.rowIndex + 1;
});
  
</script>

<style scoped>

</style>