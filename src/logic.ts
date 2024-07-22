import { CheckboxCanvas } from './checkbox-canvas';
import { Cube } from './figures';
import { CameraPoint, Figure } from './types';

export class GraphicsRenderer {
	private figure: Figure;
	private canvas: CheckboxCanvas;
	private cameraPoint: CameraPoint;
	private screenCoordinateZ: number;
	private currentAngle: number;

	constructor(canvas: CheckboxCanvas, figure: Figure = Cube) {
		this.figure = figure;
		this.canvas = canvas;
		this.cameraPoint = {
			x: this.canvas.getWidth() / 2,
			y: this.canvas.getHeight() / 2,
			z: this.canvas.getHeight() * 1.6,
		};
		this.screenCoordinateZ = this.canvas.getHeight() * 0.7;
		this.currentAngle = 0;
	}

	private getScaledVertices(
		vertexTable: number[][],
		coefficient = this.canvas.getWidth() / 4
	) {
		return vertexTable.map(vertex => vertex.map(value => value * coefficient));
	}

	private getShiftedVertices(
		vertexTable: number[][],
		coefficient = this.canvas.getWidth() / 2
	) {
		return vertexTable.map(vertex => vertex.map(value => value + coefficient));
	}

	private getRotatedAroundXVertices(
		vertexTable: number[][],
		angleDegrees: number
	) {
		const radians = (angleDegrees * Math.PI) / 180;

		return vertexTable.map(vertex => {
			const [x, y, z] = vertex;

			const rotatedY = y * Math.cos(radians) - z * Math.sin(radians);
			const rotatedZ = y * Math.sin(radians) + z * Math.cos(radians);

			return [x, rotatedY, rotatedZ];
		});
	}

	private getRotatedAroundYVertices(
		vertexTable: number[][],
		angleDegrees: number
	) {
		const radians = (angleDegrees * Math.PI) / 180;

		return vertexTable.map(vertex => {
			const [x, y, z] = vertex;

			const rotatedX = x * Math.cos(radians) - z * Math.sin(radians);
			const rotatedZ = x * Math.sin(radians) + z * Math.cos(radians);

			return [rotatedX, y, rotatedZ];
		});
	}

	private getRotatedAroundZVertices(
		vertexTable: number[][],
		angleDegrees: number
	) {
		const radians = (angleDegrees * Math.PI) / 180;

		return vertexTable.map(vertex => {
			const [x, y, z] = vertex;

			const rotatedX = x * Math.cos(radians) - y * Math.sin(radians);
			const rotatedY = x * Math.sin(radians) + y * Math.cos(radians);

			return [rotatedX, rotatedY, z];
		});
	}

	private getVertexProjection(vertexTable: number[][]) {
		return vertexTable.map(vertex => {
			const x =
				this.cameraPoint.x -
				((this.cameraPoint.z - this.screenCoordinateZ) *
					(this.cameraPoint.x - vertex[0])) /
					(this.cameraPoint.z - vertex[2]);
			const y =
				this.cameraPoint.y -
				((this.cameraPoint.z - this.screenCoordinateZ) *
					(this.cameraPoint.y - vertex[1])) /
					(this.cameraPoint.z - vertex[2]);

			return [Math.round(x), Math.round(y)];
		});
	}

	private getTransformedFigure() {
		const { vertexTable } = this.figure;

		const rotatedAroundXVertices = this.getRotatedAroundXVertices(
			vertexTable,
			this.currentAngle
		);
		const rotatedAroundYVertices = this.getRotatedAroundYVertices(
			rotatedAroundXVertices,
			this.currentAngle
		);
		// const rotatedAroundZVertices = this.getRotatedAroundZVertices(
		// 	rotatedAroundYVertices,
		// 	this.currentAngle,
		// );
		const scaledVertices = this.getScaledVertices(rotatedAroundYVertices);
		const shiftedVertices = this.getShiftedVertices(scaledVertices);
		const projectedVertices = this.getVertexProjection(shiftedVertices);

		return { ...this.figure, vertexTable: projectedVertices };
	}

	private setCurrentAngle(angle: number) {
		this.currentAngle = angle % 360;
	}

	drawFigure() {
		const { vertexTable, edgeTable } = this.getTransformedFigure();

		edgeTable.forEach(edge => {
			const [x0, y0] = vertexTable[edge[0]];
			const [x1, y1] = vertexTable[edge[1]];

			this.canvas.drawLine(x0, y0, x1, y1);
		});
	}

	startAnimation() {
		this.drawFigure();

		const timer = setInterval(() => {
			this.canvas.clearCanvas();
			this.drawFigure();
			this.setCurrentAngle(this.currentAngle + 1);
		}, 1000 / 30);

		return timer;
	}
}