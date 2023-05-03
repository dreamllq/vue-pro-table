<template>
  <pro-table-wrapper>
    <slot />
  </pro-table-wrapper>
  <table-render :config='props'>
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
import { provide, withDefaults } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import TableRender from './table-render.vue';

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

</script>

<style scoped>

</style>