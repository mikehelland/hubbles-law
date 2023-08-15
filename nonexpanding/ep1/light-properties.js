var graphP = document.getElementById("light-properties")

var spacing = 150
var sy = 2

drawSpacetimeP(graphP)

function drawSpacetimeP(graph, version) {
    var ctx = graph.getContext("2d")

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, graph.width, graph.height)

    var x0 = graph.width / 20
    var y0 = graph.height / 20 * 19
    ctx.strokeStyle = "White"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(0, y0)
    ctx.lineTo(graph.width, y0)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x0, 0)
    ctx.lineTo(x0, graph.height)
    ctx.stroke()

    ctx.font = "14pt Sans"
    ctx.fillStyle = "white"
    ctx.textAlign = "right"
    ctx.fillText("Time", 86, 24)
    ctx.fillText("Space", graph.width - 5, graph.height - 34)

    var scale = 1 //(Math.sin(t / 10) + 1) * 25/2

    var cosZoom = 9
    var cosStartX = graph.width * 1/2 + x0
    var cosStartY = graph.height * 1/2 
    
    ctx.strokeStyle = "white"
    ctx.lineWidth = 4
    ctx.translate(cosStartX, cosStartY)
    
    if (version === 1) {
        ctx.rotate(-Math.PI / 4 + scale/spacing)
    }
    else {
        ctx.rotate(-Math.PI / 4 - scale/spacing)
    }
    ctx.beginPath()
    ctx.moveTo(-spacing + -scale , 2 * - cosZoom)
    for (let i = -Math.PI*2; i < Math.PI*2; i+=0.1) {
        //ctx.lineTo(cosZoom * i * (1 + scale/50), - cosZoom * Math.cos(i))
        //ctx.lineTo(cosZoom * i * (1 + scale/spacing), - cosZoom * Math.cos(i))
        ctx.lineTo(spacing/(Math.PI*2) * i + i/(Math.PI*2) * scale, - cosZoom * sy * Math.cos(i))
    }
    ctx.stroke()

    ctx.fillStyle = "blue"
    for (let i = -1; i < 2; i++) {
        ctx.beginPath()

        if (version === 1) {
            ctx.arc(i * spacing + i * scale, sy * -cosZoom, 16, 0, Math.PI*2)
        }
        else {
            ctx.arc(i * spacing + i * scale, sy * -cosZoom, 16, 0, Math.PI*2)
            //ctx.arc(i * (50 + scale), -40 - i * (40), 8, 0, Math.PI*2)
        }
        ctx.fill()
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0)


}

function drawLightWavelength() {
    var graph = graphP
    var ctx = graph.getContext("2d")

    drawRightBars(ctx, graph.width / 3 - 18, graph.width / 3 + 100, 
        graph.width / 4 * 3 + 6)

}

function drawLightPeriod() {
    var graph = graphP
    var ctx = graph.getContext("2d")

    var cosStartY = graph.height * 1/2 
    
    drawUpBars(ctx, graph.width / 4, 110, cosStartY + 100)

}


function drawRightBars(ctx, x1, x2, y) {
    ctx.lineWidth = 4
    ctx.strokeStyle = "yellow"
    ctx.fillStyle = "yellow"
    
    ctx.beginPath()
    ctx.moveTo(x1, y)
    ctx.lineTo(x2, y)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(x2, y - 10)
    ctx.lineTo(x2, y)
    ctx.lineTo(x2, y + 10)
    ctx.closePath()
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(x1, y - 10)
    ctx.lineTo(x1 , y)
    ctx.lineTo(x1, y + 10)
    ctx.closePath()
    ctx.stroke()
}

function drawUpBars(ctx, x, l, y, justDown) {
    ctx.lineWidth = 4
    ctx.strokeStyle = "yellow"
    ctx.fillStyle = "yellow"
    
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x, y - l)
    ctx.stroke()

    //if (!justDown) {
        ctx.beginPath()
        ctx.moveTo(x - 10, y - l)
        ctx.lineTo(x , y - l)
        ctx.lineTo(x + 10, y - l)
        ctx.closePath()
        ctx.stroke()
    //}

    ctx.beginPath()
    ctx.moveTo(x - 10, y )
    ctx.lineTo(x , y )
    ctx.lineTo(x + 10, y )
    ctx.closePath()
    ctx.stroke()
}

    
