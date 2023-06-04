<template>
  <div class='selection-header'>
    <el-checkbox :model-value='reserveSelectionChecked' :indeterminate='reserveSelectionIndeterminate' @change='reserveSelectionToggleAll' />
    <el-dropdown trigger='click' @command='onCommand'>
      <span class='el-dropdown-link'>
        <i class='iconfont pro-table-icon-down' />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if='selectionType === "reverse"' :command='COMMAND_POSITIVE'>
            取消全选
          </el-dropdown-item>
          <el-dropdown-item v-if='selectionType === "positive"' :command='COMMAND_REVERSE'>
            全部选择
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown> 
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import { useTable } from '@/use-table';

const COMMAND_POSITIVE = 'positiveModel';
const COMMAND_REVERSE = 'reverseModel';

const props = defineProps<{ column: any, index: number }>();

const {
  tableConfig,
  selectionRows, 
  selectionType, 
  reserveSelectionChecked, 
  reserveSelectionIndeterminate,
  reserveSelectionSetType,
  reserveSelectionToggleAll
} = useTable()!;

watch(() => tableConfig.value.data, () => {
  if (props.column.reserveSelection === false) {
    selectionRows.value.splice(0, selectionRows.value.length);
  }
}, { deep: true });

const onCommand = (command) => {
  if (command === COMMAND_POSITIVE) {
    reserveSelectionSetType('positive');
  } else if (command === COMMAND_REVERSE) {
    reserveSelectionSetType('reverse');
  }
};
</script>

<style scoped lang="scss">
.el-dropdown-link{
  line-height: 32px;
  margin-left: 4px;
  cursor: pointer;
  i{
    font-size: 14px;
  }
}
</style>