function demoContracting1() {

    var canvas = contractingtop
    var ctx = canvas.getContext("2d")

    var c2 = contractingbottom
    var ctx2 = c2.getContext("2d")

    var galaxy = document.getElementById("galaxy")
    var gw = galaxy.width / 2
    var gh = galaxy.height / 2

    var gs = []
    var t
    var photon

    var hPhoton = 0

    var reset = function () {
        gs = []
        for (var i = 0; i < 40; i++) {
            gs.push({
                i, x: i * 10, ax: []
            })
        }
        t = 0
        x2 = 0.1
        photon = {x: 0, ax: [0]}
        H = H0
    }

    reset()
    
    var phase = 0

    var showPhoton
    
    var zoom = 3

    var topDown

    var draw = function () {

        canvas.width = canvas.width
        ctx.translate(15, canvas.height / 2)

        for (i = 0; i < gs.length; i++) {

            //ctx.globalAlpha = !gs[i].t ? 1 : Math.max(0, (1 - (-t + gs[i].t) / 100))
            if (ctx.globalAlpha) {
                ctx.drawImage(galaxy, zoom * (ctx.globalAlpha === 1 ? gs[i].x : gs[i].emit), -gh/2, 10, gh)

            }
            
            
        }
        
        ctx.globalAlpha = 1

        
        c2.width = c2.width

        topDown = H0 < 0

        ctx2.translate(20, topDown ? 0 : -20)


        ctx2.lineWidth = 2
        ctx2.strokeStyle = "blue"
        for (i = 0; i < gs.length; i++) {
            ctx2.beginPath()
            ctx2.moveTo(gs[i].ax[0] * zoom, topDown ? 0 : c2.height)

            for (var j = 0; j < gs[i].ax.length; j+=3) {
                ctx2.lineTo(gs[i].ax[j] * zoom, topDown ? j * zoom : c2.height - j * zoom)
            }
            ctx2.stroke()
            
        }

        if (showPhoton) {
            ctx.fillStyle = "yellow"
            ctx.fillRect(photon.x * zoom, -10, 10, 20)
    
            ctx2.strokeStyle = "yellow"
            ctx2.beginPath()
            ctx2.moveTo(0, topDown ? 0 : c2.height)
            for (i = 0; i < photon.ax.length; i+=3) {
    
                    ctx2.lineTo(photon.ax[i] * zoom, topDown ? i * zoom : c2.height - i * zoom)
            }
            ctx2.stroke()
        }

        
    }

    var withPhoton = function () {
        showPhoton = true
        reset()
        go()
    }

    var withPhotonH = function () {
        hPhoton = 1
        showPhoton = true
        reset()
        go()
    }

    var H0 = 70
    H0 = H0 / 3.08e19 * 60 * 60 * 24 * 365 * 1e8
    var H = H0 
    var c = 1
    var OmegaL = 1
    var OmegaM = 0

    x2 = 0.1

    var z
    var tend
    var gdx
    var twoPhotons 
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

    var showBB = function () {
        ctx2.font = "40px sans-serif"
        ctx2.fillStyle = "white"
        ctx2.fillText("the Big Bang!", 5, c2.height / 2 + 45)
    }

    var showTurnaround = function() {
        ctx2.font = "40px sans-serif"
        ctx2.fillStyle = "white"
        ctx2.strokeStyle = "white"
        ctx2.beginPath()
        ctx2.moveTo(200, c2.height / 2 - 130)
        ctx2.lineTo(500, c2.height / 2 - 130)
        ctx2.stroke()
        ctx2.fillText("cosmic turnaround", 530, c2.height / 2 - 115)
    }

    var noGs = function () {
        gs = []
        draw()
    }

    return {go, stop, draw, withPhoton, withPhotonH, withM, size, rev, with2, showBB, showTurnaround, noGs}

}
