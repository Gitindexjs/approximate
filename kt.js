let grid = []
let total = 5;

for i in range(total):
    grid.append([])
    for j in range(total):
        grid[i].append(0)

let c = 1;

grid[2][2] = c

function pPos(p){
    let possibilities = []
    for i in range(2){
        for j in range(2){
            for k in range(2){
                add = [((i+1)%2)*(((j+1)%2)*2-1)+(i%2)*(((k+1)%2)*5-2), (i%2)*(((j+1)%2)*2-1)+((i+1)%2)*(((k+1)%2)*5-2)]
                possibilities.push(p.map((x,i) => x + add[i]))
            }
        }
   }
    for i in range(len(possibilities)){
        if(possibilities[i][0] < 0 || possibilities[0] > total-1 || possibilities[1] < 0 || possibilities[1] > total -1){
            possibilities.splice(i, 1)       
        }
    }
}
