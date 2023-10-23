function demoContracting2() {

    var c2 = contracting2
    var ctx2 = c2.getContext("2d")

    var galaxy = document.getElementById("galaxy")
    var gw = galaxy.width / 2
    var gh = galaxy.height / 2

    var gs = []
    var t
    var photon

    var hPhoton = 1

    var reset = function () {
        gs = []
        for (var i = 14; i < 15; i++) {
            gs.push({
                i, x: i * 10, x0: i * 10, ax: [i * 10]
            })
        }
        t = 0
        x2 = 0.1
        photon = {x: 0, ax: [0]}
        H = H0
    }

    reset()
    
    var phase = 0

    var showPhoton = true
    
    var zoom = 6.1

    var topDown

    var draw = function (opacity) {

        
        c2.width = c2.width

        if (opacity) {
            ctx2.globalAlpha = opacity
        }

        topDown = H0 < 0

        ctx2.translate(30, 30)

        ctx2.font = "20px sans-serif"
        ctx2.fillStyle = "white"
        ctx2.fillText("space", c2.width - 120, 0)
        ctx2.fillText("time", 2, c2.height - 40)
        ctx2.strokeStyle = "white"
        ctx2.strokeRect(0, 0, c2.width, c2.height)

        ctx2.fillStyle = "#888888"
        ctx2.font = "16px sans-serif"

        ctx2.textAlign = "right"
        for (i = 0; i < 20; i++) {
            ctx2.fillText(i, i * 10 * zoom, -2)
        }
        for (i = 1; i < 20; i++) {
            ctx2.fillText(i, -2, i * 10 * zoom)
        }

        ctx2.lineWidth = 2
        ctx2.strokeStyle = "blue"
        for (i = 0; i < gs.length; i++) {
            ctx2.beginPath()
            ctx2.moveTo(gs[i].ax[0] * zoom, topDown ? 0 : c2.height)

            for (var j = 0; j < gs[i].ax.length; j++) {
                ctx2.lineTo(gs[i].ax[j] * zoom, topDown ? j * zoom : c2.height - j * zoom)
            }
            ctx2.stroke()
            
        }

        if (showPhoton) {
    
            ctx2.strokeStyle = "yellow"
            ctx2.beginPath()
            ctx2.moveTo(0, topDown ? 0 : c2.height)
            for (i = 0; i < photon.ax.length; i++) {
    
                    ctx2.lineTo(photon.ax[i] * zoom, topDown ? i * zoom : c2.height - i * zoom)
            }
            ctx2.stroke()
        }

        
    }

    var H0 = -70
    H0 = H0 / 3.08e19 * 60 * 60 * 24 * 365 * 1e8
    var H = H0 
    var c = 1
    var OmegaL = 0.7
    var OmegaM = 0.3

    x2 = 0.1

    var z
    var tend
    var gdx
    var twoPhotons = true
    var go = function () {
        console.log("going")
        var h, h2
        var t = 0

        var run = function () {
            t++
            if (!tend) {
                photon.x += c + H * photon.x * hPhoton
                x2 += c + H * x2  * hPhoton

                
                if (twoPhotons) {
                    z = 0.1 / (x2 - photon.x) - 1    
                }
                else {
                    z = (c + H * photon.x) / c - 1
                }
                
                photon.ax.push(photon.x)
    
                for (i = 0; i < gs.length; i++) {
                    gdx = gs[i].x * H
                    gs[i].x += gdx
                    gs[i].ax.push(Math.max(0, gs[i].x))
    
                    if (!gs[i].t) {
                        if (photon.x >= gs[i].x) {
                            console.log(gdx, H * photon.x * hPhoton)
                            gs[i].t = t
                            gs[i].emit = gs[i].x
                            gs[i].z = z

                        }
                    }
                    
                    
                }

                if (t === 260 || photon.x < 0) {
                    clearInterval(h)
                    clearInterval(h2)
                    
                    if (photon.x < 0) {
                        photon.ax[photon.ax.length - 1] = 0
                    }
                    draw()
                    console.log("clearing")
                    phase++
                }

                if (photon.x < 0) {
                    tend = t
                }
            }
            

            //draw()

            H = H0 * (OmegaM * (1+z)**3 + OmegaL)**0.5

            if (tend && tend - 100 > t) {
                clearInterval(h)
                clearInterval(h2)
                console.log("done")
                //t = tend
            }

        }

        h = setInterval(run, 15)
        h2 = setInterval(draw, 1000/60)
    }

    var stop = function () {
        clearInterval(h)
    }


    var withM = function () {
        hPhoton = 1
        
        showPhoton = true
        OmegaL = 0.7
        OmegaM = 0.3
        reset()
        go()
    }

    var size = function () {
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
        c2.width = c2.clientWidth
        c2.height = c2.clientHeight
    
    }

    var rev = function () {
        H0 = -Math.abs(H0)
        hPhoton = 1
        showPhoton = true
        OmegaL = 0.7
        OmegaM = 0.3
        reset()
        draw()
        go()
    }

    var with2 = function () {
        twoPhotons = true
        rev()
    }

    var showDemit = function () {
        draw(0.4)
        ctx2.globalAlpha = 1
        ctx2.fillStyle = "#aaaaaa"
        ctx2.fillRect(0, gs[0].t * zoom, zoom * gs[0].emit, 6)
        ctx2.fillRect(0, -20 + gs[0].t * zoom, 10, 40)
        ctx2.fillRect(zoom * gs[0].emit - 5, -20 + gs[0].t * zoom, 10, 40)

        distemit2.style.left = "410px"
        distemit2.style.top = "500px"
        distemit2.style.display = "block"
        
    }

    var showDnow = function () {
        ctx2.fillStyle = "#aaaaaa"
        ctx2.fillRect(0, 0, zoom * gs[0].x0 - 10, 6)
        ctx2.fillRect(0, -20, 10, 40)
        ctx2.fillRect(zoom * gs[0].x0 - 10, -20, 10, 40)

        distobserve2.style.left = "810px"
        distobserve2.style.top = "50px"
        distobserve2.style.display = "block"

    }

    var showDlight = function () {
        ctx2.fillStyle = "#AAAA00"
        ctx2.strokeStyle = "#AAAA00"

        ctx2.beginPath()
        ctx2.setLineDash([20,10])
        ctx2.lineWidth = 6
        ctx2.moveTo(zoom * gs[0].emit, 0)
        ctx2.lineTo(zoom * gs[0].emit, zoom * gs[0].t)
        ctx2.stroke()
        
        ctx2.fillRect(zoom * gs[0].emit - 20, -5, 40, 10)
        ctx2.fillRect(zoom * gs[0].emit - 20, zoom * gs[0].t - 5, 40, 10)

        disttravel2.style.left = "750px"
        disttravel2.style.top = "250px"
        disttravel2.style.display = "block"

    }

    return {go, stop, draw, withM, size, rev, with2, showDemit, showDnow, showDlight}

}
