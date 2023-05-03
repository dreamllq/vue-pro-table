<template>
  <div class='column-operate'>
    <draggable 
      v-model='myArray' 
      group='people' 
      item-key='id'>
      <template #item='{element}'>
        <column-operate-item :show='element.show' :label='element.label' @update:model-value='(val)=>onUpdateModelValue(element, val)' />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { CustomColumnConfig } from '@/types';
import ColumnOperateItem from './column-operate-item.vue';
import { PropType, ref } from 'vue';
import draggable from 'vuedraggable';
import { cloneDeep } from 'lodash';


const props = defineProps({
  list: {
    type: Array as PropType<CustomColumnConfig[]>,
    default: () => []
  }
});

const myArray = ref(cloneDeep(props.list));

const onUpdateModelValue = (element, val) => {
  console.log(element, val);
  element.show = val;
};

const getData = () => cloneDeep(myArray.value);

defineExpose({ getData });
</script>

<style scoped>

</style>