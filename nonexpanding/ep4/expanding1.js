function demoExpanding1() {

    var c = expanding1
    var ctx = c.getContext("2d")
    c.width = c.clientWidth
    c.height = c.clientHeight

    var galaxy = document.getElementById("galaxy")
    var gw = galaxy.width / 2
    var gh = galaxy.height / 2

    var gs = []
    for (var i = 0; i < 15; i++) {
        gs.push({
            i, x: i * 1000
        })
    }


    var zoom = 0.15

    var draw = function () {

        c.width = c.width
        ctx.translate(50, c.height / 2)

        for (i = 0; i < gs.length; i++) {
            ctx.drawImage(galaxy, zoom * gs[i].x - gw/2, -gh/2, gw, gh)
            
        }
        

        
    }

    var h
    var go = function () {
        console.log("going")
        h = setInterval(() => {

            for (i = 0; i < gs.length; i++) {
                gs[i].x += gs[i].x * 0.001
                
            }

            draw()

        }, 1000/60)
    }

    var stop = function () {
        clearInterval(h)
    }

    draw()

    return {go, stop}

}
