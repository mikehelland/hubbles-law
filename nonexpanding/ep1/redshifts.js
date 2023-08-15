var graph = document.getElementById("expandingspace")
var graph2 = document.getElementById("expandingtime")

var spectrum = document.getElementById("spectrum")

var t = 0
var spacing = 150
var sy = 3

drawSpacetime(graph)
drawSpacetime(graph2, 1)

var animHandle

setTimeout(() => {
    animHandle = setInterval(() => {
        drawSpacetime(graph)
        drawSpacetime(graph2, 1)
        t++
    }, 1000 / 30)
    setTimeout(() => clearInterval(animHandle), 30 * 1000)
    
}, 1000)

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
    ctx.lineTo(x0, graph.height - 68)
    ctx.stroke()

    ctx.font = "14pt Sans"
    ctx.fillStyle = "white"
    ctx.textAlign = "right"
    ctx.fillText("Time", 86, graph.height - 80)
    ctx.fillText("Space", graph.width - 5, 18)

    var scale = (-Math.cos(t / 10) + 1) * 25/2

    ctx.drawImage(spectrum, 40, graph.height - 60, graph.width - 80, 50)
    
    var sx = graph.width / 4 * 3 - scale * 18
    var color = "blue"
    if (location.protocol !== "file:") {
        var p = ctx.getImageData(sx, graph.height - 34, 1, 1).data; 
        color = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);    
    } 
    
    ctx.fillStyle = "black"
    ctx.fillRect(sx, graph.height - 64, 10, 60)


    var cosZoom = 9
    var cosStartX = graph.width * 1/2 
    var cosStartY = graph.height * 1/2 
    
    ctx.strokeStyle = "white"
    ctx.lineWidth = 4
    ctx.translate(cosStartX, cosStartY)
    
    if (version === 1) {
        ctx.rotate(Math.PI / 4 + scale/spacing)
    }
    else {
        ctx.rotate(Math.PI / 4 - scale/spacing)
    }
    ctx.beginPath()
    ctx.moveTo(-spacing + -scale , 2 * - cosZoom)
    for (let i = -Math.PI*2; i < Math.PI*2; i+=0.1) {
        //ctx.lineTo(cosZoom * i * (1 + scale/50), - cosZoom * Math.cos(i))
        //ctx.lineTo(cosZoom * i * (1 + scale/spacing), - cosZoom * Math.cos(i))
        ctx.lineTo(spacing/(Math.PI*2) * i + i/(Math.PI*2) * scale, - cosZoom * sy * Math.cos(i))
    }
    ctx.stroke()

    ctx.fillStyle = color
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


    if (version === 1) {
        drawUpArrow(ctx, graph.width / 4, 220 + 2 * scale, cosStartY + 100 + scale)
    }
    else {
        drawRightArrow(ctx, graph.width / 3 - scale, graph.width / 3 * 2 + scale, 
            graph.width / 4 * 3)
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

    
function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}