import { PropType, defineComponent } from 'vue';
import { ColumnConfig } from './types';

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<ColumnConfig>,
      required: true
    }
  },
  render() {
    const slotsRender: { default?:any, header?: any } = {};

    if (this.config.defaultRender) {
      slotsRender.default = (d: any) => this.config.defaultRender(d);
    }

    if (this.config.headerRender) {
      slotsRender.header = (d: any) => this.config.headerRender(d); 
    }
    return <el-table-column 
      prop={this.config.prop} 
      label={this.config.label}
      type={this.config.type}
      index={this.config.index}
      columnKey={this.config.columnKey}
      width={this.config.width}
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
