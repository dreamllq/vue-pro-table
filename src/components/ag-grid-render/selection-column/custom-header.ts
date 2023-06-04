import HeaderRender from './header-render.vue';
import { createApp } from 'vue';
class CustomHeader {
  eGui: any;
  params: any;
  app: any;
  init(params) {
    this.params = params;
    this.eGui = document.createElement('div');
    this.app = createApp(HeaderRender, { params });
    this.app.mount(this.eGui);
  }

  getGui() {
    return this.eGui;
  }

  destroy() {
    this.app.unmount();
    this.eGui = null;
  }
}

export default CustomHeader;