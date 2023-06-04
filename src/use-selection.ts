import { Ref, computed } from 'vue';
import { SelectionRows, TableConfig } from './types';
import { findIndex } from 'lodash';

export const useSelection = ({
  selectionRows,
  tableConfig,
  isSameRow
} :{
  selectionRows: Ref<SelectionRows>,
  tableConfig:Ref<TableConfig>,
  isSameRow: (a:any, b:any) => boolean
}) => {
  const rowCheckedStatusList = computed(() => tableConfig.value.data?.map((row) => selectionRows.value.some((r) => isSameRow(row, r))) || []);
  const rowCheckedList = computed(() => rowCheckedStatusList.value.filter(item => item === true));
  const checked = computed(() => rowCheckedList.value.length === rowCheckedStatusList.value.length);
  const indeterminate = computed(() => rowCheckedList.value.length > 0 && rowCheckedList.value.length < rowCheckedStatusList.value.length);

  const toggleRowSelection = (row, selected) => {
    const index = findIndex(selectionRows.value, item => isSameRow(item, row));
    if (selected === true) {
      if (index === -1) {
        selectionRows.value.push(row);
      }
    } else {
      if (index !== -1) {
        selectionRows.value.splice(index, 1);
      }
    }
  };

  const toggleAllSelection = () => {
    const val = !checked.value;
    if (val === true) {
      tableConfig.value.data?.forEach(row => {
        if (!selectionRows.value.some(r => isSameRow(row, r))) {
          selectionRows.value.push(row);
        }
      });
    } else {
      tableConfig.value.data?.forEach(row => {
        const index = findIndex(selectionRows.value, r => isSameRow(row, r));
        if (index > -1) {
          selectionRows.value.splice(index, 1);
        }
      });
    }
  };

  return {
    checked,
    indeterminate,
    rowCheckedStatusList,
    toggleRowSelection,
    toggleAllSelection
  };
};