<template>
  <el-checkbox :model-value='checked' @change='onChange' />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { TableConfig } from '@/types';

const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  }
});


const tableConfig = computed<TableConfig>(() => props.params.tableConfig.value);
const rowCheckedStatusList = computed<boolean[]>(() => props.params.selectionRowCheckedStatusList.value);
const rowIndex = computed(() => props.params.rowIndex);
const checked = computed(() => rowCheckedStatusList.value[rowIndex.value]);

// eslint-disable-next-line vue/no-setup-props-destructure
const selectionToggleRow = props.params.selectionToggleRow;

const onChange = (val) => {
  selectionToggleRow(tableConfig.value.data?.[rowIndex.value], val);
};

</script>

<style scoped>

</style>