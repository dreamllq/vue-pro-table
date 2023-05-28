<template>
  <ag-grid-vue
    :style='style'
    class='ag-theme-alpine'
    :column-defs='columnDefs'
    :row-data='config.data'
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridVue } from 'ag-grid-vue3';
import { useTable } from '@/use-table';
import { TableConfig } from '@/types';
import CellRender from './cell-render.tsx';

const props = defineProps<{
  config: TableConfig,
}>();

const { columnConfigs } = useTable()!;

const defaultTableHeight = computed(() => props.config.data!.length * 42 + 49 + 17 + 2);

const style = computed(() => ({ height: `${props.config.height || defaultTableHeight.value}px` }));

const columnDefs = computed(() => columnConfigs.value.map((columnConfig, index) => ({
  headerName: columnConfig.label,
  field: columnConfig.prop,
  cellRenderer: columnConfig.defaultRender ? CellRender : undefined,
  cellRendererParams: { index },
  suppressMovable: true
})));

</script>

<style scoped>

</style>