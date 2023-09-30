function demoContracting1() {

    var canvas = contractingtop
    var ctx = canvas.getContext("2d")
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight

    var galaxy = document.getElementById("galaxy")
    var gw = galaxy.width / 2
    var gh = galaxy.height / 2

    var gs = []
    for (var i = 0; i < 40; i++) {
        gs.push({
            i, x: i * 100
        })
    }

    var phase = 0

    var photon = {x: 0, xs: []}

    var zoom = 1

    var draw = function () {

        canvas.width = canvas.width
        ctx.translate(50, canvas.height / 2)

        for (i = 0; i < gs.length; i++) {
            ctx.drawImage(galaxy, zoom * gs[i].x, -gh/2, 10, gh)
            
        }
        
    
        ctx.fillStyle = "yellow"
        ctx.fillRect(photon.x * zoom, -10, 10, 20)
        
        
    }

    var H0 = 70
    H0 = H0 / 3.08e19 * 60 * 60 * 24 * 365 * 1e7
    var H = H0 
    var c = 1

    x2 = 0.1

    var h
    var z
    var go = function () {
        console.log("going")
        h = setInterval(() => {

            photon.x += c - H * photon.x
            x2 += c - H * x2
            z = 0.1 / (x2 - photon.x) - 1

            for (i = 0; i < gs.length; i++) {
                gs[i].x -= gs[i].x * H
                
            }

            draw()

            H = H0 * (0.3 * (1+z)**3 + 0.7)**0.5

        }, 20)
    }

    var stop = function () {
        clearInterval(h)
    }

    draw()

    return {go, stop}

}
