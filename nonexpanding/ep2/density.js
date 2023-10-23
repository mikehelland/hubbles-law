//var reverseGalaxies
//var stopGalaxies

function setupMatterDemo () {
    var ctx = matterdemo.getContext("2d")
    var w = matterdemo.width 
    var h = matterdemo.height 
    var img = document.getElementById("galaxy")

    var gs = []
    for (let i = 0; i < 10; i++) {
        gs.push({
            angle: Math.random() * Math.PI * 2, 
            d: Math.random() * h / 4 * 0.9
        })
    }

    var zoom = 1
    var dz = 0.01

    var drawMatterDemo = function () {
        matterdemo.width = matterdemo.width
        ctx.lineWidth = 3
        ctx.translate(w / 2, h / 2)
        ctx.strokeStyle = "yellow"
        ctx.strokeRect(-w / 4 * zoom + 2, -h / 4 * zoom + 2, 
        w / 2 * zoom - 2, h / 2 * zoom - 2)

        gs.forEach(g => {
            ctx.drawImage(img, 
                Math.cos(g.angle) * g.d * zoom, 
                Math.sin(g.angle) * g.d * zoom, 
                10, 10)
        })
    }

    drawMatterDemo()

    return function () {
        console.log("grow")
        var h = setInterval(() => {
            zoom += dz
            if (zoom >= 2) {
                zoom = 2
                clearInterval(h)
            }
            drawMatterDemo()
        }, 1000/60)
    
    }

}

function setupdeDemo () {
    var ctx = dedemo.getContext("2d")
    var w = dedemo.width 
    var h = dedemo.height 

    var zoom = 1
    var dz = 0.01

    var drawdeDemo = function () {
        dedemo.width = dedemo.width
        ctx.lineWidth = 3

        ctx.fillStyle = "white"
        ctx.translate(w / 2, h / 2)
        ctx.textAlign = "center"
        ctx.font = 40 * 2 * zoom + "px serif"
        ctx.fillText("Ω", -6 * zoom, 10 * zoom)
        ctx.font = 24 * 2 * zoom + "px serif"
        ctx.fillText("Λ", 36 * zoom, 24 * zoom)

        ctx.strokeStyle = "yellow"
        ctx.strokeRect(-w / 4 * zoom + 2, -h / 4 * zoom + 2, 
        w / 2 * zoom - 2, h / 2 * zoom - 2)

    }

    drawdeDemo()

    return function () {
        console.log("grow")
        var h = setInterval(() => {
            zoom += dz
            if (zoom >= 2) {
                zoom = 2
                clearInterval(h)
            }
            drawdeDemo()
        }, 1000/60)
    
    }

}