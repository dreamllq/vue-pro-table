

<template>
  <div ref='hiddenItems' class='hidden'>
    <slot /> 
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue';
import { clearTable } from '@/store/use-table';

onUnmounted(() => {
  clearTable();
});
</script>

<style scoped lang="scss">
.pro-table{
  .hidden{
    display: none;
  }
}
</style>