export class CheckboxCanvas {
	private checkboxes: HTMLInputElement[] = [];
	private width = 0;
	private height = 0;

  init(element: HTMLElement, width: number, height: number): void {
    this.width = width;
		this.height = height;

		const container = document.createElement('div');
		container.style.display = 'flex';
		container.style.flexWrap = 'wrap';
		container.style.width = `${width * 20}px`;

		const checkboxesNumber = width * height;
		this.checkboxes = new Array(checkboxesNumber).fill(null).map(() => {
			const checkbox = document.createElement('input');
			checkbox.type = 'checkbox';
			return checkbox;
		});

		container.append(...this.checkboxes);
		element.append(container);
  }

	getWidth(): number {
		return this.width;
	}

	getHeight(): number {
		return this.height;
	}
	private calculateCheckboxIndex(x: number, y: number): number {
		return y * this.width + x;
	}
	selectCheckbox(x: number, y: number): void {
		const index = this.calculateCheckboxIndex(x, y);
		this.checkboxes[index].checked = true;
	}

	deselectCheckbox(x: number, y: number): void {
    const index = this.calculateCheckboxIndex(x, y);
		this.checkboxes[index].checked = false;
	}

	clearCanvas(): void {
		this.checkboxes.forEach(checkbox => (checkbox.checked = false));
	}

	/**
	 * Draws a line between two points (x0, y0) and (x1, y1) on a CheckboxCanvas.
	 * Bresenham's line algorithm: https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm.
	 */
	drawLine(x0: number, y0: number, x1: number, y1: number): void {
		const dx = Math.abs(x1 - x0);
		const sx = x0 < x1 ? 1 : -1;

		const dy = -Math.abs(y1 - y0);
		const sy = y0 < y1 ? 1 : -1;

		let error = dx + dy;

		while (true) {
			this.selectCheckbox(x0, y0);
			if (x0 === x1 && y0 === y1) break;
			const e2 = 2 * error;
			if (e2 >= dy) {
				if (x0 == x1) break;
				error = error + dy;
				x0 = x0 + sx;
			}

			if (e2 <= dx) {
				if (y0 == y1) break;
				error = error + dx;
				y0 = y0 + sy;
			}
		}
	}
}