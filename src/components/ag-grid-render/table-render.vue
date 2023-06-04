<template>
  <ag-grid-vue
    :style='style'
    class='ag-theme-alpine'
    :column-defs='columnDefs'
    :row-data='config.data'
    row-selection='single'
    @grid-ready='onGridReady'
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
import SelectionCellRender from './selection-column/cell-render.vue';
import SelectionCustomHeader from './selection-column/custom-header';

const props = defineProps<{
  config: TableConfig,
}>();
const emit = defineEmits(['selection-change']);

const { columnConfigs, rowSelection, tableConfig } = useTable()!;

let gridApi:any = null;
let gridColumnApi:any = null;

const defaultTableHeight = computed(() => props.config.data!.length * 42 + 49 + 17 + 2);
const style = computed(() => ({ height: `${props.config.height || defaultTableHeight.value}px` }));
const columnDefs = computed(() => columnConfigs.value.map((columnConfig) => {

  let cellRenderer: any = undefined;
  let customHeader: any = undefined;

  if (columnConfig.defaultRender) cellRenderer = CellRender;
  if (columnConfig.type === 'selection') {
    cellRenderer = SelectionCellRender;
    customHeader = SelectionCustomHeader;
  }

  return {
    headerName: columnConfig.label,
    field: columnConfig.prop,
    cellRenderer: cellRenderer,
    cellRendererParams: {
      columnConfig,
      rowSelection,
      tableConfig 
    },
    suppressMovable: true,
    lockPosition: columnConfig.fixed ?? undefined,
    headerComponent: customHeader,
    headerComponentParams: {
      columnConfig,
      rowSelection,
      tableConfig 
    }
  };
}));

const onGridReady = (params) => {
  gridApi = params.api;
  gridColumnApi = params.columnApi;
};

const clearSelection = () => {
  rowSelection.rows.splice(0, rowSelection.rows.length);
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