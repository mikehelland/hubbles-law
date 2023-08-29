var reverseGalaxies
var stopGalaxies

function setupGalaxies () {
    var ctx = galaxies.getContext("2d")
    galaxies.width = document.body.clientWidth
    galaxies.height = document.body.clientHeight
    var img = document.getElementById("galaxy")

    var gs = []
    for (let i = 0; i < 300; i++) {
        gs.push({
            angle: Math.random() * Math.PI * 2, 
            d: Math.random() * galaxies.height * 2
        })
    }

    var zoom = 1
    var dz = 0.002

    drawGalaxies = function () {
        gs.forEach(g => {
            ctx.drawImage(img, 
                Math.cos(g.angle) * g.d * zoom, 
                Math.sin(g.angle) * g.d * zoom, 
                10, 10)
        })
    }

    var h = setInterval(() => {
        zoom += dz
        galaxies.width = galaxies.width
        ctx.translate(galaxies.width / 2, galaxies.height / 2)
        drawGalaxies()
    }, 1000/60)

    reverseGalaxies = function () {
        dz = dz * -1
    }

    stopGalaxies = function () {
        clearInterval(h)
        console.log("stopped")
    }
}