<template>
  <el-popover
    :placement='placement'
    :visible='visible'
  >
    <template #reference>
      <slot name='reference' />
    </template>

    <template #default>
      <column-operate v-if='visible' ref='columnOperateRef' :list='list' />
      <div class='popover-footer'>
        <el-button size='small' @click='visible = false'>
          取消
        </el-button>
        <el-button type='primary' size='small' @click='onSubmit'>
          确定
        </el-button>
      </div>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { CustomColumnConfig } from '@/types';
import ColumnOperate from './column-operate.vue';

defineProps({
  placement: {
    type: String as PropType<'top'| 'top-start'|'top-end'|'bottom'|'bottom-start'|'bottom-end'|'left'|'left-start'|'left-end'|'right'|'right-start'|'right-end'>,
    default: 'bottom'
  }
});

const emit = defineEmits(['submit']);

const columnOperateRef = ref();
const visible = ref(false);
const list = ref<CustomColumnConfig[]>([]);

const onSubmit = () => {
  const list = columnOperateRef.value.getData();
  console.log(list);
  emit('submit', list);
  visible.value = false;
};

const show = (l:CustomColumnConfig[]) => {
  list.value = l;
  visible.value = true;
};

defineExpose({ show });

</script>

<style scoped lang="scss">

.popover-footer{
  text-align: right;
}
</style>