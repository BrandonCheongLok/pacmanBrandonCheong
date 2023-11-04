const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.height = innerHeight;
const fps = 100;
const blockSize = 50;
const startPosX = 0;
const startPosY = 0;
const boundaries = [];
const foods = [];
const map = [['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
             ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
             ['|', '.', '.', '[', '-', '-', ']', '.', '.', '.', '.', '.', '.', '.', '[', ']', '.', '|'],
             ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '[', ']', '.', '.', '.', '.', '.', '|'],
             ['|', '.', '.', '.', '.', '.', '.', '.', '^', '.', '.', '.', '.', '.', '[', ']', '.', '|'],
             ['|', '.', '[', '7', ']', '.', '.', '[', '+', ']', '.', '.', '^', '.', '.', '.', '.', '|'],
             ['|', '.', '.', '_', '.', '.', '.', '.', '_', '.', '.', '[', '+', ']', '.', '.', '.', '|'],
             ['|', '.', '.', '.', '.', 'b', '.', '.', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
             ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
             ['3', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '4']]
canvas.width = blockSize*map[0].length;
canvas.height = blockSize*map.length;
const textToImg = {
    '-' : './images/pipeHorizontal.png',
    '|' : './images/pipeVertical.png',
    '1' : './images/pipeCorner1.png',
    '2' : './images/pipeCorner2.png',
    '4' : './images/pipeCorner3.png',
    '3' : './images/pipeCorner4.png',
    'b' : './images/block.png',
    '[' : './images/capLeft.png',
    ']' : './images/capRight.png',
    '_' : './images/capBottom.png',
    '^' : './images/capTop.png',
    '+' : './images/pipeCross.png',
    '5' : './images/pipeConnectorTop.png',
    '6' : './images/pipeConnectorRight.png',
    '7' : './images/pipeConnectorBottom.png',
    '8' : './images/pipeConnectorLeft.png',
}


class Player{
    constructor(pos){
        this.pos = pos
        this.radius = 20
        this.direction = 'down'
        this.speed = 1
        this.previousPosx = this.pos.x
        this.previousPosy = this.pos.y
    }
    draw(){
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, this.radius, 
            0, Math.PI * 2)
        ctx.stroke()
        ctx.fill()
        ctx.closePath()
    }
    move(){
        this.previousPosx = this.pos.x
        this.previousPosy = this.pos.y
        if(this.direction == "up"){
            this.pos.y -= this.speed
        }else if(this.direction == "down"){
            this.pos.y += this.speed
        }else if(this.direction == "left"){
            this.pos.x -= this.speed
        }else if(this.direction == "right"){
            this.pos.x += this.speed
        }
        for(let i = 0; i < boundaries.length; i++)
        {
            if (isTouching(this.pos.x + this.radius, this.pos.x - this.radius, boundaries[i].pos.x, boundaries[i].pos.x + blockSize, 
                           this.pos.y + this.radius, this.pos.y - this.radius, boundaries[i].pos.y, boundaries[i].pos.y + blockSize)){
                console.log(143214)
                this.pos.x = this.previousPosx
                this.pos.y = this.previousPosy
            }
        }

        for(let i = 0; i < foods.length; i++)
        {
            if (isTouching(this.pos.x + this.radius, this.pos.x - this.radius, foods[i].pos.x - this.radius, foods[i].pos.x + this.radius, 
                           this.pos.y + this.radius, this.pos.y - this.radius, foods[i].pos.y - this.radius, foods[i].pos.y + this.radius)){
                console.log(515)
                foods.splice(i,1)
            }
        }
    }
}


class Boundary{
    constructor(pos, imgURL, blockSize){
        this.pos = pos
        this.imgURL = imgURL
        this.blockSize = blockSize
        this.img = new Image(this.blockSize, this.blockSize)
        this.img.src = this.imgURL
    }
    draw(){
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.blockSize, this.blockSize)
    }
}
class Food{
    constructor(pos){
        this.pos = pos
        this.radius = 5
    }
    draw(){
        ctx.beginPath()
        ctx.fillStyle = 'yellow'
        ctx.arc(this.pos.x, this.pos.y, this.radius, 
            0, Math.PI * 2)
        ctx.stroke()
        ctx.fill()
        ctx.closePath()
    }
}
function isTouching(x1, x2, x3, x4, y1, y2, y3, y4){
    return x1 >= x3 && x2 <= x4 && y1 >= y3 && y2 <= y4
}


const player = new Player({x:blockSize * 1.5, y:blockSize * 1.5})
document.body.addEventListener('keydown', (e) => {
    if(e.key == 'w'){
        player.direction = 'up'
    }else if(e.key == "s"){
        player.direction = 'down'
    }else if(e.key == "a"){
        player.direction = 'left'
    }else if(e.key == "d"){
        player.direction = 'right'
    }
})

function draw(){
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, innerWidth, innerHeight)
    for(let i = 0; i < boundaries.length; i++){
        boundaries[i].draw()
    }
    for(let i = 0; i < foods.length; i++){
        foods[i].draw()
    }
    player.draw()
    player.move()
}

for(let i = 0; i < map.length; i++){
    for(let j = 0; j < map[i].length; j++){
        if(map[i][j] != '.'){
            boundaries.push(new Boundary(
                {x:startPosX + blockSize * j, y: startPosY + blockSize * i},
                textToImg[map[i][j]],
                blockSize
            ))
        }else{
            foods.push(new Food(
                {x:startPosX + blockSize * j + blockSize / 2, y: startPosY + blockSize * i + blockSize / 2},
            ))
        }
    }
}

setInterval(draw, 1000 / fps);