import { SIZE_BLOCK, COLUMNS, ROWS } from "../index.js";

export class View {
	constructor(container) {
		this.container = container;
		this.preview();
	}
	color = {
		J: 'DarkMagenta',
		I: 'CadetBlue',
		O: 'Gold',
		L: 'CornflowerBlue',
		2: 'RoyalBlue',
		T: 'Indigo',
		S: 'MediumSeeGreen',
	}

	canvas = document.createElement('canvas');
	context = this.canvas.getContext('2d');


	preview() {
		this.container.textContent = '';
		const preview = document.createElement('div');
		preview.innerHTML = "Press ENTER to start"
		this.container.append(preview);
		preview.style.cssText = `
		border: 3px solid #000;
		font-size: 18px;
		text-align: center;
		padding: 50px;
		grid-column: 1 /3;
		`;
	}

	init() {

		this.container.textContent = '';
		this.canvas.style.gridArea = 'game';
		this.canvas.classList.add('game-area');
		this.container.append(this.canvas);
		this.canvas.width = SIZE_BLOCK * COLUMNS;
		this.canvas.height = SIZE_BLOCK * ROWS;
	}
	createBlockScore() {
		const scoreBlock = document.createElement('div');
		scoreBlock.style.cssText = `
		border: 2px solid #000;
		font-size: 18px;
		text-align: center;
		padding: 20px;
		grid-area: score;
		`;
		const linesElem = document.createElement('p');
		const scoreElem = document.createElement('p');
		const levelElem = document.createElement('p');
		const recordElem = document.createElement('p');

		scoreBlock.append(linesElem, scoreElem, levelElem, recordElem);
		this.container.append(scoreBlock);

		return (lines, score, level, record) => {
			linesElem.textContent = `lines: ${lines}`;
			scoreElem.textContent = `score: ${score}`;
			levelElem.textContent = `level: ${level}`;
			recordElem.textContent = `record: ${record}`;

		}
	}
	createBlockNextTetramino() {
		const tBlock = document.createElement('div');
		tBlock.style.cssText = `
		width: ${SIZE_BLOCK * 4}px;
		height: ${SIZE_BLOCK * 4}px;
		border: 2px solid #000;
		font-size: 18px;
		text-align: center;
		padding: 20px;
		grid-area: next;
		display: flex;
		align-items: center;
		justify-content: center;
		`;
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		tBlock.append(canvas);

		this.container.append(tBlock);

		return (t) => {
			canvas.width = SIZE_BLOCK * t.length;
			canvas.height = SIZE_BLOCK * t.length;
			context.clearRect(0, 0, canvas.width, canvas.height);

			for (let y = 0; y < t.length; y++) {
				const line = t[y];

				for (let x = 0; x < line.length; x++) {
					const block = line[x];
					if (block !== 'o') {
						context.fillStyle = this.color[block];
						context.strokeStyle = 'gray';
						context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
						context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
					}
				}

			}

		}

	}
	showArea(area) {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

		for (let y = 0; y < area.length; y++) {
			const line = area[y];

			for (let x = 0; x < line.length; x++) {
				const block = line[x];
				if (block !== 'o') {
					this.context.fillStyle = this.color[block];
					this.context.strokeStyle = 'gray';
					this.context.fillRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
					this.context.strokeRect(x * SIZE_BLOCK, y * SIZE_BLOCK, SIZE_BLOCK, SIZE_BLOCK);
				}
			}

		};
	};
}