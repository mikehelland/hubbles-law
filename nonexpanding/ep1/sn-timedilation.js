var graph3 = document.getElementById("justtime")
var imgSN = document.getElementById("supernova")

let t2 = 0

var animHandle = setInterval(() => {
    drawSpacetimeSN(graph3)
    t2++
}, 1000 / 30)
setTimeout(() => clearInterval(animHandle), 60 * 1000 * 2)

function drawSpacetimeSN(graph, version) {
    var ctx = graph.getContext("2d")

    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, graph.width, graph.height)

    var x0 = graph.width / 20
    var y0 = graph.height / 20
    var snX = graph3.width / 2 + x0

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
    ctx.fillText("Time", 42, graph.height - 20)
    ctx.textAlign = "right"
    ctx.fillText("Space", graph.width - 5, 14)

    var scale = Math.sin(t2 / 10) * 15

    
    var snStart = graph.height / 2
    ctx.drawImage(imgSN, snX - imgSN.width, snStart - imgSN.height - scale, 2 * imgSN.width, 2 * imgSN.height + scale * 2)

    ctx.fillStyle = "red"
    ctx.beginPath()
    ctx.arc(snX, snStart + imgSN.height + scale, 8, 0, Math.PI*2)
    ctx.arc(snX, snStart - imgSN.height - scale, 8, 0, Math.PI*2)
    ctx.fill()
    
    ctx.font = "10pt Sans"
    ctx.fillStyle = "white"
    ctx.textAlign = "left"
    
    ctx.fillText("SN start", snX + 8, 4 + snStart + imgSN.height + scale)
    ctx.fillText("SN end", snX + 8, 4 + snStart - imgSN.height - scale)

    drawUpArrow(ctx, graph.width / 3 - imgSN.width / 2 - 20, imgSN.height * 2 + 2 * scale, imgSN.height + snStart + scale)
    

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


