

var handles = []
handles.push(moving())
handles.push(atRest())
document.body.onkeydown = e => handles.forEach(handle => clearInterval(handle))
//drawAtRest(atrest)


function moving() {
    var canvas = document.getElementById("moving")
    var ctx = canvas.getContext("2d")

    var y0 = canvas.height / 2
    var apples = []
    var kart = {x: 0, y: y0}

    var t = 0
    return setInterval(() => {
        drawGrass(ctx)
        drawRoad(ctx, 0, ctx.canvas.height / 2, ctx.canvas.width, ctx.canvas.height / 2)
        drawKart(ctx, kart)
        drawApples(ctx, apples)

        if (t % 60 === 0) {
            apples.push({x: kart.x, y: y0})
        }
        kart.x += 1

        t++
    }, 1000 / 60)
}



function atRest() {
    var canvas = document.getElementById("atrest")
    var ctx = canvas.getContext("2d")

    var x0 = canvas.width / 2
    var y0 = canvas.height / 2

    var apples = []
    var kart = {x: x0, y: y0}

    var t = 0
    return setInterval(() => {
        drawGrass(ctx)
        drawRoad(ctx, 0, ctx.canvas.height / 2, ctx.canvas.width, ctx.canvas.height / 2)
        drawKart(ctx, kart)
        drawApples(ctx, apples)

        if (t % 60 === 0) {
            apples.push({x: kart.x, y: y0})
        }
        apples.forEach(apple => {
            apple.x -= 1
        })

        t++
    }, 1000 / 60)
}











function drawGrass(ctx) {

    ctx.fillStyle = "#20AA20"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

}

function drawRoad(ctx, x, y, x2, y2) {

    ctx.lineWidth = 80
    ctx.strokeStyle = "black"
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x2, y2)
    ctx.stroke()

}

function drawKart(ctx, kart) {
    ctx.fillStyle = "blue"
    ctx.fillRect(kart.x - 10, kart.y - 10, 20, 20)
}

function drawApples(ctx, apples) {
    ctx.fillStyle = "red"
 
    apples.forEach(apple => {
        ctx.fillRect(apple.x - 4, apple.y - 4, 8, 8)
           
    });
}