

var handles = []
handles.push(moving())
handles.push(atRest())
handles.push(circle())
handles.push(hyperbola())

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


function circle() {
    var canvas = document.getElementById("circle")
    var ctx = canvas.getContext("2d")
    var dcanvas = document.getElementById("circle-d")
    var dctx = dcanvas.getContext("2d")

    var x0 = canvas.width / 2
    var y0 = canvas.height / 2
    var r = ctx.canvas.height / 3
    var dy0 = dcanvas.height / 2
    
    var apples = []
    var kart = {x: x0, y: y0 - r}

    var doffset = dcanvas.width / 2 + r

    var t = 0
    return setInterval(() => {
        drawGrass(ctx)
        drawRoadCircle(ctx, x0, y0, r)
        drawKart(ctx, kart)

        drawGrass(dctx)
        drawRoad(dctx, 0, dy0, dcanvas.width, dy0)
        drawKart(dctx,  doffset, dy0)
        drawApplesCircleDistance(dctx, apples, doffset)
        
        ctx.translate(x0, y0)
        drawApplesCircle(ctx, apples, r, t)
        ctx.translate(-x0, -y0)
        
        if (t % 60 === 0) {
            apples.push({x: kart.x, y: kart.y, t})
        }
        apples.forEach(apple => {
            apple.x = -Math.cos((t - apple.t) / r  - Math.PI / 2) * r
            apple.y = Math.sin((t - apple.t) / r  - Math.PI / 2) * r
            apple.d = Math.sqrt(Math.pow(apple.x, 2) + Math.pow(apple.y + r, 2))    
        })

        t++
    }, 1000 / 60)
}


function hyperbola() {
    var canvas = document.getElementById("hyperbola")
    var ctx = canvas.getContext("2d")
    var dcanvas = document.getElementById("hyperbola-d")
    var dctx = dcanvas.getContext("2d")

    var x0 = canvas.width / 8
    var y0 = canvas.height / 8
    var r = ctx.canvas.width / 3
    var dy0 = dcanvas.height / 2
    var doffset = dcanvas.width / 2 + r
     
    var apples = []
    var kart = {x: x0, y: y0}

    var t = 0
    return setInterval(() => {
        drawGrass(ctx)
        drawRoadHyperbola(ctx, x0, y0, r)
        drawKart(ctx, kart)

        drawGrass(dctx)
        drawRoad(dctx, 0, dy0, dcanvas.width, dy0)
        drawKart(dctx,  doffset, dy0)
        drawApplesCircleDistance(dctx, apples, doffset)
        
        //ctx.translate(x0, y0)
        drawApplesHyperbola(ctx, apples, r, t)
        //ctx.translate(-x0, -y0)
        
        if (t % 60 === 0) {
            apples.push({x: kart.x, y: kart.y, t})
        }
        apples.forEach(apple => { 
            apple.x = x0 - r + Math.cosh((t - apple.t) / r) * r
            apple.y = y0 + Math.sinh((t - apple.t) / r) * r
            apple.d = Math.sqrt(Math.pow(apple.x - x0, 2) + Math.pow(apple.y - y0, 2))    
        
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

function drawRoadCircle(ctx, x, y, r) {

    ctx.lineWidth = 80
    ctx.strokeStyle = "black"
    ctx.beginPath()
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.stroke()

}

function drawRoadHyperbola(ctx, x, y, r) {

    ctx.lineWidth = 80
    ctx.strokeStyle = "black"
    ctx.beginPath()
    ctx.moveTo(x + Math.cosh(i) * r, y)
    for (var i = -1; i <= Math.PI * 4; i += 0.01) {
        ctx.lineTo(x + Math.cosh(i) * r - r, y + Math.sinh(i) * r)
    }
    ctx.stroke()

}


function drawKart(ctx, kart, y) {
    ctx.fillStyle = "blue"
    var x = typeof(kart) === "number" ? kart : kart.x
    y = typeof(y) === "number" ? y : kart.y
    ctx.fillRect(x - 10, y - 10, 20, 20)
}

function drawApples(ctx, apples, distance) {
    ctx.fillStyle = "red"
 
    var x, y
    apples.forEach(apple => {
        ctx.fillRect(apple.x - 4, apple.y - 4, 8, 8)
           
    });
}

function drawApplesCircleDistance(ctx, apples, doffset) {
    ctx.fillStyle = "red"
 
    var x, y
    apples.forEach(apple => {
        x = doffset - apple.d
        y = ctx.canvas.height / 2
        ctx.fillRect(x - 4, y - 4, 8, 8)
           
    });
}


function drawApplesCircle(ctx, apples, r, t) {
    ctx.fillStyle = "red"
 
    apples.forEach(apple => {
        ctx.fillRect(apple.x - 4, apple.y - 4, 8, 8)
           
    });
}

function drawApplesHyperbola(ctx, apples, r, t) {
    ctx.fillStyle = "red"
 
    var x, y
    apples.forEach(apple => {
        x = apple.x //Math.cosh((apple.t - t) / r  - Math.PI / 2) * r
        y = apple.y //-Math.sinh((apple.t - t) / r  - Math.PI / 2) * r

        ctx.fillRect(x - 4, y - 4, 8, 8)
           
    });
}
