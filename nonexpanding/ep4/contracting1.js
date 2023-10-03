function demoContracting1() {

    var canvas = contractingtop
    var ctx = canvas.getContext("2d")
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    var c2 = contractingbottom
    var ctx2 = c2.getContext("2d")
    c2.width = c2.clientWidth
    c2.height = c2.clientHeight

    var galaxy = document.getElementById("galaxy")
    var gw = galaxy.width / 2
    var gh = galaxy.height / 2

    var gs = []
    for (var i = 0; i < 40; i++) {
        gs.push({
            i, x: i * 100, ax: []
        })
    }

    var phase = 0

    var photon = {x: 0, ax: [0]}

    var zoom = 0.6

    var draw = function () {

        canvas.width = canvas.width
        ctx.translate(0, canvas.height / 2)

        for (i = 0; i < gs.length; i++) {

            ctx.globalAlpha = !gs[i].t ? 1 : Math.max(0, (1 - (-t + gs[i].t) / 100))
            if (ctx.globalAlpha) {
                ctx.drawImage(galaxy, zoom * (ctx.globalAlpha === 1 ? gs[i].x : gs[i].emit), -gh/2, 10, gh)

            }
            
            
        }
        
        ctx.globalAlpha = 1
        ctx.fillStyle = "yellow"
        ctx.fillRect(photon.x * zoom, -10, 10, 20)

        
        c2.width = c2.width

        ctx2.lineWidth = 2
        ctx2.strokeStyle = "blue"
        for (i = 0; i < gs.length; i++) {
            ctx2.beginPath()
            ctx2.moveTo(gs[i].ax[0] * zoom, 0)

            for (var j = 0; j < gs[i].ax.length; j++) {
                ctx2.lineTo(gs[i].ax[j] * zoom, j * zoom)
            }
            ctx2.stroke()
            
        }

        ctx2.strokeStyle = "yellow"
        ctx2.beginPath()
        ctx2.moveTo(0, 0)
        for (i = 0; i < photon.ax.length; i++) {

                ctx2.lineTo(photon.ax[i] * zoom, i * zoom)
        }
        ctx2.stroke()
        
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

        
        c2.width = c2.width

        ctx2.lineWidth = 2
        ctx2.strokeStyle = "blue"
        for (i = 0; i < gs.length; i++) {
            ctx2.beginPath()
            var j = gs[i].ax.length - 1
            ctx2.moveTo(gs[i].ax[j] * zoom, j * zoom)

            for (j; j > -t; j--) {
                ctx2.lineTo(gs[i].ax[j] * zoom, j * zoom)
                //console.log(gs[i].ax[j] * zoom, j * zoom)
            }
            ctx2.stroke()
            
        }

        ctx2.strokeStyle = "yellow"
        ctx2.beginPath()
        ctx2.moveTo(photon.ax[photont] * zoom, -t * zoom)
        for (i = -t; i < -photont; i++) {

                ctx2.lineTo(photon.ax[i] * zoom, i * zoom)
        }
        ctx2.stroke()
        
    }


    var H0 = 70
    H0 = H0 / 3.08e19 * 60 * 60 * 24 * 365 * 1e7
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
                    gs[i].x -= gs[i].x * H
                    gs[i].ax.push(gs[i].x)
    
                    if (!gs[i].t) {
                        if (photon.x >= gs[i].x) {
                            gs[i].t = t
                            gs[i].emit = gs[i].x
                            gs[i].z = z

                        }
                    }
                    
                    
                }

                if (phase === 0 && photon.ax[-t] < photon.ax[-t - 1]) {
                    clearInterval(h)
                    clearInterval(h2)
                    phase++
                }

                if (photon.x < 0) {
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

        h = setInterval(run, 0)
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
