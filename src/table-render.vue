<template>
  <el-table
    ref='tableRef'
    :data='config.data'
    :height='config.height'
    :max-height='config.maxHeight'
    :stripe='config.stripe'
    :border='config.border'
    :size='config.size'
    :fit='config.fit'
    :show-header='config.showHeader'
    :highlight-current-row='config.highlightCurrentRow'
    :current-row-key='config.currentRowKey'
    :row-class-name='config.rowClassName'
    :row-style='config.rowStyle'
    :cell-class-name='config.cellClassName'
    :cell-style='config.cellStyle'
    :header-row-class-name='config.headerRowClassName'
    :header-row-style='config.headerRowStyle'
    :header-cell-class-name='config.headerCellClassName'
    :header-cell-style='config.headerCellStyle'
    :row-key='config.rowKey'
    :empty-text='config.emptyText'
    :default-expand-all='config.defaultExpandAll'
    :expand-row-keys='config.expandRowKeys'
    :default-sort='config.defaultSort'
    :tooltip-effect='config.tooltipEffect'
    :tooltip-options='config.tooltipOptions'
    :show-summary='config.showSummary'
    :sum-text='config.sumText'
    :summary-method='config.summaryMethod'
    :span-method='config.spanMethod'
    :select-on-indeterminate='config.selectOnIndeterminate'
    :indent='config.indent'
    :lazy='config.lazy'
    :load='config.load'
    :tree-props='config.treeProps'
    :table-layout='config.tableLayout'
    :scrollbar-always-on='config.scrollbarAlwaysOn'
    :flexible='config.flexible'
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
    @expand-change='onExpandChange'
  >
    <template v-for='columnConfig in columnConfigs' :key='columnConfig.id'>
      <table-column-render :config='columnConfig' />
    </template>

    <template #append>
      <slot name='append' />
    </template>

    <template #empty>
      <slot name='empty' />
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTable } from '@/store/use-table';
import TableColumnRender from '@/table-column-render.tsx';
import { TableConfig } from '@/types';
import type { TableInstance } from 'element-plus';

defineProps<{
  config: TableConfig,
}>();

const { columnConfigs } = useTable();

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

const tableRef = ref<TableInstance>();

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