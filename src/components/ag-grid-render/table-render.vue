<template>
  <ag-grid-vue
    :style='style'
    class='ag-theme-alpine'
    :column-defs='columnDefs'
    :row-data='config.data'
    row-selection='multiple'
    @grid-ready='onGridReady'
    @selection-changed='onSelectionChanged'
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
  gridApi = params.api;
  gridColumnApi = params.columnApi;
};

const onSelectionChanged = () => {
  var selectedRows = gridApi!.getSelectedRows();
  emit('selection-change', selectedRows);
};

</script>

<style scoped>

</style>