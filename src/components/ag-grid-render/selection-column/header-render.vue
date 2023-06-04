<template>
  <el-checkbox :model-value='selectionChecked' :indeterminate='selectionIndeterminate' @change='onChange' />
</template>

<script setup lang="ts">
import { ColumnConfig, SelectionRows, TableConfig } from '@/types';
import { ElCheckbox } from 'element-plus';
import { watch, computed } from 'vue';
const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  }
});


const columnConfig = computed<ColumnConfig>(() => props.params.columnConfig);
const selectionRows = computed<SelectionRows>(() => props.params.selectionRows.value);
const tableConfig = computed<TableConfig>(() => props.params.tableConfig.value);
const selectionChecked = computed(() => props.params.selectionChecked.value);
const selectionIndeterminate = computed(() => props.params.selectionIndeterminate.value);
// eslint-disable-next-line vue/no-setup-props-destructure
const selectionToggleAll = props.params.selectionToggleAll;

watch(() => tableConfig.value.data, () => {
  if (columnConfig.value.reserveSelection === false) {
    selectionRows.value.splice(0, selectionRows.value.length);
  }
}, { deep: true });

const onChange = (val) => {
  selectionToggleAll(val);
};

</script>

<style scoped>

</style>