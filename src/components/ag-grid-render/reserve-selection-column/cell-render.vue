<template>
  <el-checkbox :model-value='checked' @change='onUpdateModelValue' />
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
const rowCheckedStatusList = computed<boolean[]>(() => props.params.reserveSelectionRowCheckedStatusList.value);
const rowIndex = computed(() => props.params.rowIndex);
// eslint-disable-next-line vue/no-setup-props-destructure
const reserveSelectionToggleRow = props.params.reserveSelectionToggleRow;

const checked = computed(() => rowCheckedStatusList.value[rowIndex.value]);

const onUpdateModelValue = (val) => {
  reserveSelectionToggleRow(tableConfig.value.data?.[rowIndex.value], val);
};

</script>

<style scoped>

</style>