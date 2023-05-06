<template>
  <el-dialog
    v-model='visible'
    :title='title'
    width='60%'
  >
    <selection-rows-table />
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTable } from '@/store/use-table';
import SelectionRowsTable from './selection-rows-table.vue';

const { rowSelection } = useTable();
const title = computed(() => {
  if (rowSelection.type === 'positive') {
    return '选中记录';
  } else {
    return '全选排除记录';
  }
});
const visible = ref(false);

const show = () => {
  visible.value = true;
};

defineExpose({ show });
</script>

<style scoped>

</style>