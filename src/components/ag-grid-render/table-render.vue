<template>
  <ag-grid-vue
    :style='style'
    class='ag-theme-alpine'
    :column-defs='columnDefs'
    :row-data='config.data'
    row-selection='single'
    @grid-ready='onGridReady'
    @first-data-rendered='onFirstDataRendered'
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
import CustomHeader from './custom-header.ts';
import SelectionCellRender from './selection-column/cell-render.vue';
import SelectionCustomHeader from './selection-column/custom-header';
import IndexCellRender from './index-column/cell-render.vue';
import ReserveSelectionColumn from './reserve-selection-column/cell-render.vue';
import ReserveSelectionCustomHeader from './reserve-selection-column/custom-header';

const props = defineProps<{
  config: TableConfig,
}>();
const emit = defineEmits(['selection-change']);

const { columnConfigs, tableConfig, selectionRows, selectionType } = useTable()!;

let gridApi:any = null;
let gridColumnApi:any = null;

const defaultTableHeight = computed(() => props.config.data!.length * 42 + 49 + 17 + 2);
const style = computed(() => ({
  height: `${props.config.height || defaultTableHeight.value}px`,
  width: '100%' 
}));
const columnDefs = computed(() => columnConfigs.value.map((columnConfig, index) => {

  let cellRenderer: any = undefined;
  let customHeader: any = undefined;

  if (columnConfig.defaultRender) cellRenderer = CellRender;
  if (columnConfig.headerRender) customHeader = CustomHeader;

  if (columnConfig.type === 'selection') {
    cellRenderer = SelectionCellRender;
    customHeader = SelectionCustomHeader;
  } else if (columnConfig.type === 'reserveSelection') {
    cellRenderer = ReserveSelectionColumn;
    customHeader = ReserveSelectionCustomHeader;
  } else if (columnConfig.type === 'index') {
    cellRenderer = IndexCellRender;
  }

  return {
    headerName: columnConfig.label,
    field: columnConfig.prop,
    cellRenderer: cellRenderer,
    cellRendererParams: {
      columnConfig,
      tableConfig,
      selectionRows,
      selectionType
    },
    suppressMovable: true,
    lockPosition: columnConfig.fixed ?? undefined,
    headerComponent: customHeader,
    headerComponentParams: {
      columnConfig,
      tableConfig,
      columnIndex: index,
      selectionRows,
      selectionType
    },
    width: columnConfig.width ?? undefined,
    minWidth: columnConfig.minWidth ?? undefined
  };
}));


const autoSizeAll = (skipHeader) => {
  const allColumnIds:any[] = [];
  gridColumnApi.getColumns().forEach((column) => {
    allColumnIds.push(column.getId());
  });
  gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
};

const onGridReady = (params) => {
  gridApi = params.api;
  gridColumnApi = params.columnApi;
};

const onFirstDataRendered = (params) => {
  params.api.sizeColumnsToFit();
};

watch(() => selectionRows.value, () => {
  emit('selection-change', selectionRows.value.map(row => row));
}, { deep: true });

const clearSelection = () => {
  selectionRows.value.splice(0, selectionRows.value.length);
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