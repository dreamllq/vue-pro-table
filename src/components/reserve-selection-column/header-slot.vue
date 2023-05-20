<template>
  <div class='selection-header'>
    <el-checkbox :model-value='checked' :indeterminate='indeterminate' @change='onChange' />
    <el-dropdown trigger='click' @command='onCommand'>
      <span class='el-dropdown-link'>
        <i class='iconfont pro-table-icon-down' />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-if='rowSelection.type === "reverse"' :command='COMMAND_POSITIVE'>
            取消全选
          </el-dropdown-item>
          <el-dropdown-item v-if='rowSelection.type === "positive"' :command='COMMAND_REVERSE'>
            全部选择
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown> 
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTable } from '@/use-table';
import { get, intersection, findIndex } from 'lodash';

const COMMAND_POSITIVE = 'positiveModel';
const COMMAND_REVERSE = 'reverseModel';

defineProps<{ column: any, index: number }>();

const { rowSelection, tableConfig } = useTable()!;

const intersectionRowKeys = computed(() => {
  const keys = tableConfig.value.data?.map(item => get(item, tableConfig.value.rowKey));
  const selectionRowKeys = rowSelection.rows.map(item => get(item, tableConfig.value.rowKey));

  return intersection(keys, selectionRowKeys);
});

const checked = computed(() => {
  if (rowSelection.type === 'positive') {
    return intersectionRowKeys.value.length === tableConfig.value.data?.length;
  } else {
    return intersectionRowKeys.value.length === 0;
  }
});

const indeterminate = computed(() => intersectionRowKeys.value.length > 0 && intersectionRowKeys.value.length < (tableConfig.value.data?.length ?? 0));

const onCommand = (command) => {
  rowSelection.rows = [];
  if (command === COMMAND_POSITIVE) {
    rowSelection.type = 'positive';
  } else if (command === COMMAND_REVERSE) {
    rowSelection.type = 'reverse';
  }
};

const onChange = (val) => {
  if (rowSelection.type === 'positive') {
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
    const index = findIndex(rowSelection.rows, (item) => get(item, tableConfig.value.rowKey) === get(row, tableConfig.value.rowKey));
    if (index < 0) {
      rowSelection.rows.push(row);
    }
  });
};

const deleteRows = () => {
  tableConfig.value.data?.forEach(row => {
    const index = findIndex(rowSelection.rows, (item) => get(item, tableConfig.value.rowKey) === get(row, tableConfig.value.rowKey));
    if (index > -1) {
      rowSelection.rows.splice(index, 1);
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