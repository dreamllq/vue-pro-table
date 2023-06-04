<template>
  <el-checkbox :model-value='checked' @change='onUpdateModelValue' />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTable } from '@/use-table';

const props = defineProps<{ row:any, column:any, index:number }>();

const {
  reserveSelectionRowCheckedStatusList,
  reserveSelectionToggleRow
} = useTable()!;


const checked = computed(() => reserveSelectionRowCheckedStatusList.value[props.index]);

const onUpdateModelValue = (val) => {
  reserveSelectionToggleRow(props.row, val);
};

</script>

<style scoped>

</style>