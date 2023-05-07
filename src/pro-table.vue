<template>
  <pro-table-wrapper
    ref='proTableWrapperRef'
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
    <slot />
  </pro-table-wrapper>
</template>

<script setup lang="ts">
import ProTableWrapper from '@/pro-table-wrapper.vue';
import { provide, withDefaults, ref, watchPostEffect, Ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';
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
  flexible?:boolean,
  showSectionAlert?: boolean,
  customColumnVirtualRef?: Ref<any>
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

const clearSelection: TableInstance['clearSelection'] = () => proTableWrapperRef.value!.clearSelection();
const getSelectionRows: TableInstance['getSelectionRows'] = () => proTableWrapperRef.value!.getSelectionRows();
const toggleRowSelection: TableInstance['toggleRowSelection'] = (row, selected) => proTableWrapperRef.value!.toggleRowSelection(row, selected);
const toggleAllSelection: TableInstance['toggleAllSelection'] = () => proTableWrapperRef.value!.toggleAllSelection();
const toggleRowExpansion: TableInstance['toggleRowExpansion'] = (row, expanded) => proTableWrapperRef.value!.toggleRowExpansion(row, expanded);
const setCurrentRow: TableInstance['setCurrentRow'] = (row) => proTableWrapperRef.value!.setCurrentRow(row);
const clearSort = () => proTableWrapperRef.value!.clearSort();
const clearFilter: TableInstance['clearFilter'] = (columnKeys) => proTableWrapperRef.value!.clearFilter(columnKeys);
const doLayout = () => proTableWrapperRef.value!.doLayout();
const sort: TableInstance['sort'] = (prop, order) => proTableWrapperRef.value!.sort(prop, order);
const scrollTo: TableInstance['scrollTo'] = (options, yCoord) => proTableWrapperRef.value!.scrollTo(options, yCoord);
const setScrollTop: TableInstance['setScrollTop'] = (top) => proTableWrapperRef.value!.setScrollTop(top);
const setScrollLeft: TableInstance['setScrollLeft'] = (left) => proTableWrapperRef.value!.setScrollLeft(left);

const getReserveSelection = () => proTableWrapperRef.value!.getReserveSelection();

defineExpose({
  getReserveSelection,
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

<style scoped lang="scss">
.pro-table{
  display: flex;
  flex-direction: column;

  .section-alert{
    flex: none;
  }

  .table-main{
    flex: 1;
    overflow: hidden;
  }
}
</style>