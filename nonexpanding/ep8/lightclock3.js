function lightspeedDemo(canvas, rate) {

    var ctx = canvas.getContext("2d")


    var mirror = canvas.height / 2
    var alts = []
    var alt = false

    var i 
    var now0, now1
    var photon0, photon1
    var z0 = 0 
        
    var ret = {source: 0, mirror: 0, dist: 0, pulse: 0, alts}

    ret.draw = function () {
        canvas.width = canvas.width

        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.translate(canvas.width / 4 * 3, canvas.height / 4)

        ret.drawLC(1, photon1)

        ctx.translate(-canvas.width / 2, 0)

        ctx.globalAlpha = z0
        ret.drawLC(0 , photon0)


    }

    ret.drawLC = function (z, photon) {
        
        ctx.font = "italic 18pt serif"
        ctx.fillStyle = "white"

        ctx.textAlign = "center"

        
        ctx.fillText("z = " + z, 0, -50)

        ctx.fillStyle = "red"
        ctx.fillRect(-20, -20, 20, 20)
        ctx.fillStyle = "blue"
        ctx.fillRect(0, -20, 20, 20)

        
        ctx.fillStyle = "#888888"
        ctx.fillRect(-40, mirror, 80, 20)

        ctx.fillStyle = "white"

        ctx.fillText("mirror", 0, mirror + 60)


        
        ctx.strokeStyle = "white"
        ctx.beginPath()
        ctx.moveTo(-30, canvas.height / 2)
        ctx.lineTo(30, canvas.height / 2 + 20)
        ctx.stroke()


        ctx.fillStyle = "white"


        if (photon) {
            ctx.fillStyle = "yellow"
            ctx.fillRect(-10, photon, 20, 10)
        }

        if (z < 1) return 

        for (i = 0; i < alts.length; i++) {

            if (now1 - alts[i] < 1980) {
                ctx.fillRect(-30 + (now1 - alts[i]) / -500 * (canvas.height / 2), -20, 20, 20)
            }
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
            
            ret.draw()
        }, 1000/30)
    }

    ret.showSource = function () {
        anim((now) => {
            ret.source = Math.min(1, now/1000)
            return now > 1000
        })
    }

    ret.showMirror = function () {
        anim((now) => {
            ret.mirror = Math.min(1, now/1000)
            return now > 1000
        })
    }

    ret.showDist = function () {
        anim((now) => {
            ret.dist = Math.min(1, now/1000)
            return now > 1000
        })
    }


    var h
    ret.fire = function () {
        var start = Date.now()
        var loop1, loop0
        var next = 1000
        h = setInterval(() => {
            now0 = (Date.now() - start) 
            now1 = (Date.now() - start) / 2

            loop0 = now0 % 1000
            loop1 = now1 % 1000

            if (next <= now1) {
                next += 1000

                if (alt) {
                    alts.push(now1)
                }
            }

            if (loop0 < 500) {
                photon0 = loop0 / 500 * canvas.height / 2
            }
            else {
                photon0 = (1 - (loop0 - 500) / 500) * canvas.height / 2
            }

            if (loop1 < 500) {
                photon1 = loop1 / 500 * canvas.height / 2
            }
            else {
                photon1 = (1 - (loop1 - 500) / 500) * canvas.height / 2
            }

            ret.draw()
        }, 1000/30)
    }

    ret.alt = function () {
        alt = true
    }

    ret.stop = function () {
        clearInterval(h)
    }

    ret.show = function () {
        ret.mirror = 1
        ret.source = 1
        ret.draw()
    }

    ret.z0 = function () {
        var start = Date.now()
        var now
        var h = setInterval(() => {
            now = Date.now() - start

            z0 = Math.min(1, now/1000)

            if (now >= 1000) clearInterval(h)
        }, 1000 /30)
    }

    return ret
}