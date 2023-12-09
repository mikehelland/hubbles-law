function lightclockDemo(canvas, rate) {

    var ctx = canvas.getContext("2d")


    var mirror = canvas.height / 2
    var alts = []
    var alt = false

    var i 
    var now
        
    var ret = {source: 0, mirror: 0, dist: 0, pulse: 0, alts}

    ret.draw = function () {

        canvas.width = canvas.width

        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        
        ctx.font = "italic 18pt serif"
        ctx.fillStyle = "white"

        ctx.textAlign = "center"

        ctx.translate(canvas.width / 2, canvas.height / 4)

        ctx.globalAlpha = ret.source

        ctx.fillText("light source/detector", 0, -50)

        ctx.fillStyle = "red"
        ctx.fillRect(-20, -20, 20, 20)
        ctx.fillStyle = "blue"
        ctx.fillRect(0, -20, 20, 20)

        ctx.globalAlpha = ret.mirror

        ctx.fillStyle = "#888888"
        ctx.fillRect(-40, mirror, 80, 20)

        ctx.fillStyle = "white"

        ctx.fillText("mirror", 0, mirror + 60)


        ctx.globalAlpha = ret.dist

        ctx.strokeStyle = "white"
        ctx.beginPath()
        ctx.moveTo(-30, canvas.height / 2)
        ctx.lineTo(30, canvas.height / 2 + 20)
        ctx.stroke()


        ctx.strokeStyle = "white"
        ctx.beginPath()
        ctx.moveTo(120, 0)
        ctx.lineTo(120, canvas.height / 2)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(90, 0)
        ctx.lineTo(120, 0)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(90, canvas.height / 2)
        ctx.lineTo(120, canvas.height / 2)
        ctx.stroke()

        ctx.fillStyle = "white"

        ctx.textAlign = "left"
        ctx.fillText("½ light second", 150, canvas.height / 4)

        if (ret.photon) {
            ctx.globalAlpha = 1
            ctx.fillStyle = "yellow"
            ctx.fillRect(-10, ret.photon, 20, 10)
        }

        for (i = 0; i < alts.length; i++) {

            ctx.fillRect(-30 + (now - alts[i]) / -500 * (canvas.height / 2), -20, 20, 20)
        }
    }

    var anim = function (callback) {
        var start = Date.now()
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
        var loop
        var next = 1000
        h = setInterval(() => {
            now = (Date.now() - start) / rate

            loop = now % 1000

            if (next <= now) {
                next += 1000

                if (alt) {
                    alts.push(now)
                }
            }

            if (loop < 500) {
                ret.photon = loop / 500 * canvas.height / 2
            }
            else {
                ret.photon = (1 - (loop - 500) / 500) * canvas.height / 2
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

    return ret
}