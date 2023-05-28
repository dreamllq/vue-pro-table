import { defineComponent, computed } from 'vue';
import { useTable } from '@/use-table';

export default defineComponent({
  props: {
    params: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { columnConfigs } = useTable()!;
    const scope = computed(() => ({
      row: props.params.data,
      column: columnConfigs.value[props.params.index],
      $index: props.params.rowIndex
    }));

    const defaultRender = columnConfigs.value[props.params.index].defaultRender;

    return {
      scope,
      defaultRender 
    };
  },
  render() {
    return <div>{() => this.defaultRender(this.scope)}</div>;
  }
});
