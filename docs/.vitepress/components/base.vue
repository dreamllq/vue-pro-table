<template>
  <div>
    <ProTable :data="data">
      <ProTableColumn type="index" label="c"></ProTableColumn>
      <ProTableColumn prop="a" label="aa"></ProTableColumn>
      <ProTableColumn prop="b" label="bb">
        <template #default="{row}">{{ row }}</template>
      </ProTableColumn>
    </ProTable>
  </div>
</template>

<script setup lang="ts">
import { ProTable, ProTableColumn } from 'lc-vue-pro-table';
import {ref} from 'vue';
const data = ref([{
  a:10,
  b:11
}, {
  a:20,
  b:22
}])
</script>

<style scoped>

</style>