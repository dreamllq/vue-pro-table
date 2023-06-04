import { defineComponent, computed } from 'vue';
import { ColumnConfig } from '@/types';

export default defineComponent({
  props: {
    params: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const columnConfig = computed<ColumnConfig>(() => props.params.columnConfig);
    const scope = computed(() => ({
      row: props.params.data,
      column: columnConfig,
      $index: props.params.rowIndex
    }));

    const defaultRender = columnConfig.value.defaultRender;

    return {
      scope,
      defaultRender 
    };
  },
  render() {
    return <div>{() => this.defaultRender(this.scope)}</div>;
  }
});
