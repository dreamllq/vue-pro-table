<template>
  <div class='section-alert'>
    <template v-if='selectionType === "positive"'>
      已选择
      <strong>{{ selectionRows.length }}</strong>
      条
    </template>

    <template v-if='selectionType === "reverse"'>
      已选择全部，并排除
      <strong>{{ selectionRows.length }}</strong>
      条
    </template>

    <el-button
      v-if='selectionRows.length>0'
      type='primary'
      link
      @click='onClear'>
      <template v-if='selectionType === "positive"'>
        取消选择
      </template>
      <template v-if='selectionType === "reverse"'>
        取消排除
      </template>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useTable } from '@/use-table';

const emit = defineEmits(['clear']);
const { selectionType, selectionRows } = useTable()!;

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