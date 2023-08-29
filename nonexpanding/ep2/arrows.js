function addExpansion (canvas, varNames) {

    var ctx = canvas.getContext("2d")

    var w = canvas.width
    var h = canvas.height

    var R = w/2.5
    var r = 8

    var arrowDepth = 20

    ctx.translate(w/2, h/2)

    for (let i = 0; i < 8; i+=2) {
        drawRightArrow(ctx, "green", r, R, 0)
        ctx.rotate(Math.PI / 2)
    }

    ctx.font = "20pt arial"
    ctx.fillStyle = "white"
    if (varNames) {
        ctx.fillText("H   EXPANSION", 90, 10)
        ctx.font = "14pt arial"
        ctx.fillText("0", 110, 14)
    }
    else {
        ctx.fillText("EXPANSION", 90, 10)
    }

    addGravity = function () {
        for (let i = 0; i < 8; i+=2) {
            drawRightArrow(ctx, "blue", -R + 10, -r - 10, -38)
            ctx.rotate(Math.PI / 2)
        }
    
        ctx.fillStyle = "white"
        ctx.font = "20pt arial"
        if (varNames) {
            ctx.fillText("Ω   GRAVITY", 90, 48)
            ctx.font = "14pt arial"
            ctx.fillText("M", 110, 52)
        }
        else {
            ctx.fillText("GRAVITY", 90, 48)
        }
    
    }

    addDarkEnergy = function () {
        for (let i = 0; i < 8; i+=2) {
            drawRightArrow(ctx, "red", r + 50, R - 10, -40)
            ctx.rotate(Math.PI / 2)
        }
    
        ctx.fillStyle = "white"
        ctx.font = "20pt arial"
        if (varNames) {
            ctx.fillText("Ω   DARK ENERGY", 90, -30)
            ctx.font = "14pt arial"
            ctx.fillText("Λ", 110, -26)
        }
        else {
            ctx.fillText("DARK ENERGY", 90, -30)
        }
    
    }




    function drawRightArrow(ctx, color, x1, x2, y) {
        ctx.lineWidth = 30
        ctx.strokeStyle = color
        ctx.fillStyle = color
        
        ctx.beginPath()
        ctx.moveTo(x1, y)
        ctx.lineTo(x2 - 6, y)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x2 - arrowDepth, y - 30)
        ctx.lineTo(x2 + 10 , y)
        ctx.lineTo(x2 - arrowDepth, y + 30)
        ctx.closePath()
        ctx.fill()
    }

    return {addGravity, addDarkEnergy}
}
