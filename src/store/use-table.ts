import { ref, inject, computed, reactive, Ref } from 'vue';
import { createGlobalState } from '@vueuse/core';
import { ColumnConfig, CustomColumnConfig, TableConfig } from '@/types';
import { findIndex, cloneDeep } from 'lodash';

const getStore = () => createGlobalState(() => {
  const _configs = ref<ColumnConfig[]>([]);
  const _columns = ref<CustomColumnConfig[]>([]);
  const rowSelection = reactive<{
    rows: any[],
    type: 'reverse' | 'positive'
      }>({
        rows: [],
        type: 'positive' 
      });

  const tableConfig = ref<TableConfig>({});

  const insertConfig = (config: ColumnConfig, index: number) => {
    _configs.value.splice(index, 0, config);
  };
  
  const removeConfig = (config: ColumnConfig) => {
    const index = findIndex(_configs.value, (o) => o.id === config.id);
    _configs.value.splice(index, 1);
  };

  const getCustomColumns = () => cloneDeep(columns.value);

  const updateCustomColumns = (customColumns:CustomColumnConfig[]) => {
    _columns.value = cloneDeep(customColumns);
  };

  const configMap = computed(() => _configs.value.reduce((acc:{[index:string]: ColumnConfig}, item) => {
    acc[item.prop] = item;
    return acc;
  }, {}));

  const columns = computed(() => {
    const cs:CustomColumnConfig[] = [];
    _columns.value.forEach(item => {
      const c = _configs.value.find(({ prop }) => prop === item.prop);
      if (c) {
        cs.push(item);
      }
    });

    _configs.value.forEach(item => {
      const t = _columns.value.find(({ prop }) => prop === item.prop);
      if (!t) {
        cs.push({
          prop: item.prop,
          show: !item.defaultHidden,
          label: item.label!,
          disabled: item.disabled!
        });
      }
    });

    return cs;
  });

  const columnConfigs = computed(() => {
    const cs:ColumnConfig[] = [];
    columns.value.filter((item) => item.show === true).forEach(item => {
      const c = _configs.value.find(({ prop }) => prop === item.prop);
      if (c) {
        cs.push(c);
      }
    });
    return cs;
  });

  const setTableConfig = (c) => {
    console.log('setTableConfig', c);
    tableConfig.value = c;
  };

  return {
    tableConfig: tableConfig as Readonly<Ref<TableConfig>>,
    rowSelection,
    columnConfigs,
    configMap,
    columns,
    insertConfig,
    removeConfig,
    getCustomColumns,
    updateCustomColumns,
    setTableConfig
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