import { Ref, computed } from 'vue';
import { SelectionRows, SelectionType, TableConfig } from './types';
import { findIndex, get } from 'lodash';

export const useReserveSelection = ({
  selectionRows,
  selectionType,
  tableConfig,
  isSameRow
} :{
  selectionRows: Ref<SelectionRows>,
  selectionType:Ref<SelectionType>,
  tableConfig:Ref<TableConfig>,
  isSameRow: (a:any, b:any) => boolean
}) => {

  const rowCheckedStatusList = computed(() => {
    if (selectionType.value === 'positive') {
      return tableConfig.value.data?.map(row => selectionRows.value.some(r => isSameRow(row, r))) || [];
    } else {
      return tableConfig.value.data?.map(row => !selectionRows.value.some(r => isSameRow(row, r))) || [];
    }
  });
  
  const rowCheckedList = computed(() => rowCheckedStatusList.value.filter(status => !!status));

  const checked = computed(() => rowCheckedList.value.length === tableConfig.value.data?.length && rowCheckedList.value.length > 0);

  const indeterminate = computed(() => rowCheckedList.value.length > 0 && rowCheckedList.value.length < (tableConfig.value.data?.length ?? 0));

  const setType = (type: SelectionType) => {
    selectionRows.value.splice(0, selectionRows.value.length);
    selectionType.value = type;
  };

  const pushRow = (row) => {
    const index = findIndex(selectionRows.value, (item) => isSameRow(row, item));
    if (index < 0) {
      selectionRows.value.push(row);
    }
  };
  
  const deleteRow = (row) => {
    const index = findIndex(selectionRows.value, (item) => isSameRow(row, item));
    if (index > -1) {
      selectionRows.value.splice(index, 1);
    }
  };

  const pushRows = () => {
    tableConfig.value.data?.forEach(row => {
      const index = findIndex(selectionRows.value, (item) => isSameRow(row, item));
      if (index < 0) {
        selectionRows.value.push(row);
      }
    });
  };
  
  const deleteRows = () => {
    tableConfig.value.data?.forEach(row => {
      const index = findIndex(selectionRows.value, (item) => isSameRow(row, item));
      if (index > -1) {
        selectionRows.value.splice(index, 1);
      }
    });
  };

  const toggleAllSelection = () => {
    const val = !checked.value;
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

  const toggleRowSelection = (row, selected) => {
    if (selectionType.value === 'positive') {
      if (selected === true) {
        pushRow(row);
      } else {
        deleteRow(row);
      }
    } else {
      if (selected === false) {
        pushRow(row);
      } else {
        deleteRow(row);
      }
    }
  };

  return {
    checked,
    indeterminate,
    rowCheckedStatusList,
    setType,
    toggleAllSelection,
    toggleRowSelection
  };
};