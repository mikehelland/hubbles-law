function runnerDemo(canvas) {
    var ctx = canvas.getContext("2d")
    var w = canvas.width
    var h = canvas.height

    var finishLine = {x: 10}
    var runner1 = {x: 0}

    var zoom = 150
    
    var ii
    var x
    var lastX

    var showArrows = 0

    var t = 0
    var rw = 80

    var H = 0

    var draw = function () {

        canvas.width = canvas.width

        ctx.translate(w / 10, 100)

        ctx.textAlign = "center"
        ctx.fillStyle = "white"
        ctx.font = "36pt serif"
        ctx.fillText("START", 0, 40)
        ctx.fillText("FINISH", finishLine.x * zoom, 40)

        ctx.fillText("10 meters", finishLine.x * zoom / 2, h - 140)

        ctx.fillText(Math.floor(t) + " s", finishLine.x * zoom / 2, 0)

        ctx.fillRect(-2, 68, 4, h - 290)
        ctx.fillRect(-2 + finishLine.x * zoom, 68, 4, h - 290)
        
        if (showArrows) {
            lastX = 0
            ctx.globalAlpha = showArrows
            for (var ii = 0; ii < 7; ii++) {
                x = lastX + 1.05 + lastX / 10
                drawRightArrow(lastX * zoom, x * zoom, h - 250)
                drawRightArrow(lastX * zoom, x * zoom, 100)
                lastX = x
            }
    
        }
        ctx.globalAlpha = 1

        ctx.fillStyle = "blue"
        ctx.fillRect(zoom * runner1.x - rw/2, 300, rw, rw)


        ctx.strokeStyle = "#AAAAAA"

        ctx.lineWidth = 10

        /*
        ctx.fillStyle = "white"
        ctx.beginPath()
        ctx.arc(clock1.x, 0, clock1.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()


        ctx.beginPath()
        ctx.arc(clock0.x, 0, clock0.r, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        ctx.strokeStyle = "black"

        ctx.beginPath()
        ctx.moveTo(clock1.x, 0)
        ctx.lineTo(clock1.x + Math.sin(t1) * clock1.r, -Math.cos(t1) * clock1.r)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(clock0.x, 0)
        ctx.lineTo(clock0.x + Math.sin(t0) * clock0.r, -Math.cos(t0) * clock0.r)
        ctx.stroke()

        ctx.fillStyle = "yellow"
        for (i = 0; i < photons.length; i++) {
            ctx.fillRect(photons[i].x, 2, -15, 10)
        }

        ctx.drawImage(telescope, ts.x - telescope.width / 2, -telescope.height / 2)

        ctx.beginPath()
        ctx.arc(sn.x, 0, sn.r, 0, Math.PI * 2)
        ctx.fillStyle = "orange"
        ctx.fill()


        if (showTime) {
            ctx.fillStyle = "white"
            ctx.font = "36pt serif"
            if (showTime0) {
                ctx.fillText("28 days", clock0.x, 210)
            }
            ctx.fillText("20 days", clock1.x, 210)
        
        }
        */

    }


    
    var run = function () {
        var start = Date.now()
        t = 0
        var nextT = 0

        var dt = 0.05

        var h = setInterval(() => {
            t += dt
            
            runner1.x += (1 + runner1.x * H) * dt 

            if (runner1.x >= finishLine.x) {
                clearInterval(h)
            }

            draw()
        }, 1000/60)

    }

    var light = function () {
        var start = Date.now()
        var t = 0
        var i 
        var dx = 2
        t1 = 0
        var nextP = 0
        var emitted = 0
        var received = 0
        var start2

        var h = setInterval(() => {
            t1 = emitted < 5 ? (Date.now() - start) / dt : 0
            
            if (start2) {
                t0 = received < 5 ? (Date.now() - start2) / dt : 0
            }
            //t0 = received > 0 ? 

            if (t1 >= nextP && emitted < 5) {
                photons.push({x: clock1.x})
                nextP += Math.PI / 2

                emitted++

            }

            for (i = photons.length - 1; i >= 0; i--) {
                photons[i].x -= dx

                if (photons[i].x < clock0.x + clock0.r + 300) {
                    photons.splice(i, 1)
                    received++
                    if (!start2) {
                        start2 = Date.now()
                    }
                    if (received === 5) {
                        clearInterval(h)
                    }
                }
            }

            t++
            draw()
        })

    }

    var arrows = function () {
        var start = Date.now()
        var t
        var h = setInterval(() => {
            t = (Date.now() - start) / 1000
            showArrows = Math.min(1, t)
            if (showArrows === 1) {
                clearInterval(h)
                t = 0
                runner1.x = 0
                H = 1/10
            }
            draw()
        }, 1000/60)
    }

    function drawRightArrow(x1, x2, y) {
        ctx.lineWidth = 14
        ctx.strokeStyle = "yellow"
        ctx.fillStyle = "yellow"
        
        ctx.beginPath()
        ctx.moveTo(x1 + 14, y)
        ctx.lineTo(x2 - 5, y)
        ctx.stroke()
    
        ctx.beginPath()
        ctx.moveTo(x2 - 20, y - 30)
        ctx.lineTo(x2 + 2, y)
        ctx.lineTo(x2 - 20, y + 30)
        ctx.closePath()
        ctx.fill()
    
        /*
        ctx.beginPath()
        ctx.moveTo(x1 + 10, y - 10)
        ctx.lineTo(x1 - 2 , y)
        ctx.lineTo(x1 + 10, y + 10)
        ctx.closePath()
        ctx.fill()
        */
    }

    return {draw, run, light, arrows}

}