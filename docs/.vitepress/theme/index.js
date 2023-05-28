import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './custom.scss';
// import Layout from './layout.vue'
import NotFound from './not-found.vue'
import DefaultTheme from 'vitepress/theme'
import Base from '@components/base.vue'
import WithPagination from '@components/with-pagination.vue'
import TypeSelection from '@components/type-selection.vue'

import AgBase from '@components/ag-base.vue'

export default {
  ...DefaultTheme,
  // Layout,
  NotFound,
  enhanceApp({ app, router, siteData }) {
    app.use(ElementPlus);
    app.component('Base', Base)
    app.component('WithPagination', WithPagination)
    app.component('TypeSelection', TypeSelection)
    app.component('AgBase', AgBase)
  }
};