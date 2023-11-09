function demoLightcone2() {

    var canvas = lightcone2
    var ctx = canvas.getContext("2d")
    
    var ly0 = 0.53
    var ly = ly0

    var di

    var ticks = []

    for (di = -1800; di <= 1800; di+=100) {
        ticks.push(di)
    }

    var pointX = -550
    var pointT = 550

    var line1 = [0]
    var line2 = [0]
    var H0 = 0.0007
    var H = H0
    var d = 0
    var z = 0
    var d2 = 0.1
    for (var i = 0; i < 1400; i++) {
        d += 1 - H * d
        d2 += 1 - H * d2
        z = 0.1 / (d2 - d) - 1
        
        if (isNaN(d)) break

        line1.push(-d)

        H = H0 * Math.sqrt(0.3 * (1+z)**3 + 0.7)
    }

    var alphaLine = 1
    var alphaCurve = 1
    var alphaGalaxy = 0
    var alphaLightArrow = 0

    var draw = function () {
        canvas.width = canvas.width
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.translate(canvas.width - 20, 20)


        ctx.lineWidth = 2
        ctx.strokeStyle = "white"
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(-1000, 0)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, 1000)
        ctx.stroke()

        ctx.lineWidth = 4

        for (di = 0; di < ticks.length; di++) {
            ctx.beginPath()
            ctx.moveTo(ticks[di] * ly, -4)
            ctx.lineTo(ticks[di] * ly, 4)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(-4, ticks[di] * ly)
            ctx.lineTo(4, ticks[di] * ly)
            ctx.stroke()    

        }



        ctx.font = "16pt sans-serif"
        ctx.fillStyle = "white"
        ctx.textAlign = "right"
        ctx.fillText("time", -5, canvas.height - 25)
        ctx.textAlign = "left"
        ctx.fillText("space", -canvas.width + 25, 25)
        
        ctx.lineWidth = 4
        ctx.strokeStyle = "yellow"

        ctx.font = "italic 20pt serif"
        ctx.textAlign = "center"

        if (alphaLine) {
            ctx.globalAlpha = alphaLine
            
            ctx.beginPath()
            ctx.moveTo(-1000, 1000)
            ctx.lineTo(0, 0)
            ctx.setLineDash([30, 10])
            ctx.stroke()
            ctx.setLineDash([])

            ctx.fillStyle = "white"
            ctx.fillText("v = c", -670, 580)
        }

        ctx.globalAlpha = 1


        if (alphaCurve) {
            ctx.globalAlpha = alphaCurve
            ctx.lineWidth = 4
            ctx.strokeStyle = "yellow"
            ctx.beginPath()
            for (di = 0; di < line1.length; di++) {
                ctx.lineTo(line1[di] * ly, di * ly)
            }
            ctx.stroke()

            if (alphaGalaxy) {
                ctx.fillText("v = c - Hd", -220, 580)
            }
            else {
                ctx.fillText("v = ?", -220, 580)
            }
        }
        ctx.globalAlpha = 1




        ctx.globalAlpha = alphaGalaxy

        ctx.fillStyle = "lightblue"
        ctx.fillText("v = Hd", -320, pointT * ly -30)

        ctx.strokeStyle = "white"
        ctx.fillStyle = "gray"
        ctx.beginPath()
        ctx.arc(ly * pointX, ly * pointT, 14, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        drawLeftArrow(ctx, ly * pointX - 20, ly * pointT, 50)

        ctx.globalAlpha = alphaLightArrow

        drawRightArrow(ctx, ly * -1290 - 20, ly * -1200 + 20, ly * 1000)

        ctx.globalAlpha = 1

        ctx.textAlign = "right"
        ctx.fillStyle = "white"
        ctx.font = "italic 20pt serif"
        ctx.fillText("(−1 ly, −1 y)", -ly - 5, ly - 33)
    }



    function drawRightArrow(ctx, x1, x2, y) {
        ctx.lineWidth = 10
        ctx.strokeStyle = "yellow"
        ctx.fillStyle = "yellow"
        
        ctx.beginPath()
        ctx.moveTo(x1, y)
        ctx.lineTo(x2 - 6, y)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x2 - 12, y - 10)
        ctx.lineTo(x2 + 0 , y)
        ctx.lineTo(x2 - 12, y + 10)
        ctx.closePath()
        ctx.fill()
    }

    function drawLeftArrow(ctx, x, y, l) {
        ctx.lineWidth = 10
        ctx.strokeStyle = "lightblue"
        ctx.fillStyle = "lightblue"
        
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x - l, y)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x - l + 0, y - 10)
        ctx.lineTo(x - l - 12 , y)
        ctx.lineTo(x - l + 0, y + 10)
        ctx.closePath()
        ctx.fill()
    }


    var anim = function (callback) {
        var start = Date.now()
        var now
        var h = setInterval(() => {
            now = Date.now() - start

            if (callback(now)) {
                clearInterval(h)
            }
            
            draw()
        }, 1000/60)
    }

    var showGalaxy = function () {
        anim((now) => {
            alphaGalaxy = Math.min(1, now/1000)
            return now > 1000
        })
    }

    var hideCurve = function () {
        anim((now) => {
            alphaCurve = 1 - Math.min(1, now/1000)
            alphaLightArrow = Math.min(1, now/1000)
            return now > 1000
        })
    }

    var showCurve = function () {
        anim((now) => {
            alphaCurve = Math.min(1, now/1000)
            alphaLine = 1 - alphaCurve
            alphaLightArrow = alphaLine
            return now > 1000
        })
    }

    var showArrow = function () {
        anim((now) => {
            alphaLightArrow = Math.min(1, now/1000)
            return now > 1000
        })
    }

    var moveG = function () {
        anim((now) => {
            
            pointT = 550 + 240 * Math.min(1, now/2000)
            return now > 2000
        })
    }

    return {draw, showGalaxy, hideCurve, showArrow, showCurve, moveG}
}