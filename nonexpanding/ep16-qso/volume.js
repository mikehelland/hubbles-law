function demoVolume() {

    var canvas = volume
    var ctxc = canvas.getContext("2d")

    const pi = Math.PI
    const kpi = 4 / 3 * pi
    var R = 299792 / 70.5
    var zoom = 0.08
    var V = kpi * R**3
    var N = 10

    var foreColor = "white"

    var step = 0

    var drawNext = function () {
        canvas.width = canvas.width
        ctxc.font = "bold 20pt Arial"

        //ctx.fillText(Math.round(V), 20, 20) 

        ctxc.translate(canvas.width / 2, canvas.height / 2)
        ctxc.strokeStyle = foreColor
        ctxc.fillStyle = foreColor

        ctxc.beginPath()
        ctxc.arc(0, 0, zoom * R, 0, pi * 2)
        ctxc.stroke()

        if (step == 0) {
            step++
            return
        }

        ctxc.beginPath()
        ctxc.arc(0, 0, 1, 0, pi * 2)
        ctxc.stroke()

        var lastr = 0
        var lastz = 0

        ctxc.textAlign = "right"

        Vs = []
        var output = ""

        for (var i = 0; i < N; i++) {
            var Vn = V/N * (1 + i)
            var r = (Vn / kpi)**(1/3)
            var z = 1 / (1-r/R) - 1

            var dC
            var cap = z.toFixed(2)
            if (z > 1e12) {
                z = Infinity
                cap = "∞"
                dC = 13800
            }
            else {
                //dC = nwFLRW(67.6, 0.69, 0.31, z).DC
            }

                            
            Vs.push({Vn: V/N, r, z, agn: 0, qso: 0, dC})

            ctxc.beginPath()
            ctxc.arc(0, 0, zoom * r, 0, pi * 2)
            ctxc.stroke()

            ctxc.fillText(cap, 0, 4 + -zoom * (lastr + (r - lastr) / 2)) 

            //output += lastz.toFixed(2) + " < z < " + cap  + "\n" 
            output += lastz.toFixed(4) + ",\n" 

            lastr = r
            lastz = z

        }
    }


    return drawNext
}