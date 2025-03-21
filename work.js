let grid = []
let sides = [[[1, 1], [1], [1]], [[1, 2, 1]]]
let total = 3;

function fillGrid() {
    for(let i = 0; i < total; i++) {
        grid.push([])
        for(let j = 0; j < total; j++) {
            grid[i].push(0)
        }
    }
}
function fillSides() {
    for(let i = 0; i < 2; i++){
        for(let j = 0; j < total; j++){
            sides[i].push(0)
        }
    }
}

function sumLine(l) {
    let sum = 0;
    for(let i = 0; i < l.length; i++) {
        sum+=l[i]
    }
    return sum+l.length - 1;
}


function fillIntersections() {
    for(let i = 0; i < 2; i++) {
        for(let j = 0; j < total; j++) {
            let c = 0;
            let s = sumLine(sides[i][j]);
            for(let k = 0; k < sides[i][j].length; k++) {
                let intersection = sides[i][j][k] - total + s
                if (intersection > 0) {
                    let halfway = (2*c+total-s+sides[i][j][k])/2
                    let start = halfway - intersection/2;
                    let end = halfway + intersection/2;
                    if(i === 0) {
                        for(let n = start; n <= end; n++) {
                            grid[j*((i+1)%2)+n*(i%2)][j*(i%2)+n*((i+1)%2)] = 1;
                        }
                    }
                }
                c += sides[i][j][k]+1
            }
        }
    }
}

function error(l) {
    if(grid[l[0]][l[1]] !== 0) {
        console.log("there has been an overloaded position.")
    }
}

function span(l){
    sides[l[0]][l[1]]
    let locations = []
    for(let i = 0; i < total; i++) {
        if(grid[i*((l[0]+1)%2)+l[1]*l[0]][i*(l[0]%2)+l[1]*((l[0]+1)%2)] === 1) {
            locations.push(i*((l[0]+1)%2)+i*(l[0]%2))
        }
    }
    let found = []
    for(let i = 0; i < locations.length; i++) {
        let bounds = crosses(l, locations[i])
        let possibilites = []
        for(let j = 0; j < sides[l[0]][l[1]].length; j++) {
            if(bounds[1]-bounds[0]-1 < sides[l[0]][l[1]][j]) {
                continue;
            }
            if(continuous(l, locations[i]) > sides[l[0]][l[1]][j]) {
                continue;
            }
            possibilities.push(j)
        }
        let cSum = 0;
        for(let j = 0; j < possibilities.length; j++) {
            possibilities[j]
        }
    }
}

function previousPocket(e, l, c) {
    
}

function continuous(l, e) {
    let start = e;
    for(let i = e-1; i >= 0; i--) {
        if(grid[i*((l[0]+1)%2)+l[1]*l[0]][i*(l[0]%2)+l[1]*((l[0]+1)%2)] !== 1) {
            start -= i;
        }
    }
    let end = e;
    for(let i = e+1; i < total; i++) {
        if(grid[i*((l[0]+1)%2)+l[1]*l[0]][i*(l[0]%2)+l[1]*((l[0]+1)%2)] !== 1) {
            end += i;
        } 
    }
    return [start, end]
}

function crosses(l, e) {
    let before = -1;
    for(let i = e; i >= 0; i--) {
        if(grid[i*((l[0]+1)%2)+l[1]*l[0]][i*(l[0]%2)+l[1]*((l[0]+1)%2)] === -1) {
            before = i;
            continue;
        }
    }
    let after = e+1;
    for(let i = e+1; i < total; i++) {
        if(grid[i*((l[0]+1)%2)+l[1]*l[0]][i*(l[0]%2)+l[1]*((l[0]+1)%2)] === -1) {
            after = i;
            continue;
        }
    }
    return [before, after]
}

function fillTrivial() {
    for(let i = 0; i < 2; i++ ){
        for(let j = 0; j < total; j++) {
            if(sumLine(sides[i][j]) === total) {
                let segment = 0;
                let cumulativeSeg = 0;
                for(let k = 0; k < total; k++) {
                    let e = [j*((i+1)%2)+k*(i%2),j*(i%2)+k*((i+1)%2)];
                    if(sides[i][j][segment]+cumulativeSeg < k) {
                        cumulativeSeg += sides[i][j][segment];
                        segment ++;
                        error(e)
                        if(grid[e[0]][e[1]] !== 0) {
                            error()
                        }
                        grid[e[0]][e[1]] = -1;
                        continue;
                    }
                    grid[e[0]][e[1]] = 1;
                }
            }
        }       
    }
}

fillGrid();
fillSides();

fillTrivial();

console.log(grid)
