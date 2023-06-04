<template>
  <div class='section-alert'>
    <template v-if='rowSelection.type === "positive"'>
      已选择
      <strong>{{ rowSelection.rows.length }}</strong>
      条
    </template>

    <template v-if='rowSelection.type === "reverse"'>
      已选择全部，并排除
      <strong>{{ rowSelection.rows.length }}</strong>
      条
    </template>

    <el-button
      v-if='rowSelection.rows.length>0'
      type='primary'
      link
      @click='onClear'>
      <template v-if='rowSelection.type === "positive"'>
        取消选择
      </template>
      <template v-if='rowSelection.type === "reverse"'>
        取消排除
      </template>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useTable } from '@/use-table';

const emit = defineEmits(['clear']);
const { rowSelection } = useTable()!;

const onClear = () => {
  emit('clear');
};
</script>

<style scoped lang="scss">
.section-alert{
  line-height: 22px;
  padding: 12px 24px;
  border-radius: 4px;
  background-color: var(--el-fill-color-lighter);
  margin-bottom: 8px;
  font-size: 14px;
}
</style>