import { PropType, defineComponent } from 'vue';
import { ColumnConfig } from '@/types';
import ReserveSelectionColumnDefaultSlot from '@/components/reserve-selection-column/default-slot.vue';
import ReserveSelectionColumnHeaderSlot from '@/components/reserve-selection-column/header-slot.vue';

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<ColumnConfig>,
      required: true
    }
  },
  render() {
    const slotsRender: { default?:any, header?: any } = {};

    if (this.config.type === 'reserveSelection') {
      slotsRender.default = (d:any) => <ReserveSelectionColumnDefaultSlot row={d.row} column={d.column} index={d.$index}/>;
      slotsRender.header = (d:any) => <ReserveSelectionColumnHeaderSlot column={d.column} index={d.$index}/>;
    } else {
      if (this.config.defaultRender) {
        slotsRender.default = (d: any) => this.config.defaultRender(d);
      }

      if (this.config.headerRender) {
        slotsRender.header = (d: any) => this.config.headerRender(d); 
      }
    }
    return <el-table-column 
      prop={this.config.prop} 
      label={this.config.label}
      type={this.config.type === 'reserveSelection' ? undefined : this.config.type}
      index={this.config.index}
      columnKey={this.config.columnKey}
      width={this.config.type === 'reserveSelection' ? 60 : this.config.width}
      minWidth={this.config.minWidth}
      fixed={this.config.fixed}
      renderHeader={this.config.renderHeader}
      sortable={this.config.sortable}
      sortMethod={this.config.sortMethod}
      sortBy={this.config.sortBy}
      sortOrders={this.config.sortOrders}
      resizable={this.config.resizable}
      formatter={this.config.formatter}
      showOverflowTooltip={this.config.showOverflowTooltip}
      align={this.config.align}
      headerAlign={this.config.headerAlign}
      className={this.config.className}
      labelClassName={this.config.labelClassName}
      selectable={this.config.selectable}
      reserveSelection={this.config.reserveSelection}
      filters={this.config.filters}
      filterPlacement={this.config.filterPlacement}
      filterMultiple={this.config.filterMultiple}
      filterMethod={this.config.filterMethod}
      filteredValue={this.config.filteredValue}
      defaultRender={this.config.defaultRender}
      headerRender={this.config.headerRender}
    >
      { slotsRender }
    </el-table-column>;
  }
});
