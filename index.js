let grid = []
let sides = [[], []]

let total = 5;

let spaces = e => {
	return 2 * e - total;
}
let coverL = lI => {
	let line = sides[lI[0]][lI[1]]
	let sum = line.length - 1;
	for(let i = 0; i < line.length; i++) {
		sum += line[i]
	}
	return sum;
}

let completeLines = () => {

	for(let i = 0; i < 2;i ++) {
		for(let j =0; j<sides[i].length; j++) {
			let intersection =coverL(i, j);
			if(intersection === total){
				let c = 0;
				let sum = 0;
				for(let k = 0; k < total; k++) {
					let values = [i*k+((i+1)%2)*j, i*j+((i+1)%2)*k]
					if(c === 0) {
						grid[values[1]][values[0]] = 0;
						sum += 1;
					}
					if(c > sides[i][j]) {
						sum += c;
						c = 0;
					} else {
						grid[values[1]][values[0]] = 1;
						c++;
					}
	
				}
			} else if(intersection > 0) {
				// go through all the way to 0
				// best solution or just an approximate just start with something otherwise will never be done AHFLAJSD:ASD
				if(intersection % 2 === 0) {
					let start = total/2-intersection;
					let end = total/2-1+intersection;
					for(let k = start; k <= end; k++) {
						let values = [i*k+((i+1)%2)*j, i*j+((i+1)%2)*k]
						let current = [start, end].map((x,i) => x + values[i])
						grid[current[1]][current[0]] = 1;
					}
				} else {
					let start = (total+1)/2-intersection;
					let end = (total-1)/2+intersection;
					for(let k = start; k <= end; k++) {
						let values = [i*k+((i+1)%2)*j, i*j+((i+1)%2)*k]
						let current = [start, end].map((x,i) => x + values[i])
						grid[current[1]][current[0]] = 1;
					}
				}
			}
		}
	}
}

let sumLine = l => {
	let sum =0;
	for(let i = 0; i < l.length; i++) {
		sum += l[i]
	}
	return sum;
}

let crossOut = () => {
	for(let i = 0; i < 2; i++) {
		for(let j = 0; j < total; j++) {
			let internalSum = 0;
			for(let k = 0; k < total; k++) {
				let values = [i*k+((i+1)%2)*j, i*j+((i+1)%2)*k]
				internalSum += grid[values[1]][values[0]]
			}
			if(sumLine(sides[i][j]) === internalSum) {
				for(let k = 0; k < total; k++) {
					let values = [i*k+((i+1)%2)*j, i*j+((i+1)%2)*k]
					if(grid[values[1]][values[0]] === 0) {
						grid[values[1]][values[0]] = -1;
					}
				}
			}
		}
	}
}

completeLines();

crossOut();
