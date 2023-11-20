function demoLightcone1(canvas) {

    var ctx = canvas.getContext("2d")
    
    var ly0 = 150
    var ly = ly0

    var di

    var ticks = []
    for (di = -6; di <= 6; di++) {
        ticks.push(di)
    }

    for (di = -1800; di <= 1800; di+=100) {
        ticks.push(di)
    }

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
    H = H0
    d = 0
    d2 = 0.1
    z = 0
    for (var i = 0; i < 1400; i++) {
        d += 1 + H * d
        d2 += 1 + H * d2
        z = 0.1 / (d2 - d) - 1
        
        if (isNaN(d)) break

        line2.push(d)

        H = H0 * Math.sqrt(0.3 * (1+z)**3 + 0.7)
    }
    console.log(line2)

    var alphaPast = 0
    var alphaFuture = 0
    var alphaPastC = 0
    var alphaFutureC = 0
    var alphaVC = 0
    var alphaVnC = 0
    var alphaObserver = 0
    var alphaPoint = 0
    var alphaOutPoint = 0

    var alphaVC_C = 0
    var alphaVnC_C = 0

    var alphaQuad = 0
    
    var draw = function () {
        canvas.width = canvas.width
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.translate(canvas.width / 2, canvas.height / 2)

        if (alphaFuture) {
            ctx.globalAlpha = alphaFuture

            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(-1000, -1000)
            ctx.lineTo(1000, -1000)
            ctx.fillStyle = "blue"
            ctx.fill()
        }

        if (alphaPast) {
            ctx.globalAlpha = alphaPast

            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(-1000, 1000)
            ctx.lineTo(1000, 1000)
            ctx.fillStyle = "red"
            ctx.fill()
        }
        ctx.globalAlpha = 1


        ctx.lineWidth = 2
        ctx.strokeStyle = "white"
        ctx.beginPath()
        ctx.moveTo(-canvas.width / 2, 0)
        ctx.lineTo(canvas.width / 2, 0)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, -canvas.height / 2)
        ctx.lineTo(0, canvas.height / 2)
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
        ctx.fillText("time", 5, -canvas.height / 2 + 21)
        ctx.textAlign = "right"
        ctx.fillText("space", canvas.width / 2 - 5, -15)
        
        /*
        ctx.lineWidth = 4
        ctx.strokeStyle = "yellow"
        ctx.beginPath()
        ctx.moveTo(-1000, -1000)
        ctx.lineTo(1000, 1000)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(-1000, 1000)
        ctx.lineTo(1000, -1000)
        ctx.stroke()
        */

        if (alphaVC) {
            ctx.globalAlpha = alphaVC
            ctx.lineWidth = 10
            ctx.strokeStyle = "yellow"
            ctx.beginPath()
            for (di = 0; di < line1.length; di++) {
                ctx.lineTo(line1[di] * ly, di * ly)
            }
            ctx.stroke()


            ctx.lineWidth = 10
            ctx.strokeStyle = "yellow"
            ctx.beginPath()
            for (di = 0; di < line2.length; di++) {
                ctx.lineTo(line2[di] * ly, -di * ly)
            }
            ctx.stroke()
        }
        ctx.globalAlpha = 1


        if (alphaVnC) {
            ctx.globalAlpha = alphaVnC
            ctx.lineWidth = 10
            ctx.strokeStyle = "yellow"
            ctx.beginPath()
            for (di = 0; di < line1.length; di++) {
                ctx.lineTo(line1[di] * -ly, di * ly)
            }
            ctx.stroke()


            ctx.lineWidth = 10
            ctx.strokeStyle = "yellow"
            ctx.beginPath()
            for (di = 0; di < line2.length; di++) {
                ctx.lineTo(line2[di] * -ly, -di * ly)
            }
            ctx.stroke()
        }
        ctx.globalAlpha = 1



        ctx.font = "italic 20pt serif"
        ctx.textAlign = "center"
        if (alphaVnC_C) {
            ctx.fillText("v = −c", -270, -180)
        }
        if (alphaVC_C) {
            ctx.fillText("v = c", 260, -180)
        }


        ctx.font = "bold 32pt sans-serif"
        if (alphaFutureC) {
            ctx.globalAlpha = alphaFutureC
            ctx.fillText("FUTURE", 0, -240)
        }
        if (alphaPastC) {
            ctx.globalAlpha = alphaPastC
            ctx.fillText("PAST", 0, 300)
        }
        ctx.globalAlpha = 1


        if (alphaObserver) {
            ctx.globalAlpha = alphaObserver
            ctx.lineWidth = 4
            ctx.strokeStyle = "white"
            ctx.fillStyle = "gray"
            ctx.beginPath()
            ctx.arc(0, 0, 14, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()

            ctx.textAlign = "left"
            ctx.font = "italic 20pt serif"
            ctx.fillText("Observer", 30, -10)
        }
        ctx.globalAlpha = 1

        if (alphaPoint) {
            ctx.globalAlpha = alphaPoint
            ctx.lineWidth = 4
            ctx.strokeStyle = "white"
            ctx.fillStyle = "lightblue"
            ctx.beginPath()
            ctx.arc(-ly, ly, 14, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()

            ctx.textAlign = "right"
            ctx.fillStyle = "lightblue"
            ctx.font = "italic 20pt serif"
            ctx.fillText("(−1 y, −1 ly)", -ly - 5, ly - 33)
        }
        ctx.globalAlpha = 1

        if (alphaOutPoint) {
            ctx.globalAlpha = alphaOutPoint

            ctx.beginPath()
            ctx.moveTo(ly * 1.5, ly / 2)
            ctx.lineTo(0, - 1 * ly)
            ctx.setLineDash([20, 20])
            ctx.strokeStyle = "yellow"
            ctx.stroke()
            ctx.setLineDash([])


            ctx.lineWidth = 4
            ctx.strokeStyle = "white"
            ctx.fillStyle = "lightblue"
            ctx.beginPath()
            ctx.arc(ly * 1.5, ly / 2, 14, 0, Math.PI * 2)
            ctx.fill()
            ctx.stroke()

            

        }
        ctx.globalAlpha = 1


        if (alphaQuad) {
            ctx.globalAlpha = alphaQuad
            ctx.lineWidth = 8
            ctx.strokeStyle = "red"
            ctx.strokeRect(0, 0, -canvas.width / 2 + 8, canvas.height / 2 - 8)
        }
    }

    var lyE = 0.28
    var zoomOut = function () {
        var start = Date.now()
        var now
        var h = setInterval(() => {
            now = Date.now() - start

            if (now > 2000) {
                clearInterval(h)
                now = 2000
            }

            //alphaVC_C = 1 - Math.min(1, now/1000)
            //alphaVnC_C = 1 - Math.min(1, now/1000)

            //alphaPast = 1 - Math.min(1, now/1000)
            //alphaFuture = 1 - Math.min(1, now/1000)
            
            alphaPoint = 1 - Math.min(1, now/1000)
            ly = (ly0 - lyE) * (1 - now / 2000)**6 + lyE
            
            draw()
        }, 1000/60)
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
        }, 1000/30)
    }

    var showEvent = function () {
        anim((now) => {
            alphaPoint = Math.min(1, now/1000)
            return now > 1000
        })
    }
    var showObserver = function () {
        anim((now) => {
            alphaObserver = Math.min(1, now/1000)
            return now > 1000
        })
    }

    var showVC = function () {
        anim((now) => {
            alphaVC_C = Math.min(1, now/1000)
            alphaVC = Math.min(1, now/1000)
            return now > 1000
        })
    }
    var showVnC = function () {
        anim((now) => {
            alphaVnC_C = Math.min(1, now/1000)
            alphaVnC = Math.min(1, now/1000)
            return now > 1000
        })
    }

    var showCones = function () {
        anim((now) => {
            alphaPast = Math.min(1, now/1000)
            alphaPastC = Math.min(1, now/1000)
            return now > 1000
        })
    }
    var showFutureCone = function () {
        anim((now) => {
            alphaFuture = Math.min(1, now/1000)
            alphaFutureC = Math.min(1, now/1000)
            alphaOutPoint = 1 - alphaFutureC
            return now > 1000
        })
    }
    var hideCones = function () {
        return 
        anim((now) => {
            alphaPast = 1 - Math.min(1, now/1000)
            alphaFuture = 1 - Math.min(1, now/1000)
            return now > 1000
        })
    }

    var showQuad = function () {
        anim((now) => {
            alphaQuad = Math.min(1, now/1000)
            return now > 1000
        })
    }

    var showOutPoint = function () {
        anim((now) => {
            alphaOutPoint = Math.min(1, now/1000)
            return now > 1000
        })
    }

    var expanding = function () {
        alphaPast = 0
        alphaFuture = 0
        alphaPastC = 1
        alphaFutureC = 1
        alphaVC = 1
        alphaVnC = 1
        alphaObserver = 1
        alphaPoint = 1
        alphaVC_C = 0
        alphaVnC_C = 0
    }    

    return {draw, zoomOut, showEvent, showObserver, showVC, showVnC, showCones, showFutureCone, hideCones, expanding, showQuad, showOutPoint}
}