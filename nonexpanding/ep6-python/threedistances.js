function threeDistances() {

    var c = threedistances
    var ctx = c.getContext("2d")
    c.width = c.clientWidth
    c.height = c.clientHeight

    var galaxy = document.getElementById("galaxy")
    var gw = galaxy.width / 2
    var gh = galaxy.height / 2

    var g1 = {x: 60}
    var g2 = {x: -60}

    var phase = 0

    var photon, length1, length2

    var draw = function () {

        c.width = c.width
        ctx.translate(c.width / 2, c.height / 2)

        if (length1) {
            //if ((phase > 0 && phase < 3) || phase === 4) {
                ctx.globalAlpha = 0.1
            //}
            ctx.drawImage(galaxy, length1.x + length1.l - gw, -gh)
            ctx.globalAlpha = 0.1
            ctx.drawImage(galaxy, length1.x - gw, -gh)
            ctx.globalAlpha = 1
    
        }

        if (phase >= 3) {
            //ctx.globalAlpha = 0.1
        }
        ctx.drawImage(galaxy, g1.x - gw, -gh)
        if (phase < 4) {
            ctx.globalAlpha = 1
        }
        ctx.drawImage(galaxy, g2.x - gw, -gh)

        ctx.globalAlpha = 1
        ctx.font = "25pt serif"
        ctx.textAlign = "center"
        if (photon) {
            ctx.lineWidth = 4
            ctx.setLineDash([20,10])
            ctx.strokeStyle = "yellow"
            ctx.beginPath()
            ctx.moveTo(length1.x + length1.l, 0)
            ctx.lineTo(photon.x, 0)
            ctx.stroke()
            ctx.setLineDash([])

            if (phase == 4) {

                ctx.fillStyle = "yellow"
                ctx.fillRect(photon.x0 - photon.l0/2, -20, photon.l0, 40)
                ctx.strokeStyle = "black"
                ctx.lineWidth = 5
                ctx.strokeRect(photon.x0 - photon.l0/2, -20, photon.l0, 40)
                ctx.fillStyle = "black"
                ctx.fillText("λ", photon.x0, 10)
            }

            ctx.fillStyle = "yellow"
            ctx.fillRect(photon.x - photon.l/2, -20, photon.l, 40)
            ctx.strokeStyle = "black"
            ctx.lineWidth = 5
            ctx.strokeRect(photon.x - photon.l/2, -20, photon.l, 40)
            ctx.fillStyle = "black"
            ctx.fillText("λ", photon.x, 10)
            
        }

        if (length1) {
            ctx.fillStyle = "#aaaaaa"
            ctx.fillRect(length1.x, -120, length1.l, 6)
            ctx.fillRect(length1.x, -120, 4, 20)
            ctx.fillRect(length1.x + length1.l, -120, 4, 20)
        }
        if (length2) {
            ctx.fillStyle = "#aaaaaa"
            ctx.fillRect(length2.x, 120, length2.l, 6)
            ctx.fillRect(length2.x, 120, 4, -20)
            ctx.fillRect(length2.x + length2.l, 120, -4, -20)            
        }
    }

    var go = function () {
        console.log("going")
        var h = setInterval(() => {

            g1.x += 1
            g2.x -= 1

            if (phase > 0) {
                photon.x -= 2
                photon.l += 0.1
            }

            if (g1.x === 150) {
                phase++
                length1 = {x: g2.x, l: g1.x - g2.x}
                
                distemit.style.top = 0 + "px"
                distemit.style.left = -1000 + "px"
                distemit.style.display = "block"
                distemit.style.left = c.offsetLeft + c.width / 2 - distemit.clientWidth / 2 + "px"
                
                photon = {x: g1.x, l: 40, l0: 40, x0: g1.x}
                clearInterval(h)
                setTimeout(go, 100)
            }

            if (photon && photon.x <= g2.x) {
                phase++
                length2 = {x: g2.x, l: g1.x - g2.x}
                clearInterval(h)
                setTimeout(drawLTT, 100)

                distobserve.style.top = 330 + "px"
                distobserve.style.left = -1000 + "px"
                distobserve.style.display = "block"
                distobserve.style.left = c.offsetLeft + c.width / 2 - distemit.clientWidth / 2 + "px"
            }

            draw()

        }, 1000/60)
    }

    var lttGalaxies = function () {
        phase++
        draw()

    }

    var drawLTT = function () {
        phase += 2
        draw()

        disttravel.style.top = 120 + "px"
        disttravel.style.left = -1000 + "px"
        disttravel.style.display = "block"
        disttravel.style.left = 640 + "px"

    }

    draw()

    return {go, drawLTT, lttGalaxies}

}
