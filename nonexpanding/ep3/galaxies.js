var reverseGalaxies
var stopGalaxies
var runGalaxies

function setupGalaxies () {
    var ctx = data.getContext("2d")
    data.width = document.body.clientWidth
    data.height = document.body.clientHeight
    var img = document.getElementById("galaxy")

    var gs = []
    for (let i = 0; i < 300; i++) {
        gs.push({
            angle: Math.random() * Math.PI * 2, 
            d: Math.random() * data.clientHeight
        })
    }

    var zoom = 1
    var dz = 0.005

    drawGalaxies = function () {
        gs.forEach(g => {
            ctx.drawImage(img, 
                Math.cos(g.angle) * g.d * zoom, 
                Math.sin(g.angle) * g.d * zoom, 
                10, 10)
        })
    }

    var h
    runGalaxies = function () {
        h = setInterval(() => {
            zoom += dz
            data.width = data.clientWidth
            data.height = data.clientHeight
            ctx.translate(data.width / 2, data.height / 2)
            drawGalaxies()
        }, 1000/60)
    }

    reverseGalaxies = function () {
        dz = dz * -1
    }

    stopGalaxies = function () {
        clearInterval(h)
        console.log("stopped")
    }
}