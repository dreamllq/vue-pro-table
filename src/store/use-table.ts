import { ref, inject, computed } from 'vue';
import { createGlobalState } from '@vueuse/core';
import { ColumnConfig } from '@/types';
import { findIndex } from 'lodash';

const getStore = () => createGlobalState(() => {
  const _configs = ref<ColumnConfig[]>([]);
  const sort = ref<string[]>([]);

  const insertConfig = (config: ColumnConfig, index: number) => {
    _configs.value.splice(index, 0, config);
  };
  
  const removeConfig = (config: ColumnConfig) => {
    const index = findIndex(_configs.value, (o) => o.id === config.id);
    _configs.value.splice(index, 1);
  };

  const configs = computed(() => _configs.value);

  return {
    configs,
    insertConfig,
    removeConfig
  };
});

const storeMap:{[index: string]: ReturnType<typeof getStore>} = {};

export const useTable = () => {
  const tableId: string = inject('tableId')!;

  if (!storeMap[tableId]) {
    storeMap[tableId] = getStore();
  }
  return storeMap[tableId]();
};

export const clearTable = () => {
  const tableId: string = inject('tableId')!;
  delete storeMap[tableId];
};