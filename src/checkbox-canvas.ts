export class CheckboxCanvas {
	private checkboxes: HTMLInputElement[];
  private width: number;
  private height: number;

	constructor(element: HTMLElement, width: number, height: number) {
    this.width = width;
    this.height = height;

		const container = document.createElement('div');
		container.style.display = 'flex';
		container.style.flexWrap = 'wrap';
		container.style.width = `${width * 20}px`;
		container.style.display = 'flex';

		const checkboxesNumber = width * height;
		this.checkboxes = new Array(checkboxesNumber).fill(null).map(() => {
			const checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			return checkbox;
		});

		container.append(...this.checkboxes);
		element.append(container);
	}

  getWidth() {
    return this.width;
  }
  
  getHeight() {
    return this.height;
  }
  private calculateCheckboxIndex(x: number, y: number) {
		return y * this.width + x;
	}
	selectCheckbox(x: number, y: number) {
    const index = this.calculateCheckboxIndex(x, y);
		this.checkboxes[index].checked = true;
	}

  deselectCheckbox(index: number) {
    this.checkboxes[index].checked = false;
  }

	drawLine(x0: number, y0: number, x1: number, y1: number) {
		const dx = Math.abs(x1 - x0);
		const dy = Math.abs(y1 - y0);
		const sx = x0 < x1 ? 1 : -1;
		const sy = y0 < y1 ? 1 : -1;
		let err = dx - dy;
		while (true) {
      this.selectCheckbox(x0, y0);
			if (x0 === x1 && y0 === y1) break;
			const e2 = 2 * err;
			if (e2 > -dy) {
				err -= dy;
				x0 += sx;
			}
			if (e2 < dx) {
				err += dx;
				y0 += sy;
			}
		}
	}
}