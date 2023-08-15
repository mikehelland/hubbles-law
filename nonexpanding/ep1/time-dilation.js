var graphTD = document.getElementById("time-dilation")
var imgSN = document.getElementById("supernova")

drawSpacetimeTDE(graphTD, 0)

function drawSpacetimeTDE(graph, percent) {
    var ctx = graph.getContext("2d")

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, graph.width, graph.height)

    var x0 = graph.width / 20
    var y0 = graph.height / 3
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
    ctx.fillText("Space", graph.width - 5, y0 - 34)

    ctx.fillStyle = "red"

    if (percent > 0) {
        ctx.strokeStyle = "yellow"
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.moveTo(x0, y0)
        ctx.lineTo(x0 + 400, y0 + 400)
        ctx.stroke()    
    }
    if (percent === 1) {
        ctx.beginPath()
        ctx.moveTo(x0, y0 - 200)
        ctx.lineTo(x0 + 500, y0 + 300)
        ctx.stroke()

    }

    ctx.beginPath()
    ctx.arc(x0 + 400, y0 + 400, 16, 0, Math.PI*2)
    ctx.fill()

    ctx.drawImage(imgSN, 
        x0 + 400 - imgSN.width / 2 + 100 * percent, 
        y0 + 400 - imgSN.height / 2 - 100 * percent)
    
    console.log(y0)
}

function animateTDEStart() {
    var ctx = graphTD.getContext("2d")
    var x0 = graphTD.width / 20
    var y0 = graphTD.height / 3
    console.log(y0)
    var start = Date.now()
    var t
    var h = setInterval(() => {
        t = (Date.now() - start) / 2000
        if (t >= 1) {
            clearInterval(h)
            t = 1

        }
        drawSpacetimeTDE(graphTD, t)

        if (t === 1) {
            console.log(y0)
            setTimeout(() => {
                ctx.strokeStyle = "blue"
                ctx.lineWidth = 10
                ctx.beginPath()
                ctx.moveTo(x0 + 570, y0 + 400)
                ctx.lineTo(x0 + 570, y0 + 300)
                ctx.stroke()
            }, 1000)
            
            setTimeout(() => {
                ctx.strokeStyle = "red"
                ctx.lineWidth = 10
                ctx.beginPath()
                ctx.moveTo(x0 - 12, y0)
                ctx.lineTo(x0 - 12, y0 - 200)
                ctx.stroke()
            }, 2000)

        }
    })

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

    
