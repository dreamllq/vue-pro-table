import HeaderRender from './header-render.vue';
import { h } from 'vue';

class CustomHeader {

  init(params) {
    console.log(HeaderRender.render());
    this.params = params;
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `
            <div class="customHeaderMenuButton">
                1222
            </div>`;
  }

  getGui() {
    return this.eGui;
  }

  destroy() {}
}

export default CustomHeader;