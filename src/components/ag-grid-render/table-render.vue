<template>
  <ag-grid-vue
    :style='style'
    class='ag-theme-alpine'
    :column-defs='columnDefs'
    :row-data='config.data'
    row-selection='multiple'
    @grid-ready='onGridReady'
    @pagination-changed='onPaginationChanged'
    @selection-changed='onSelectionChanged'
  />
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridVue } from 'ag-grid-vue3';
import { useTable } from '@/use-table';
import { TableConfig } from '@/types';
import CellRender from './cell-render.tsx';

const props = defineProps<{
  config: TableConfig,
}>();

const emit = defineEmits(['selection-change']);

const { columnConfigs } = useTable()!;

let gridApi:any = null;
let gridColumnApi:any = null;

const defaultTableHeight = computed(() => props.config.data!.length * 42 + 49 + 17 + 2);

const style = computed(() => ({ height: `${props.config.height || defaultTableHeight.value}px` }));

const columnDefs = computed(() => columnConfigs.value.map((columnConfig, index) => ({
  headerName: columnConfig.label,
  field: columnConfig.prop,
  cellRenderer: columnConfig.defaultRender ? CellRender : undefined,
  cellRendererParams: { index },
  suppressMovable: true,
  lockPosition: columnConfig.fixed ?? undefined,
  checkboxSelection: columnConfig.type === 'selection',
  headerCheckboxSelection: columnConfig.type === 'selection'
})));

const onGridReady = (params) => {
  console.log('grid-ready');
  
  gridApi = params.api;
  gridColumnApi = params.columnApi;
};

const onPaginationChanged = (params) => {
  console.log('onPaginationChanged', params);
};

const onSelectionChanged = () => {
  const selectedRows = gridApi!.getSelectedRows();
  emit('selection-change', selectedRows);
};

const clearSelection = () => {
  gridApi!.deselectAll();
};

const getSelectionRows = () => {
  const selectedRows = gridApi!.getSelectedRows();
  return selectedRows;
};

defineExpose({
  clearSelection,
  getSelectionRows 
});

</script>

<style scoped>

</style>