import { ref, computed, Ref } from 'vue';
import { ColumnConfig, CustomColumnConfig, SelectionRows, SelectionType, TableConfig } from '@/types';
import { findIndex, cloneDeep, merge, get, isEqual } from 'lodash';
import { createInjectionState } from '@vueuse/shared';
import { useReserveSelection } from './use-reserve-selection';
import { useSelection } from './use-selection';

const [useProvideTable, useTable] = createInjectionState(() => {
  const _configs = ref<ColumnConfig[]>([]);
  const _columns = ref<CustomColumnConfig[]>([]);

  const selectionRows = ref<SelectionRows>([]);
  const selectionType = ref<SelectionType>('positive');

  const tableConfig = ref<TableConfig>({});
  
  const isSameRow = (a:any, b:any) => {
    if (tableConfig.value.rowKey) {
      return get(a, tableConfig.value.rowKey, undefined) === get(b, tableConfig.value.rowKey, undefined) && get(a, tableConfig.value.rowKey, undefined) !== undefined;
    } else {
      return isEqual(a, b);
    }
  };

  const {
    checked: reserveSelectionChecked, 
    indeterminate: reserveSelectionIndeterminate,
    setType: reserveSelectionSetType,
    toggleAllSelection: reserveSelectionToggleAll,
    rowCheckedStatusList: reserveSelectionRowCheckedStatusList,
    toggleRowSelection: reserveSelectionToggleRow
  } = useReserveSelection({
    selectionRows,
    selectionType,
    tableConfig,
    isSameRow
  });

  const {
    checked: selectionChecked, 
    indeterminate: selectionIndeterminate,
    rowCheckedStatusList: selectionRowCheckedStatusList,
    toggleRowSelection: selectionToggleRow,
    toggleAllSelection: selectionToggleAll
  } = useSelection({
    selectionRows,
    selectionType,
    tableConfig,
    isSameRow
  });

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
    selectionRows,
    selectionType,
    columnConfigs,
    configMap,
    columns,
    insertConfig,
    updateConfig,
    removeConfig,
    getCustomColumns,
    updateCustomColumns,
    setTableConfig,
    isSameRow,
    reserveSelectionChecked,
    reserveSelectionIndeterminate,
    reserveSelectionSetType,
    reserveSelectionToggleAll,
    reserveSelectionRowCheckedStatusList,
    reserveSelectionToggleRow,
    selectionChecked,
    selectionIndeterminate,
    selectionRowCheckedStatusList,
    selectionToggleRow,
    selectionToggleAll
  };
});

export {
  useProvideTable,
  useTable
};