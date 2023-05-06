<template>
  <div class='selection-header'>
    <el-checkbox :model-value='checked' />
    <el-dropdown trigger='click'>
      <span class='el-dropdown-link'>
        <el-icon>
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>全选所有</el-dropdown-item>
          <el-dropdown-item>反选当页</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown> 
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ArrowDown } from '@element-plus/icons-vue';
import { useTable } from '@/store/use-table';
import { get, intersection } from 'lodash';

defineProps<{ column: any, index: number }>();

const { rowSelection, tableConfig } = useTable();

const checked = computed(() => {
  const keys = tableConfig.value.data?.map(item => get(item, tableConfig.value.rowKey));
  const selectionRowKeys = rowSelection.rows.map(item => get(item, tableConfig.value.rowKey));

  const intersectionRowKeys = intersection(keys, selectionRowKeys);

  if (rowSelection.type === 'positive') {
    return intersectionRowKeys.length === tableConfig.value.data?.length;
  } else {
    return intersectionRowKeys.length === 0;
  }
});

</script>

<style scoped lang="scss">
.el-dropdown-link{
  line-height: 32px;
  margin-left: 8px;
  cursor: pointer;
}
</style>