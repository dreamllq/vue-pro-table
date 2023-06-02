<template>
  <el-checkbox />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTable } from '@/use-table';
const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  }
});

// const { columnConfigs, rowSelection } = useTable()!;

// const scope = computed(() => ({
//   row: props.params.data,
//   column: columnConfigs.value[props.params.index],
//   $index: props.params.rowIndex
// }));

</script>

<style scoped>

</style>