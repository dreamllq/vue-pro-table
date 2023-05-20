

<template>
  <div ref='hiddenItems' class='hidden'>
    <slot /> 
  </div>
  <div class='pro-table'>
    <div ref='sectionAlertRef' class='section-alert'>
      <section-alert v-if='config.showSelectionAlert' />
    </div>
    <div v-if='ready' class='table-main'>
      <table-render
        ref='tableRef'
        :config='tableConfigProxy'
        :section-alert-height='sectionAlertHeight'
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
    </div>
  </div>
  <custom-column-pop v-if='ready' :virtual-ref='config.customColumnVirtualRef' />
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import SectionAlert from '@/components/section-alert/index.vue';
import { useTable } from '@/use-table';
import type { TableInstance } from 'element-plus';
import { TableConfig } from '@/types';
import ElTableRender from './el-table-render/table-render.vue';
import AgGridRender from './ag-grid-render/table-render.vue';
import { cloneDeep } from 'lodash';
import CustomColumnPop from '@/components/custom-column/custom-column-pop.vue';

const { setTableConfig, rowSelection } = useTable()!;

const props = defineProps<{
  config: TableConfig,
}>();

const TableRender = computed(() => {
  const comps = {
    'el-table': ElTableRender,
    'ag-grid': AgGridRender
  };
  return comps[props.config.renderTableType];
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
  'expand-change',
  'reserve-selection-change'
]);

const sectionAlertRef = ref();
const tableRef = ref<InstanceType<typeof TableRender>>();

const sectionAlertHeight = ref(0);
const ready = ref(false);

const tableConfigProxy = computed(() => {
  let height = props.config.height;

  if (height && props.config.showSelectionAlert) {
    height = Number(height) - sectionAlertHeight.value;
  }

  return {
    ...props.config,
    height
  };
});

onMounted(() => {
  sectionAlertHeight.value = sectionAlertRef.value.clientHeight;
  ready.value = true;
});

const onSelect = (...args:any[]) => emit('select', ...args);
const onSelectAll = (...args:any[]) => emit('select-all', ...args);
const onSelectionChange = (...args: any[]) => {
  const selections = args[0];
  rowSelection.rows = cloneDeep(selections);
  rowSelection.type = 'positive';
  emit('selection-change', cloneDeep(rowSelection));
};
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

watch(rowSelection, () => {
  emit('reserve-selection-change', cloneDeep(rowSelection));
});

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

const getRowSelection = () => cloneDeep(rowSelection);


// onUnmounted(() => {
//   clearTable();
// });

defineExpose({
  getRowSelection,
  setTableConfig,
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
  .hidden{
    display: none;
  }
}

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