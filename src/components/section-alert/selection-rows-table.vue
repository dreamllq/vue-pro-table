<template>
  <table-render :config='config' />
</template>

<script setup lang="ts">
import { useTable } from '@/store/use-table';
import TableRender from '@/table-render.vue';
import { reactive } from 'vue';

const { rowSelection } = useTable();
const config = reactive({ data: rowSelection.rows });

</script>

<style scoped>

</style>