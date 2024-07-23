import { CheckboxCanvas } from './checkbox-canvas';
import { GraphicsRenderer } from './graphics-renderer';
import './styles/style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>    
    <div id="checkbox-canvas"></div>    
  </div>
`;

const checkboxCanvas = new CheckboxCanvas();
checkboxCanvas.init(
	document.querySelector<HTMLDivElement>('#checkbox-canvas')!,
	40,
	40
);

const graphicsRenderer = new GraphicsRenderer(checkboxCanvas);

graphicsRenderer.startAnimation();