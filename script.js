const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth;
canvas.height = innerHeight;
const fps = 100;
const blockSize = 30;


class Player{
    constructor(pos){
        this.pos = pos
        this.radius = 40
        this.direction = 'down'
        this.speed = 1
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
        if(this.direction == "up"){
            this.pos.y -= this.speed
        }else if(this.direction == "down"){
            this.pos.y += this.speed
        }else if(this.direction == "left"){
            this.pos.x -= this.speed
        }else if(this.direction == "right"){
            this.pos.x += this.speed
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
        ctx.drawImage(this.imgURL, this.pos.x, this.pos.y)
    }
}
const player = new Player({x:10, y:10})
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
    ctx.clearRect(0, 0, innerWidth, innerHeight)
    player.draw()
    player.move()
}

setInterval(draw, 1000 / fps);