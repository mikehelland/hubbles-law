function snDemo(canvas) {
    var ctx = canvas.getContext("2d")
    var w = canvas.width
    var h = canvas.height

    var i
    
    var ts = {x: -w / 8 * 2}
    var sn = {x: w / 8 * 2, r: 10}
    
    var clock1 = {x: sn.x + 200, r: 40}
    var clock0 = {x: ts.x - 200, r: 40}

    var photons = []

    var t0 = 0
    var t1 = 0
    var dt = 800
    var td1 = 1100

    var showTime, showTime0
    var caption = "1 billion lightyears"

    var draw = function () {

        canvas.width = canvas.width

        ctx.translate(w / 2, h / 2)

        ctx.textAlign = "center"
        ctx.fillStyle = "white"
        ctx.font = "46pt serif"
        ctx.fillText(caption, 0, -210)

        ctx.fillRect(ts.x, -190, sn.x - ts.x, 10)
        ctx.fillRect(ts.x, -190, 10, 30)
        ctx.fillRect(sn.x, -190, 10, 30)
        
        ctx.strokeStyle = "#AAAAAA"

        ctx.lineWidth = 10

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
            ctx.font = "26pt serif"
            ctx.fillStyle = "#888888"
            ctx.fillText('("rest frame")', clock1.x, 260)
        
        }

    }


    
    var run = function () {
        var start = Date.now()
        clock1.lastT = 0

        sn.r = 200
        
        var h = setInterval(() => {
            t1 = (Date.now() - start) / td1
            t0 = (Date.now() - start) / 800

            sn.r -= 0.4

            if (Math.sin(clock1.lastT) < 0 && Math.sin(t1) >= 0) {
                clearInterval(h)
                showTime = true
                showTime0 = true
            }
            draw()
            clock1.lastT = t1
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

    return {draw, run, light}

}