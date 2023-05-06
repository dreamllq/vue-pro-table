<template>
  <pro-table-wrapper ref='proTableWrapperRef'>
    <slot />
  </pro-table-wrapper>
  <table-render
    ref='tableRef'
    :config='props'
    @select='onSelect'
    @select-all='onSelectAll'
    @selection-change='onSelectionChange'
    @cell-mouse-enter='onCellMouseEnter'
    @cell-mouse-leave='onCellMouseLeave'
    @cell-click='onCellClick'
    @cell-dblclick='onCellDblclick'
    @cell-contextmenu='onCellContextmenu'
    @row-click='onRowClick'
    @row-contextmenu='onRowContextmenu'
    @row-dblclick='onRowDblclick'
    @header-click='onHeaderClick'
    @header-contextmenu='onHeaderContextmenu'
    @sort-change='onSortChange'
    @filter-change='onFilterChange'
    @current-change='onCurrentChange'
    @header-dragend='onHeaderDragend'
    @expand-change='onExpandChange'>
    <template #append>
      <slot name='append' />
    </template>

    <template #empty>
      <slot name='empty' />
    </template>
  </table-render>
</template>

<script setup lang="ts">
import ProTableWrapper from './pro-table-wrapper.vue';
import { provide, withDefaults, ref, watchPostEffect } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import TableRender from './table-render.vue';
import { CustomColumnConfig } from './types';
import type { TableInstance } from 'element-plus';

provide('tableId', uuidv4());

const props = withDefaults(defineProps<{
  data?: any[],
  height?: number | string,
  maxHeight?: number | string,
  stripe?: boolean,
  border?:boolean,
  size?: 'large' | 'default' | 'small',
  fit?: boolean,
  showHeader?: boolean,
  highlightCurrentRow?: boolean,
  currentRowKey?: string | number,
  rowClassName?:((option:{ row: any, rowIndex: number })=>string) | string,
  rowStyle?: any,
  cellClassName?: any,
  cellStyle?:any,
  headerRowClassName?: any,
  headerRowStyle?: any,
  headerCellClassName?: any,
  headerCellStyle?:any,
  rowKey?:any,
  emptyText?:string,
  defaultExpandAll?: boolean,
  expandRowKeys?:any[],
  defaultSort?: any,
  tooltipEffect?: 'dark' | 'light',
  tooltipOptions?: any,
  showSummary?: boolean,
  sumText?: string,
  summaryMethod?: any,
  spanMethod?: any,
  selectOnIndeterminate?:boolean,
  indent?:number,
  lazy?:boolean,
  load?:any,
  treeProps?: any,
  tableLayout?: 'fixed' | 'auto',
  scrollbarAlwaysOn?: boolean,
  flexible?:boolean
}>(), {
  fit: true,
  showHeader: true,
  selectOnIndeterminate: true
}); 

const emit = defineEmits([
  'select',
  'select-all',
  'selection-change',
  'cell-mouse-enter',
  'cell-mouse-leave',
  'cell-click',
  'cell-dblclick',
  'cell-contextmenu',
  'row-click',
  'row-contextmenu',
  'row-dblclick',
  'header-click',
  'header-contextmenu',
  'sort-change',
  'filter-change',
  'current-change',
  'header-dragend',
  'expand-change'
]);

const proTableWrapperRef = ref<InstanceType<typeof ProTableWrapper>>();
const tableRef = ref<InstanceType<typeof TableRender>>();

watchPostEffect(() => {
  proTableWrapperRef.value?.setTableConfig(props);
});

const onSelect = (...args:any[]) => emit('select', ...args);
const onSelectAll = (...args:any[]) => emit('select-all', ...args);
const onSelectionChange = (...args: any[]) => emit('selection-change', ...args);
const onCellMouseEnter = (...args: any[]) => emit('cell-mouse-enter', ...args);
const onCellMouseLeave = (...args: any[]) => emit('cell-mouse-leave', ...args);
const onCellClick = (...args: any[]) => emit('cell-click', ...args);
const onCellDblclick = (...args: any[]) => emit('cell-dblclick', ...args);
const onCellContextmenu = (...args: any[]) => emit('cell-contextmenu', ...args);
const onRowClick = (...args: any[]) => emit('row-click', ...args);
const onRowContextmenu = (...args: any[]) => emit('row-contextmenu', ...args);
const onRowDblclick = (...args: any[]) => emit('row-dblclick', ...args);
const onHeaderClick = (...args: any[]) => emit('header-click', ...args);
const onHeaderContextmenu = (...args: any[]) => emit('header-contextmenu', ...args);
const onSortChange = (...args: any[]) => emit('sort-change', ...args);
const onFilterChange = (...args: any[]) => emit('filter-change', ...args);
const onCurrentChange = (...args: any[]) => emit('current-change', ...args);
const onHeaderDragend = (...args: any[]) => emit('header-dragend', ...args);
const onExpandChange = (...args: any[]) => emit('expand-change', ...args);

const clearSelection: TableInstance['clearSelection'] = () => tableRef.value!.clearSelection();
const getSelectionRows: TableInstance['getSelectionRows'] = () => tableRef.value!.getSelectionRows();
const toggleRowSelection: TableInstance['toggleRowSelection'] = (row, selected) => tableRef.value!.toggleRowSelection(row, selected);
const toggleAllSelection: TableInstance['toggleAllSelection'] = () => tableRef.value!.toggleAllSelection();
const toggleRowExpansion: TableInstance['toggleRowExpansion'] = (row, expanded) => tableRef.value!.toggleRowExpansion(row, expanded);
const setCurrentRow: TableInstance['setCurrentRow'] = (row) => tableRef.value!.setCurrentRow(row);
const clearSort = () => tableRef.value!.clearSort();
const clearFilter: TableInstance['clearFilter'] = (columnKeys) => tableRef.value!.clearFilter(columnKeys);
const doLayout = () => tableRef.value!.doLayout();
const sort: TableInstance['sort'] = (prop, order) => tableRef.value!.sort(prop, order);
const scrollTo: TableInstance['scrollTo'] = (options, yCoord) => tableRef.value!.scrollTo(options, yCoord);
const setScrollTop: TableInstance['setScrollTop'] = (top) => tableRef.value!.setScrollTop(top);
const setScrollLeft: TableInstance['setScrollLeft'] = (left) => tableRef.value!.setScrollLeft(left);

const getCustomColumns = () => proTableWrapperRef.value!.getCustomColumns();
const updateCustomColumns = (customColumns:CustomColumnConfig[]) => {
  proTableWrapperRef.value!.updateCustomColumns(customColumns);
};

defineExpose({
  getCustomColumns,
  updateCustomColumns,
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