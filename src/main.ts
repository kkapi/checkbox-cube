import { CheckboxCanvas } from './checkbox-canvas';
import { GraphicsRenderer } from './logic';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div class="card">
      <div id="checkbox-canvas"></div>
    </div>
  </div>
`

const checkboxCanvas = new CheckboxCanvas(document.querySelector<HTMLDivElement>('#checkbox-canvas')!, 40, 40);
const graphicsRenderer = new GraphicsRenderer(checkboxCanvas);

graphicsRenderer.startAnimation();