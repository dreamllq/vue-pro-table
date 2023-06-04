<template>
  <div class='selection-header'>
    <el-checkbox :model-value='checked' :indeterminate='indeterminate' @change='onChange' />
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
import { get, intersection, findIndex } from 'lodash';
import { ColumnConfig, SelectionRows, SelectionType, TableConfig } from '@/types';

const props = defineProps({
  params: {
    type: Object,
    default: () => ({})
  }
});

const COMMAND_POSITIVE = 'positiveModel';
const COMMAND_REVERSE = 'reverseModel';
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

const intersectionRowKeys = computed(() => {
  const keys = tableConfig.value.data?.map(item => get(item, tableConfig.value.rowKey));
  const selectionRowKeys = selectionRows.value.map(item => get(item, tableConfig.value.rowKey));

  return intersection(keys, selectionRowKeys);
});

const checked = computed(() => {
  if (selectionType.value === 'positive') {
    return intersectionRowKeys.value.length === tableConfig.value.data?.length;
  } else {
    return intersectionRowKeys.value.length === 0;
  }
});

const indeterminate = computed(() => intersectionRowKeys.value.length > 0 && intersectionRowKeys.value.length < (tableConfig.value.data?.length ?? 0));

const onCommand = (command) => {
  selectionRows.value.splice(0, selectionRows.value.length);
  if (command === COMMAND_POSITIVE) {
    selectionType.value = 'positive';
  } else if (command === COMMAND_REVERSE) {
    selectionType.value = 'reverse';
  }
};

const onChange = (val) => {
  if (selectionType.value === 'positive') {
    if (val === true) {
      pushRows();
    } else {
      deleteRows();
    }
  } else {
    if (val === false) {
      pushRows();
    } else {
      deleteRows();
    }
  }
};

const pushRows = () => {
  tableConfig.value.data?.forEach(row => {
    const index = findIndex(selectionRows.value, (item) => get(item, tableConfig.value.rowKey) === get(row, tableConfig.value.rowKey));
    if (index < 0) {
      selectionRows.value.push(row);
    }
  });
};

const deleteRows = () => {
  tableConfig.value.data?.forEach(row => {
    const index = findIndex(selectionRows.value, (item) => get(item, tableConfig.value.rowKey) === get(row, tableConfig.value.rowKey));
    if (index > -1) {
      selectionRows.value.splice(index, 1);
    }
  });
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