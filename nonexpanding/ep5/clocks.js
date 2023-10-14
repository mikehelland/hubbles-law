function clocksDemo(canvas) {
    var ctx = canvas.getContext("2d")
    var w = canvas.width
    var h = canvas.height

    var i

    var clock1 = {x: w / 6, r: 120}
    var clock0 = {x: -w / 6, r: 60}

    var photons = []

    var t0 = 0
    var t1 = 0
    var dt = 800

    var caption = "100 meters"

    var showTime 
    var showTime0 = true

    var draw = function () {

        canvas.width = canvas.width

        ctx.translate(w / 2, h / 2)

        ctx.textAlign = "center"
        ctx.fillStyle = "white"
        ctx.font = "46pt serif"
        ctx.fillText(caption, 0, -210)



        ctx.fillRect(clock0.x, -190, clock1.x - clock0.x, 10)
        ctx.fillRect(clock0.x, -190, 10, 30)
        ctx.fillRect(clock1.x, -190, 10, 30)
        
        ctx.strokeStyle = "#AAAAAA"

        ctx.lineWidth = 10

        ctx.fillStyle = "peru"
        ctx.fillRect(clock1.x - clock1.r - 8, -clock1.r - 8, clock1.r * 2 + 16, clock1.r * 3)

        ctx.fillStyle = "white"
        if (t0 === 0 && phase === 0) {
            ctx.fillText("Stopwatch", clock0.x, 210)
            ctx.fillText("Tower", clock1.x, 210)
    
        }


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
            ctx.strokeRect(photons[i].x, 2, -15, 10)
            ctx.fillRect(photons[i].x, 2, -15, 10)

        }


        if (phase > 0) {
            ctx.drawImage(telescope, clock0.x + 100, -telescope.height / 2)
        }

        if (showTime) {
            ctx.fillStyle = "white"
            ctx.font = "36pt serif"
            if (showTime0) {
                ctx.fillText(phase === 3 ? "~1.4 hrs" : "1 hr", clock0.x, 210)
            }
            ctx.fillText("1 hr", clock1.x, 210)
        
        }

    }


    var td1 = 400
    var run = function (phase) {
        var start = Date.now()
        clock1.lastT = 0
        showTime = false
        
        var h = setInterval(() => {
            t1 = (Date.now() - start) / td1
            t0 = (Date.now() - start) / 400

            if (Math.sin(clock1.lastT) < 0 && Math.sin(t1) >= 0) {
                showTime = true
                clearInterval(h)
            }
            draw()
            clock1.lastT = t1
        }, 1000/60)

    }

    var phase = 0
    var move1 = function () {
        showTime = false
        caption = ""
        var start = Date.now()
        var r0 = clock1.r
        var r = r0 * 0.6
        var x0 = clock1.x
        var x = x0 * 1.35

        var h = setInterval(() => {
            t = (Date.now() - start)

            clock1.r = r + (r0 - r) * (1 - t/1000)
            //clock0.r = clock1.r

            clock1.x = x + (x0 - x) * (1 - t/1000)
            clock0.x = -clock1.x

            draw()

            if (t > 1000) {
                clearInterval(h)
                if (phase === 0) {
                    caption = "1 mile"
                }
                if (phase === 1) {
                    caption = "1 million miles"
                    showTime0 = false
                }
                if (phase === 2) {
                    caption = "1 billion lightyears"
                    
                }
                                
                if (phase === 2) {
                    td1 += 150
                }
                
                phase++
                
                if (phase === 1) {
                    run()
                }
                else {
                    draw()
                }
            }
            
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
        showTime0 = false

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
                if (emitted === 5) {
                    showTime = true
                    
                }

            }

            for (i = photons.length - 1; i >= 0; i--) {
                photons[i].x -= dx

                if (photons[i].x < clock0.x + clock0.r + 200) {
                    photons.splice(i, 1)
                    received++
                    if (!start2) {
                        start2 = Date.now()
                    }
                    if (received === 5) {
                        showTime0 = true
                        clearInterval(h)
                    }
                }
            }

            t++
            draw()
        })

    }

    return {draw, run, move1, light}

}