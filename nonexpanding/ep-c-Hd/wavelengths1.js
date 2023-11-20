function demoWavelengths1(canvas, t) {

    var ctx = canvas.getContext("2d")
    
    var ly0 = 140
    var ly = ly0

    var di

    var ticks = []

    for (di = -10; di <= 10; di+=1) {
        ticks.push(di)
    }


    var H0 = 0.5
    var H = H0
    var d = 0
    var z = 0

    var d2 = 1

    var points = 1
    var point0 = []
    point0.push([0, 0])

    var point1 = []
    point1.push([0, d2])

    for (var i = 0; i < 2; i++) {
        d += 1 + H * d * t
        d2 += 1 + H * d2 * t
        z = (d2 - d) - 1
        
        if (isNaN(d)) break

        point0.push([t * i + t, d])
        point1.push([t * i + t, d2])

    }

    var alphaPoints = 1

    var dtext

    var draw = function () {
        canvas.width = canvas.width
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.translate(20, canvas.height / 2)
        

        ctx.lineWidth = 2
        ctx.strokeStyle = "white"
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(1000, 0)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, -500)
        ctx.lineTo(0, 500)
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
        ctx.textAlign = "left"
        ctx.fillText("time", 5, -canvas.height / 2 + 25)
        ctx.textAlign = "right"
        ctx.fillText("space", canvas.width - 25, 25)
        

        if (t > 0) {
            ctx.font = "italic 20pt serif"
            ctx.textAlign = "left"
            ctx.fillText("λ", 25, 50)
            dtext = ctx.measureText("λ").width
            
            ctx.font = "italic 16pt serif"
            ctx.fillText("emit", 25 + dtext, 60)

            if (points == 3) {
                ctx.globalAlpha = alphaPoints
                ctx.font = "italic 20pt serif"
                ctx.textAlign = "left"
                ctx.fillText("λ", point0[2][0] * ly + 200, -t * point0[2][0] * ly)
                dtext = ctx.measureText("λ").width
                
                ctx.font = "italic 16pt serif"
                ctx.fillText("obs", point0[2][0] * ly + 200 + dtext, -t * point0[2][0] * ly + 10)
            }
        }
        else {
            ctx.font = "italic 20pt serif"
            ctx.textAlign = "left"
            ctx.fillText("λ", 40, -30)
            dtext = ctx.measureText("λ").width
            
            ctx.font = "italic 16pt serif"
            ctx.fillText("obs", 40 + dtext, -20)

            ctx.font = "italic 20pt serif"
            ctx.textAlign = "left"
            ctx.fillText("λ", 220, 350)
            dtext = ctx.measureText("λ").width
            
            ctx.font = "italic 16pt serif"
            ctx.fillText("emit", 220 + dtext, 350 + 10)
        }

        ctx.globalAlpha = 1
        ctx.strokeStyle = "yellow"
            
        ctx.beginPath()
        ctx.moveTo(point0[0][1] * ly, point0[0][0] * ly)
        for (di = 1; di < points; di++) {
            ctx.lineTo(point0[di][1] * ly, -point0[di][0] * ly )
        }
        ctx.stroke()

        for (di = 1; di < points; di++) {
            ctx.beginPath()
            ctx.moveTo(point1[di-1][1] * ly, -point1[di-1][0] * ly)
            ctx.lineTo(point1[di][1] * ly, -point1[di][0] * ly )
            ctx.globalAlpha = points > di ? 1 : alphaPoints
            ctx.stroke()
        }

        ctx.fillStyle = "yellow"
            
        for (di = 0; di < points; di++) {
            ctx.globalAlpha = di + 1 === points ? alphaPoints : 1 
            
            ctx.beginPath()
            ctx.arc(ly * point0[di][1], ly * -point0[di][0], 14, 0, Math.PI * 2)
            ctx.fill()
        
            ctx.beginPath()
            ctx.arc(ly * point1[di][1], ly * -point1[di][0], 14, 0, Math.PI * 2)
            ctx.fill()

        }

        
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

    var next = function () {
        points++
        anim((now) => {
            alphaPoints = Math.min(1, now/2000)
            return now > 2000
        })
    }


    return {draw, next}
}