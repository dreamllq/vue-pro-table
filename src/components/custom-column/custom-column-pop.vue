<template>
  <el-popover
    ref='popoverRef'
    :placement='placement'
    :virtual-ref='virtualRef'
    trigger='click'
    virtual-triggering
    @before-enter='isShow = true'
    @after-leave='isShow = false'
  >
    <template #default>
      <column-operate v-if='isShow' ref='columnOperateRef' />
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { PropType, ref, Ref } from 'vue';
import ColumnOperate from './column-operate.vue';
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


const columnOperateRef = ref<InstanceType<typeof ColumnOperate>>();
const popoverRef = ref<PopoverInstance>();

const isShow = ref(false);

</script>

<style scoped lang="scss">

.popover-footer{
  text-align: right;
  margin-top: 8px;
}
</style>