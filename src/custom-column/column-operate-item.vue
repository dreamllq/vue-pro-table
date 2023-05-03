<template>
  <div class='column-operate-item'>
    <div class='operate-icon'>
      <el-icon><i-rank /></el-icon>
    </div>
    <div class='operate-check'>
      <el-checkbox :model-value='show' @update:model-value='onUpdateModelValue' />
    </div>
    <div class='operate-label'>
      <span>{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Rank as IRank } from '@element-plus/icons';

defineProps<{
  show: boolean,
  label: string
}>();

const emit = defineEmits(['update:modelValue']);

const onUpdateModelValue = (val: boolean) => {
  emit('update:modelValue', val);
};
</script>

<style scoped lang="scss">
.column-operate-item {
  display: flex;
  align-items: center;
  height: 30px;

  .operate-icon{
    width: 30px;
  }
  
  .operate-check{
    width: 30px;
  }

  .operate-label{
    flex: 1;
  }
}
</style>