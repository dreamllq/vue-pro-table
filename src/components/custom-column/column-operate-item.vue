<template>
  <div class='column-operate-item'>
    <div class='operate-icon'>
      <i class='iconfont pro-table-icon-holder' />
    </div>
    <div class='operate-check'>
      <el-checkbox :disabled='disabled' :model-value='show' @update:model-value='onUpdateModelValue' />
    </div>
    <div class='operate-label'>
      <span>{{ label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  show: boolean,
  label: string,
  disabled: boolean
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

  &.sortable-chosen{
    background-color: #F5F7FA;
    border: 2px solid var(--el-color-primary);
    border-radius: 2px;
  }

  .operate-icon{
    width: 30px;
    font-size: 14px;
    color: #666;
    cursor: move;
  }
  
  .operate-check{
    width: 30px;
  }

  .operate-label{
    flex: 1;
  }
}
</style>