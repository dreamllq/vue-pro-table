import { v4 as uuidv4 } from 'uuid';
import { defineComponent, ref, onMounted, getCurrentInstance, onUnmounted, PropType } from 'vue';
import { ColumnConfig } from './types';
import { useTable } from '@/store/use-table';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<ColumnConfig['type']>,
      default: ''
    },
    index: {
      type: [Number, Function] as PropType<ColumnConfig['index']>,
      default: undefined
    },
    label: {
      type: String as PropType<ColumnConfig['label']>,
      default: ''
    },
    columnKey: {
      type: String as PropType<ColumnConfig['columnKey']>,
      default: undefined
    },
    prop: {
      type: String as PropType<ColumnConfig['prop']>,
      required: true
    },
    width: {
      type: [String, Number] as PropType<ColumnConfig['width']>,
      default: undefined
    },
    minWidth: {
      type: [String, Number] as PropType<ColumnConfig['minWidth']>,
      default: undefined
    },
    fixed: {
      type: [String, Boolean] as PropType<ColumnConfig['fixed']>,
      default: undefined
    },
    renderHeader: {
      type: Function as PropType<ColumnConfig['renderHeader']>,
      default: undefined
    },
    sortable: {
      type: [Boolean, String] as PropType<ColumnConfig['sortable']>,
      default: false
    },
    sortMethod: {
      type: Function as PropType<ColumnConfig['sortMethod']>,
      default: undefined
    },
    sortBy: {
      type: [
        Function,
        String,
        Array
      ] as PropType<ColumnConfig['sortBy']>,
      default: undefined
    },
    sortOrders: {
      type: Array as PropType<ColumnConfig['sortOrders']>,
      default: () => [
        'ascending',
        'descending',
        null
      ]
    },
    resizable: {
      type: Boolean as PropType<ColumnConfig['resizable']>,
      default: true
    },
    formatter: {
      type: Function as PropType<ColumnConfig['formatter']>,
      default: undefined
    },
    showOverflowTooltip: {
      type: [Boolean, Object] as PropType<ColumnConfig['showOverflowTooltip']>,
      default: false
    },
    align: {
      type: String as PropType<ColumnConfig['align']>,
      default: 'left'
    },
    headerAlign: {
      type: String as PropType<ColumnConfig['headerAlign']>,
      default: undefined
    },
    className: {
      type: String as PropType<ColumnConfig['className']>,
      default: undefined
    },
    labelClassName: {
      type: String as PropType<ColumnConfig['labelClassName']>,
      default: undefined
    },
    selectable: {
      type: Function as PropType<ColumnConfig['selectable']>,
      default: undefined
    },
    reserveSelection: {
      type: Boolean as PropType<ColumnConfig['reserveSelection']>,
      default: false
    },
    filters: {
      type: Array as PropType<ColumnConfig['filters']>,
      default: undefined
    },
    filterPlacement: {
      type: String as PropType<ColumnConfig['filterPlacement']>,
      default: undefined
    },
    filterMultiple: {
      type: Boolean as PropType<ColumnConfig['filterMultiple']>,
      default: true
    },
    filterMethod: {
      type: Function as PropType<ColumnConfig['filterMethod']>,
      default: undefined
    },
    filteredValue: {
      type: Array as PropType<ColumnConfig['filteredValue']>,
      default: undefined
    },
    defaultHidden: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const instance = getCurrentInstance();
    const { insertConfig, removeConfig } = useTable();
    
    const config = ref<ColumnConfig>({ 
      id: uuidv4(),
      ...props,
      defaultRender: slots.default ? (data:{ row: any, column: any, $index:number }) => slots.default!(data) : undefined,
      headerRender: slots.header ? (data:{ column: any, $index:number }) => slots.header!(data) : undefined
    });

    onMounted(() => {
      const hiddenItems: Element = instance!.parent!.refs!.hiddenItems as Element;
      const children: HTMLCollection = hiddenItems.children;
      const index = getElIndex(children, instance!.refs.el as Element);
      insertConfig(config.value, index);
    });

    onUnmounted(() => {
      removeConfig(config.value);
    });

    const getElIndex = (children: HTMLCollection, child:Element) => ([] as Element[]).indexOf.call(children, child);
  },
  render() {
    return <div ref='el'></div>;
  }
});