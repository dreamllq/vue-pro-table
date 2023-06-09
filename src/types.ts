import { Ref, VNode } from 'vue';

export interface ColumnConfig {
  id: string,
  type?: 'selection' | 'reserveSelection' | 'index' | 'expand',
  index?: number | ((index:number)=>number),
  label?: string,
  columnKey?: string,
  prop: string,
  width?: string | number,
  minWidth?: string | number,
  fixed?: true | 'left' | 'right',
  renderHeader?: (options:{ column:any, $index:number })=>VNode,
  sortable?: true | false | 'custom',
  sortMethod?: (a: any, b: any) => number,
  sortBy?: string | ((row: any, index: number) => string) | string[],
  sortOrders?: ('ascending' | 'descending' | null)[],
  resizable?: boolean,
  formatter?: (row: any, column:any, cellValue:any, index: number)=>string,
  showOverflowTooltip?: boolean | {[index: string]: any},
  align?: string,
  headerAlign?: string,
  className?: string,
  labelClassName?: string,
  selectable?: (row: any, index: number) => boolean,
  reserveSelection?: boolean,
  filters?: { text: string, value: string }[],
  filterPlacement?: string,
  filterMultiple?: boolean,
  filterMethod?: (value: any, row: any, column: any) => void,
  filteredValue?: string[],
  defaultHidden?: boolean,
  disabled?: boolean,
  defaultRender?: any,
  headerRender?: any
}


export interface TableConfig {
  data?: any[],
  height?: number | string,
  maxHeight?: number | string,
  stripe?: boolean,
  border?:boolean,
  size?: 'large' | 'default' | 'small',
  fit?: boolean,
  showHeader?: boolean,
  highlightCurrentRow?: boolean,
  currentRowKey?: string | number,
  rowClassName?:((option:{ row: any, rowIndex: number })=>string) | string,
  rowStyle?: any,
  cellClassName?: any,
  cellStyle?:any,
  headerRowClassName?: any,
  headerRowStyle?: any,
  headerCellClassName?: any,
  headerCellStyle?:any,
  rowKey?:any,
  emptyText?:string,
  defaultExpandAll?: boolean,
  expandRowKeys?:any[],
  defaultSort?: any,
  tooltipEffect?: 'dark' | 'light',
  tooltipOptions?: any,
  showSummary?: boolean,
  sumText?: string,
  summaryMethod?: any,
  spanMethod?: any,
  selectOnIndeterminate?:boolean,
  indent?:number,
  lazy?:boolean,
  load?:any,
  treeProps?: any,
  tableLayout?: 'fixed' | 'auto',
  scrollbarAlwaysOn?: boolean,
  flexible?:boolean,
  showSelectionAlert?: boolean,
  customColumnVirtualRef?: Ref<any>,
  renderTableType?:'el-table' | 'ag-grid'
}

export interface CustomColumnConfig {
  prop:string, 
  show: boolean,
  label: string,
  disabled: boolean
}

export interface RowSelection {
  rows: any[],
  type: 'reverse' | 'positive'
}

export type SelectionRows = any[];
export type SelectionType = 'reverse' | 'positive';