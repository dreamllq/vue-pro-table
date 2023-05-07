<template>
  <el-popover
    ref='popoverRef'
    :placement='placement'
    :virtual-ref='virtualRef'
    trigger='click'
    virtual-triggering
  >
    <template #default>
      <column-operate ref='columnOperateRef' />
      <div class='popover-footer'>
        <el-button type='primary' size='small' @click='onSubmit'>
          确定
        </el-button>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { PropType, ref, Ref } from 'vue';
import ColumnOperate from './column-operate.vue';
import { useTable } from '@/store/use-table';
import type { PopoverInstance } from 'element-plus';

defineProps({
  placement: {
    type: String as PropType<'top'| 'top-start'|'top-end'|'bottom'|'bottom-start'|'bottom-end'|'left'|'left-start'|'left-end'|'right'|'right-start'|'right-end'>,
    default: 'bottom'
  },
  virtualRef: {
    type: Object as PropType<Ref<any>>,
    default: undefined
  }
});

const { updateCustomColumns } = useTable();

const columnOperateRef = ref<InstanceType<typeof ColumnOperate>>();
const popoverRef = ref<PopoverInstance>();

const onSubmit = () => {
  const list = columnOperateRef.value?.getData();
  updateCustomColumns(list ?? []);
  console.log(popoverRef.value?.popperRef);
  // popoverRef.value?.popperRef?.delayHide?.();
  // unref(popoverRef)?.popperRef?.delayHide?.();
};

</script>

<style scoped lang="scss">

.popover-footer{
  text-align: right;
  margin-top: 8px;
}
</style>