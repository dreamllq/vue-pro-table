import { ref, computed, reactive, Ref } from 'vue';
import { ColumnConfig, CustomColumnConfig, TableConfig } from '@/types';
import { findIndex, cloneDeep, merge } from 'lodash';
import { createInjectionState } from '@vueuse/shared';

const [useProvideTable, useTable] = createInjectionState(() => {
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

  const updateConfig = (config) => {
    const index = findIndex(_configs.value, (o) => o.id === config.id);
    merge(_configs.value[index], config);
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
    tableConfig.value = c;
  };

  return {
    tableConfig: tableConfig as Readonly<Ref<TableConfig>>,
    rowSelection,
    columnConfigs,
    configMap,
    columns,
    insertConfig,
    updateConfig,
    removeConfig,
    getCustomColumns,
    updateCustomColumns,
    setTableConfig
  };
});

export {
  useProvideTable,
  useTable
};