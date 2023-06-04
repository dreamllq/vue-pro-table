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
import { computed, watch } from 'vue';
import { ElCheckbox, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus';
import { ColumnConfig, SelectionRows, SelectionType, TableConfig } from '@/types';

const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  }
});

const COMMAND_POSITIVE = 'positiveModel';
const COMMAND_REVERSE = 'reverseModel';
// eslint-disable-next-line vue/no-setup-props-destructure
const reserveSelectionSetType = props.params.reserveSelectionSetType;
// eslint-disable-next-line vue/no-setup-props-destructure
const reserveSelectionToggleAll = props.params.reserveSelectionToggleAll;
const reserveSelectionChecked = computed<boolean>(() => props.params.reserveSelectionChecked.value);
const reserveSelectionIndeterminate = computed<boolean>(() => props.params.reserveSelectionIndeterminate.value);
const columnConfig = computed<ColumnConfig>(() => props.params.columnConfig);
const selectionRows = computed<SelectionRows>(() => props.params.selectionRows.value);
const selectionType = computed<SelectionType>({
  get: () => props.params.selectionType.value,
  set: (val) => {
    // eslint-disable-next-line vue/no-mutating-props
    props.params.selectionType.value = val;
  }
});
const tableConfig = computed<TableConfig>(() => props.params.tableConfig.value);

watch(() => tableConfig.value.data, () => {
  if (columnConfig.value.reserveSelection === false) {
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