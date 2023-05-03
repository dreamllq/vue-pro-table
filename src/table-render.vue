<template>
  <el-table
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
  >
    <template v-for='columnConfig in configs' :key='columnConfig.id'>
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
import { useTable } from '@/store/use-table';
import TableColumnRender from './table-column-render.tsx';
import { TableConfig } from './types';

const props = defineProps<{
  config: TableConfig
}>();

const { configs } = useTable();

</script>

<style scoped>

</style>