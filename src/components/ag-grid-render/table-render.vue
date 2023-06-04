<template>
  <ag-grid-vue
    :style='style'
    class='ag-theme-alpine'
    :column-defs='columnDefs'
    :row-data='config.data'
    row-selection='single'
    @grid-ready='onGridReady'
    @first-data-rendered='onFirstDataRendered'
    @selection-changed='onSelectionChanged'
    @grid-columns-changed='onGridColumnsChanged'
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
import { findIndex, isBoolean, isEqual } from 'lodash';

const props = defineProps<{
  config: TableConfig,
}>();
const emit = defineEmits(['selection-change', 'current-change']);

const {
  columnConfigs, 
  tableConfig, 
  selectionRows, 
  selectionType, 
  reserveSelectionChecked, 
  reserveSelectionIndeterminate,
  reserveSelectionSetType,
  reserveSelectionToggleAll,
  reserveSelectionRowCheckedStatusList,
  reserveSelectionToggleRow,
  selectionChecked,
  selectionIndeterminate,
  selectionRowCheckedStatusList,
  selectionToggleRow,
  selectionToggleAll,
  isSameRow
} = useTable()!;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let gridApi:any = null;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let gridColumnApi:any = null;

const defaultTableHeight = computed(() => props.config.data!.length * 42 + 49 + 17 + 2);
const style = computed(() => ({
  height: `${props.config.height || defaultTableHeight.value}px`,
  width: '100%' 
}));

const columnDefs = computed(() => columnConfigs.value.map((columnConfig, index) => {

  let cellRenderer: any = undefined;
  let customHeader: any = undefined;
  let cellRendererParams: any = {};
  let headerComponentParams: any = {};

  if (columnConfig.defaultRender) cellRenderer = CellRender;
  if (columnConfig.headerRender) customHeader = CustomHeader;

  if (columnConfig.type === 'selection') {
    cellRenderer = SelectionCellRender;
    customHeader = SelectionCustomHeader;
    cellRendererParams = {
      selectionRowCheckedStatusList,
      selectionToggleRow 
    };
    headerComponentParams = {
      selectionChecked,
      selectionIndeterminate,
      selectionToggleAll
    };
  } else if (columnConfig.type === 'reserveSelection') {
    cellRenderer = ReserveSelectionColumn;
    customHeader = ReserveSelectionCustomHeader;
    cellRendererParams = {
      reserveSelectionRowCheckedStatusList,
      reserveSelectionToggleRow
    };
    headerComponentParams = {
      reserveSelectionChecked,
      reserveSelectionIndeterminate,
      reserveSelectionSetType,
      reserveSelectionToggleAll
    };
  } else if (columnConfig.type === 'index') {
    cellRenderer = IndexCellRender;
  }

  return {
    headerName: columnConfig.label,
    field: columnConfig.prop,
    cellRenderer: cellRenderer,
    cellRendererParams: Object.assign({
      columnConfig,
      tableConfig,
      selectionRows,
      selectionType
    }, cellRendererParams),
    suppressMovable: true,
    lockPosition: columnConfig.fixed ?? undefined,
    headerComponent: customHeader,
    headerComponentParams: Object.assign({
      columnConfig,
      tableConfig,
      columnIndex: index,
      selectionRows,
      selectionType
    }, headerComponentParams),
    width: columnConfig.width ?? undefined,
    minWidth: columnConfig.minWidth ?? undefined
  };
}));

const onGridReady = (params) => {
  gridApi = params.api;
  gridColumnApi = params.columnApi;
};

const onFirstDataRendered = (params) => {
  params.api.sizeColumnsToFit();
};

const onSelectionChanged = () => {
  const selectedRows = gridApi.getSelectedRows();
  emit('current-change', selectionRows.value.map(row => row), selectedRows[0]);
};

const onGridColumnsChanged = (params) => {
  params.api.sizeColumnsToFit();
};

watch(() => selectionRows.value, () => {
  emit('selection-change', selectionRows.value.map(row => row));
}, { deep: true });

const clearSelection = () => {
  selectionRows.value.splice(0, selectionRows.value.length);
};

const getSelectionRows = () => selectionRows.value.map(row => row);
const toggleRowSelection = (row:any, selected?:boolean) => {
  const index = findIndex(selectionRows.value, r => isEqual(row, r));
  if (isBoolean(selected)) {
    if (selected === true) {
      if (index === -1) {
        selectionRows.value.push(row);
      }
    } else {
      if (index > -1) {
        selectionRows.value.splice(index, 1);
      }
    }
  } else {
    if (index === -1) {
      selectionRows.value.push(row);
    } else {
      selectionRows.value.splice(index, 1);
    }
  }
};
const toggleAllSelection = () => {
  selectionToggleAll();
};
const toggleRowExpansion = () => {
  console.error('not support');
};
const setCurrentRow = (row) => {
  gridApi.forEachNodeAfterFilter(node => {
    if (isSameRow(row, node.data)) {
      node.setSelected(true, true);
    }
  });
};
const clearSort = () => {};
const clearFilter = () => {
  console.error('not support');
};
const doLayout = () => {
  console.error('not support');
};
const sort = () => {
  console.error('not support');
};
const scrollTo = () => {
  console.error('not support');
};
const setScrollTop = () => {
  console.error('not support');
};
const setScrollLeft = () => {
  throw new Error('not support');
};

defineExpose({
  clearSelection,
  getSelectionRows,
  toggleRowSelection,
  toggleAllSelection,
  toggleRowExpansion,
  setCurrentRow,
  clearSort,
  clearFilter,
  doLayout,
  sort,
  scrollTo,
  setScrollTop,
  setScrollLeft
});

</script>

<style scoped>

</style>