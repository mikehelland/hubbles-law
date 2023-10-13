function contracting1(canvas) {

    var ctx = canvas.getContext("2d")
    //canvas.width = canvas.clientWidth
    //canvas.height = canvas.clientHeight

    var gs = []
    //gs.push({x: 0, ax: []})
    gs.push({
        x: 15 * 10, ax: []
    })

    var phase = 0

    var photon = {x: 0, ax: [0]}

    var zoom = 5

    var draw = function () {
        
        canvas.width = canvas.width

        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        var x0 = canvas.width / 20
        var y0 = canvas.height / 3
        ctx.strokeStyle = "White"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, y0)
        ctx.lineTo(canvas.width, y0)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x0, 0)
        ctx.lineTo(x0, canvas.height)
        ctx.stroke()
    
        ctx.font = "14pt Sans"
        ctx.fillStyle = "white"
        ctx.textAlign = "right"
        ctx.fillText("Time", 86, 24)
        ctx.fillText("Space", canvas.width - 5, y0 - 34)

        ctx.translate(x0, y0)

        ctx.lineWidth = 2
        ctx.strokeStyle = "blue"
        for (i = 0; i < gs.length; i++) {
            ctx.beginPath()
            ctx.moveTo(gs[i].ax[0] * zoom, 0)

            for (var j = 0; j < gs[i].ax.length; j++) {
                ctx.lineTo(gs[i].ax[j] * zoom, j * zoom)
            }
            ctx.stroke()
            
        }

        ctx.strokeStyle = "yellow"
        ctx.beginPath()
        ctx.moveTo(0, 0)
        for (i = 0; i < photon.ax.length; i++) {

                ctx.lineTo(photon.ax[i] * zoom, i * zoom)
        }
        ctx.stroke()
        
    }

    var drawRev = function () {

        canvas.width = canvas.width
        ctx.translate(0, canvas.height / 2)

        for (i = 0; i < gs.length; i++) {
            ctx.globalAlpha = 1

            ctx.drawImage(galaxy, zoom * gs[i].ax[-t], -gh/2, 10, gh)
            
            if (t > gs[i].t) {
                ctx.globalAlpha = 0.1
                ctx.globalAlpha = Math.min(1, Math.max(0.15, (1 - (-gs[i].t + t) / 150)))
                ctx.drawImage(galaxy, zoom * gs[i].emit, -gh/2, 10, gh)
                
            }
            
        }

        ctx.globalAlpha = 1

        var photont = gs[2].t
        if (photont < t) {
            ctx.fillStyle = "yellow"
            ctx.fillRect(photon.ax[-t] * zoom, -10, 10, 20)
    
        }

        
        canvas.width = canvas.width

        ctx.lineWidth = 2
        ctx.strokeStyle = "blue"
        for (i = 0; i < gs.length; i++) {
            ctx.beginPath()
            var j = gs[i].ax.length - 1
            ctx.moveTo(gs[i].ax[j] * zoom, j * zoom)

            for (j; j > -t; j--) {
                ctx.lineTo(gs[i].ax[j] * zoom, j * zoom)
                //console.log(gs[i].ax[j] * zoom, j * zoom)
            }
            ctx.stroke()
            
        }

        ctx.strokeStyle = "yellow"
        ctx.beginPath()
        ctx.moveTo(photon.ax[photont] * zoom, -t * zoom)
        for (i = -t; i < -photont; i++) {

                ctx.lineTo(photon.ax[i] * zoom, i * zoom)
        }
        ctx.stroke()
        
    }


    var H0 = 70
    H0 = H0 / 3.08e19 * 60 * 60 * 24 * 365 * 1e8
    var H = H0 
    var c = 1

    x2 = 0.1

    var h
    var z
    var t = 0
    var tend
    var go = function () {
        console.log("going")

        var run = function () {
            t--
            if (!tend) {
                photon.x += c - H * photon.x
                x2 += c - H * x2
                z = 0.1 / (x2 - photon.x) - 1
    
                photon.ax.push(photon.x)
    
                for (i = 0; i < gs.length; i++) {
                    if (!gs[i].t) {
                        gs[i].x -= gs[i].x * H
                        gs[i].ax.push(gs[i].x)
    
                        if (photon.x >= gs[i].x) {
                            gs[i].t = t
                            gs[i].emit = gs[i].x
                            gs[i].z = z

                        }
                    }
                    
                    
                }

                if (photon.x < 0) {
                    clearInterval(h)
                    clearInterval(h2)
                    tend = t
                }
            }
            

            //draw()

            H = H0 * (0.3 * (1+z)**3 + 0.7)**0.5

            if (tend && tend - 100 > t) {
                clearInterval(h)
                clearInterval(h2)
                console.log("done")
                //t = tend
            }

        }

        h = setInterval(run, 10)
        h2 = setInterval(draw, 1000/60)
    }

    var stop = function () {
        clearInterval(h)
    }

    var selectTwo = function () {
        var oldData = gs
        console.log(oldData)
        //gs = [gs[0], gs[7], gs[25]]
        gs = [gs[0], gs[5], gs[28]]
        console.log(gs[1].z, gs[2].z)
        //draw()

    }

    var rev = function () {
        t = tend

        let h = setInterval(() => {

            drawRev()

            t++

            if (t === 0) {
                clearInterval(h)
            }

        }, 10)
    }
    
    return {go, stop, draw, selectTwo, rev}

}
