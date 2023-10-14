function runnerDemo2(canvas) {
    var ctx = canvas.getContext("2d")
    var w = canvas.width
    var h = canvas.height

    var finishLine = {x: 10}
    var runner1 = {x: 0, y: 150}
    var runner2 = {x: 0, y: 400}
    
    var zoom = 50
    
    var ii
    var x
    var lastX

    var showArrows = 1

    var t = 0
    var rw = 80

    var H = 1/16
    var H0 = H

    var t1
    var t2
    var ii

    var draw = function () {

        canvas.width = canvas.width

        ctx.translate(w / 10, 100)

        ctx.textAlign = "center"
        ctx.fillStyle = "white"
        ctx.font = "36pt serif"
        ctx.fillText("START", 0, 40)
        ctx.fillText("FINISH", finishLine.x * zoom, 40)

        if (t === 0) {
            ctx.fillText("10 meters", finishLine.x * zoom / 2, h - 140)
        }

        ctx.fillText(Math.floor(t) + " s", finishLine.x * zoom / 2, 0)

        if (t1) {
            ctx.fillText("finished:", 280, runner1.y + 40)
            ctx.fillStyle = "blue"
            ctx.fillText( t1.toFixed(2) + " s", 280, runner1.y + rw + 80)
        }
        if (t2) {
            ctx.fillStyle = "red"
            ctx.fillText(t2.toFixed(2) + " s", 280, runner2.y + rw - 40)
        }

        ctx.fillStyle = "white"
        ctx.fillRect(-2, 68, 4, h - 290)
        ctx.fillRect(-2 + finishLine.x * zoom, 68, 4, h - 290)
        
        if (showArrows) {
            lastX = 0
            ctx.globalAlpha = showArrows
            for (ii = 0; ii < 15; ii++) {
                x = lastX + 1.05 + lastX / 10
                drawRightArrow(lastX * zoom, x * zoom, h - 250)
                drawRightArrow(lastX * zoom, x * zoom, 100)
                lastX = x
            }
    
        }
        ctx.globalAlpha = 1

        ctx.fillStyle = "blue"
        ctx.fillRect(zoom * runner1.x - rw/2, runner1.y, rw, rw)

        if (runner2) {
            ctx.fillStyle = "red"
            ctx.fillRect(zoom * runner2.x - rw/2, runner2.y, rw, rw)
    
        }

        ctx.fillStyle = "yellow"
        if (line1) {
            ctx.fillRect(line1.x * zoom, 310, line1.l * zoom, 20)
            ctx.fillRect(line1.x * zoom - 8, 300, 20, 40)
            ctx.fillRect(line1.l * zoom - 8, 300, 20, 40)
    
        }
        if (line2) {
            ctx.fillRect(line2.x * zoom, 310, line2.l * zoom, 20)    
            ctx.fillRect(line2.x * zoom - 8, 300, 20, 40)
            ctx.fillRect((line2.x + line2.l) * zoom - 8, 300, 20, 40)
    }

        ctx.lineWidth = 10
    /*
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

    var line1
    var line2

    var phase = 0
    var pauses = 0
    var run = function () {
        //t = 0
        //runner1.x = 0

        var dt = 0.05

        var h = setInterval(() => {
            t += dt
            
            if (runner2 && t >= 1) {
                runner2.x += (1 + runner2.x * H) * dt 
            }

            if (phase === 1 && t < 1) {
                runner1.x += (1) * dt 
            }
            else {
                runner1.x += (1 + runner1.x * H) * dt 
            }

            if (showArrows < 1 && t >= 1 && !t1) {
                showArrows += 0.1
            }
            if (phase > 0 && showArrows > 0 && t1) {
                showArrows= Math.max(0, showArrows - 0.1)
            }
            if (phase === 0 || (t >= 1 && !t1)) {
                //showArrows = Math.min(1, showArrows + 0.1)
                finishLine.x += (finishLine.x * H) * dt 
            }
            
            if (runner1.x >= finishLine.x && !t1) {
                t1 = t
                if (phase > 0) {
                    H = 0
                }
            }
            if (runner2.x >= finishLine.x) {
                t2 = t
                clearInterval(h)
                if (pauses === 1) {
                    line2 = {x: runner2.x, l: runner1.x - runner2.x}
                    
                }
            }
            draw()
        }, 1000/60)

    }



    function drawRightArrow(x1, x2, y) {
        ctx.lineWidth = 14
        ctx.strokeStyle = "green"
        ctx.fillStyle = "green"
        
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
    
    }

    var yesTD = function () {
        ctx.fillStyle = "pink"
        ctx.font = "48pt serif"
        ctx.fillText("TIME DILATION!!", finishLine.x * zoom / 2, 380)
        
    } 

    var reset = function () {
        phase++
        t = 0
        runner1.x = 0
        runner2.x = 0
        finishLine.x = 10
        t1 = 0
        t2 = 0

        arrows(false)
        
    }

    var arrows = function (on) {
        var start = Date.now()
        var tt
        runner1.x = 0
        t = 0
                
        var h = setInterval(() => {
            tt = (Date.now() - start) / 1000
            showArrows = Math.min(1, tt)

            if (!on) {
                showArrows = 1 - showArrows
            }

            if (showArrows === (on ? 1 : 0)) {
                clearInterval(h)
            }
            draw()
        }, 1000/60)
    }

    return {draw, run, reset, yesTD}

}