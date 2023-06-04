<template>
  <table-render :config='config' />
</template>

<script setup lang="ts">
import { useTable } from '@/use-table';
import TableRender from '@/components/el-table-render/table-render.vue';
import { reactive } from 'vue';

const { selectionRows } = useTable()!;
const config = reactive({ data: selectionRows.value });

</script>

<style scoped>

</style>