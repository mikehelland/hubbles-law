function animTrad(canvas) {

    var ctx = canvas.getContext("2d")

    var startX = 0

    var photon = 0
    var wavel = 20

    var sn1 = 0
    var sn2 = 0

    var snz = 300

    var g2 = canvas.width / 6 * 4

    var draw = function () {

        canvas.width = canvas.width
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.translate(canvas.width / 6, canvas.height / 2)

        ctx.globalAlpha = 0.6

        ctx.drawImage(imgGalaxy, startX - imgGalaxy.width / 2, -imgGalaxy.height / 2)


        ctx.drawImage(imgGalaxy, canvas.width / 6 * 4 - imgGalaxy.width / 2, -imgGalaxy.height / 2)

        ctx.globalAlpha = 1

        ctx.lineWidth = 4
        ctx.strokeStyle = "darkyellow"
        ctx.fillStyle = "yellow"
        if (photon) {
            ctx.fillRect(photon - wavel / 2, -10, wavel, 20)
            ctx.strokeRect(photon - wavel / 2, -10, wavel, 20)
        }

        ctx.fillStyle = "orange"
        if (sn1) {
            if (sn1 > 1) {
                ctx.fillRect(-20, -20 - (snz / (sn1**0.25) ) / 2, 8, snz / (sn1**0.25))
                ctx.fillRect(-20 - (snz / (sn1**0.25) ) / 2, -20, snz / (sn1**0.25), 8)
            }
            else {
                ctx.fillRect(-20 - (sn1 * snz) / 2, -20, sn1 * snz, 8)
                ctx.fillRect(-20, -20 - (sn1 * snz) / 2, 8, sn1 * snz)
            }
 
            if (sn2 > 1) {
                ctx.fillRect(-20 + g2, -20 - (snz / (sn2**0.25) ) / 2, 8, snz / (sn2**0.25))
                ctx.fillRect(-20 + g2 - (snz / (sn2**0.25) ) / 2, -20, snz / (sn2**0.25), 8)
            }
            else {
                ctx.fillRect(-20 + g2 - (sn2 * snz) / 2, -20, sn2 * snz, 8)
                ctx.fillRect(-20 + g2, -20 - (sn2 * snz) / 2, 8, sn2 * snz)
            }
        }


    }


    var fire = function () {

        var start = Date.now()
        var h = setInterval(() => {

            photon += 5
            wavel += 0.15

            if (photon >= canvas.width / 6 * 4) clearInterval(h)

            draw()

        }, 1000 / 30)
    }

    var sn = function () {
        var start = Date.now()

        
        var h = setInterval(() => {

            photon += 5
            wavel += 0.15

            sn1 += (Date.now() - start) / 20000
            sn2 += (Date.now() - start) / 2000

            if (photon >= canvas.width / 6 * 4) clearInterval(h)

            draw()

        }, 1000 / 30)
    }


    return {draw, fire, sn}
}