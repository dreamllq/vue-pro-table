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
    console.log(props.params);
    const columnConfig = computed<ColumnConfig>(() => props.params.columnConfig);
    const scope = computed(() => ({
      column: columnConfig,
      $index: props.params.columnIndex
    }));

    const headerRender = columnConfig.value.headerRender;
    return {
      scope,
      headerRender 
    };
  },
  render() {
    return <div>{() => this.headerRender(this.scope)}</div>;
  }
});
