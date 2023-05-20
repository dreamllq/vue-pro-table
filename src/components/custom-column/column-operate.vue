<template>
  <div class='column-operate'>
    <div>
      <el-checkbox :model-value='allCheckState' :indeterminate='allCheckIndeterminateState' @update:model-value='onAllCheckUpdate'>
        列展示
      </el-checkbox>
    </div>
    <draggable 
      v-model='customColumns' 
      group='people' 
      handle='.operate-icon'
      item-key='id'>
      <template #item='{element}'>
        <column-operate-item
          :show='element.show'
          :label='element.label'
          :disabled='element.disabled'
          @update:model-value='(val)=>onUpdateModelValue(element, val)' />
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import { CustomColumnConfig } from '@/types';
import ColumnOperateItem from './column-operate-item.vue';
import { ref, computed, watch } from 'vue';
import draggable from 'vuedraggable';
import { cloneDeep } from 'lodash';
import { useTable } from '@/use-table';

const { columns, updateCustomColumns } = useTable()!;

const customColumns = ref<CustomColumnConfig[]>(cloneDeep(columns.value));

watch(() => customColumns.value, (val) => {
  updateCustomColumns(cloneDeep(val));
}, { deep: true });


const allCheckState = computed(() => {
  const length = customColumns.value.filter(item => item.show === true).length;
  return length === customColumns.value.length;
});
const allCheckIndeterminateState = computed(() => {
  const length = customColumns.value.filter(item => item.show === true).length;
  return length > 0 && length < customColumns.value.length;
});

const onAllCheckUpdate = (val:boolean) => {
  customColumns.value.forEach(item => {
    if (!item.disabled) {
      item.show = val;
    }
  });
};

const onUpdateModelValue = (element, val) => {
  element.show = val;
};

</script>

<style scoped>

</style>