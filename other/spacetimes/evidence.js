var graph = document.getElementById("expandingspace")
var graph2 = document.getElementById("expandingtime")
var graph3 = document.getElementById("justtime")
var imgSN = document.getElementById("supernova")

var t = 0

var animHandle = setInterval(() => {
    drawSpacetime(graph)
    drawSpacetime(graph2, 1)
    drawTime(graph3)
    t++
}, 1000 / 30)
setTimeout(() => clearInterval(animHandle), 60 * 1000 * 2)


function drawSpacetime(graph, version) {
    var ctx = graph.getContext("2d")

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, graph.width, graph.height)

    var x0 = graph.width / 20
    var y0 = graph.height / 20
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

    ctx.font = "12pt Sans"
    ctx.fillStyle = "white"
    ctx.fillText("Time", 22, graph.height - 20)
    ctx.textAlign = "right"
    ctx.fillText("Space", graph.width - 5, 14)

    var scale = Math.sin(t / 10) * 5

    var snStart = graph.height / 2 - 30
    ctx.drawImage(imgSN, graph.width / 3 - imgSN.width / 2, snStart - imgSN.height - scale, imgSN.width, imgSN.height + scale * 2)

    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.arc(graph.width / 3, snStart + scale, 8, 0, Math.PI*2)
    ctx.arc(graph.width / 3, snStart - imgSN.height - scale, 8, 0, Math.PI*2)
    ctx.fill()
    
    ctx.font = "10pt Sans"
    ctx.fillStyle = "white"
    ctx.textAlign = "left"
    
    ctx.fillText("SN start", 8 + graph.width / 3, 4 + snStart)
    ctx.fillText("SN end", 8 + graph.width / 3, 4 + snStart - imgSN.height)

    drawUpArrow(ctx, graph.width / 3 - imgSN.width / 2 - 20, imgSN.height + 2 * scale, snStart + scale)
    
    var cosZoom = 9
    var cosStartX = graph.width * 3/4 
    var cosStartY = graph.height * 3/4 - 20
    
    ctx.strokeStyle = "white"
    ctx.lineWidth = 2
    ctx.translate(cosStartX, cosStartY)
    if (version === 1) {
        ctx.rotate(Math.PI / 4 + scale/50)
    }
    else {
        ctx.rotate(Math.PI / 4 - scale/50)
    }
    ctx.beginPath()
    ctx.moveTo(cosZoom * -Math.PI*2 * (1 + scale/50), 0 - cosZoom)
    for (let i = -Math.PI*2; i < Math.PI*2; i+=0.1) {
        //ctx.lineTo(cosZoom * i * (1 + scale/50), - cosZoom * Math.cos(i))
        ctx.lineTo(cosZoom * i * (1 + scale/50), - cosZoom * Math.cos(i))
    }
    ctx.stroke()

    ctx.fillStyle = "blue"
    for (let i = -1; i < 2; i++) {
        ctx.beginPath()

        if (version === 1) {
            ctx.arc(i * 50 + i * scale, -cosZoom, 8, 0, Math.PI*2)
        }
        else {
            ctx.arc(i * 50 + i * scale, -cosZoom, 8, 0, Math.PI*2)
            //ctx.arc(i * (50 + scale), -40 - i * (40), 8, 0, Math.PI*2)
        }
        ctx.fill()
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0)


    if (version === 1) {
        drawUpArrow(ctx, cosStartX - 70, 120 + 2 * scale, cosStartY + 60 + scale)
    }
    else {
        drawRightArrow(ctx, graph.width / 2 + 40 - scale, graph.width / 2 + 160 + 2 * scale, cosStartY + 70)
    }


}

function drawRightArrow(ctx, x1, x2, y) {
    ctx.lineWidth = 4
    ctx.strokeStyle = "yellow"
    ctx.fillStyle = "yellow"
    
    ctx.beginPath()
    ctx.moveTo(x1, y)
    ctx.lineTo(x2, y)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(x2 - 10, y - 10)
    ctx.lineTo(x2 + 2, y)
    ctx.lineTo(x2 - 10, y + 10)
    ctx.closePath()
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(x1 + 10, y - 10)
    ctx.lineTo(x1 - 2 , y)
    ctx.lineTo(x1 + 10, y + 10)
    ctx.closePath()
    ctx.fill()
}

function drawUpArrow(ctx, x, l, y, justDown) {
    ctx.lineWidth = 4
    ctx.strokeStyle = "yellow"
    ctx.fillStyle = "yellow"
    
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x, y - l)
    ctx.stroke()

    if (!justDown) {
        ctx.beginPath()
        ctx.moveTo(x - 10, y - l + 12)
        ctx.lineTo(x , y - l - 2)
        ctx.lineTo(x + 10, y - l + 12)
        ctx.closePath()
        ctx.fill()
    }

    ctx.beginPath()
    ctx.moveTo(x - 10, y - 12)
    ctx.lineTo(x , y + 2)
    ctx.lineTo(x + 10, y - 12)
    ctx.closePath()
    ctx.fill()
}

function drawTime(graph) {
    var ctx = graph.getContext("2d")

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, graph.width, graph.height)

    var x0 = graph.width / 2
    var y0 = graph.height / 20
    ctx.strokeStyle = "White"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(x0, 0)
    ctx.lineTo(x0, graph.height)
    ctx.stroke()

    ctx.font = "12pt Sans"
    ctx.fillStyle = "white"
    ctx.fillText("Time", x0 + 4, 20)

    var scale = Math.sin(t / 10) * 10
            
    var snStart = graph.height / 2 - 30
    ctx.drawImage(imgSN, x0 - imgSN.width / 2, snStart - imgSN.height + scale * 1/5, imgSN.width, imgSN.height + scale * 0.6)

    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.arc(x0, snStart + scale * 0.6, 8, 0, Math.PI*2)
    ctx.arc(x0, snStart - imgSN.height + scale * 1/5, 8, 0, Math.PI*2)
    ctx.fill()
    
    ctx.font = "10pt Sans"
    ctx.fillStyle = "white"
    ctx.textAlign = "left"
    
    ctx.fillText("SN start", 8 + x0, 4 + snStart)
    ctx.fillText("SN end", 8 + x0, 4 + snStart - imgSN.height)

    drawUpArrow(ctx, graph.width / 2 - imgSN.width / 2 - 20, graph.height * 4/6 + scale, graph.height * 5/6 + scale, true)
    
    var cosZoom = 9
    var cosStartX = graph.width / 2
    var cosStartY = graph.height * 1/2 + 20
    
    ctx.strokeStyle = "white"
    ctx.lineWidth = 2
    ctx.translate(cosStartX - 8, cosStartY)
    ctx.rotate(Math.PI / 2)
    ctx.beginPath()
    ctx.moveTo(cosZoom * -Math.PI*2, 0 - cosZoom)
    for (let i = 0; i < Math.PI*4; i+=0.1) {
        ctx.lineTo((cosZoom) * i * (1+scale/50), -16 + cosZoom * Math.cos(i))
    }
    ctx.stroke()

    ctx.fillStyle = "blue"
    for (let i = 1; i <= 3  ; i++) {
        ctx.beginPath()
        ctx.arc(cosZoom * Math.PI * 2 * (i-1) + i * scale/2, -8, 8, 0, Math.PI*2)
        ctx.fill()
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0)


    //drawUpArrow(ctx, graph.width / 2 - imgSN.width / 2 - 20, 120 + 2 * scale, cosStartY + 60 + scale)
    
}

