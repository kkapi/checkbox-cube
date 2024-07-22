type Figure = {
	vertexTable: number[][];
	edgeTable: number[][];
};

const Cube: Figure = {
	vertexTable: [
		[1,1,1],
    [1,-1,1],
    [-1,-1,1],
    [-1,1,1],
    [1,1,-1],
    [1,-1,-1],
    [-1,-1,-1],
    [-1,1,-1],
	].map(v => v.map(v => v * 30 + 1)),

	edgeTable: [
		[0, 1],
		[1, 2],
		[2, 3],
		[3, 0],
		[4, 5],
		[5, 6],
		[6, 7],
		[7, 4],
		[0, 4],
		[1, 5],
		[2, 6],
		[3, 7],
	],
};