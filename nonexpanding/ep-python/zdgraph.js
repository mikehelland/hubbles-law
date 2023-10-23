function zdGraph(canvas) {

    var data = []
    const c = 299792.458
    const pc2ly = 3.261564
    var zoomY = 90 * 1000

    var maxZ = 11

    var ctx = canvas.getContext("2d")
    var h = canvas.height
    var w = canvas.width
    var i

    var perct = 0

    drawCanvas()
    run()

    function run() {
        
        var objs = []
        for (var i = 0; i < 20; i++) {
            objs.push({x: i * 1000})
        }

        var H = 0.00007

        var p = 0
        var c = 1  

        var t = 0 
        var z = 0

        while (z < 20) {
            t += 1

            p += c + H * p

            z = (c + H * p) / c - 1

            for (i = 0; i < objs.length; i++) {
                var obj = objs[i]
                obj.x += H * obj.x

                if (p >= obj["x"] && !obj.t) {
                    obj["t"] = t
                    obj["z"] = z
                    obj["d"] = obj["x"]
                }
            }
        }
        data = objs
        console.log(data)

        setTimeout(() => {
            var start = Date.now()
            var handle = setInterval(() => {
                perct = (Date.now() - start) / 1000
                drawCanvas()
    
                if (perct >= 1) {
                    console.log("clear", w, h)
                    clearInterval(handle)
                    setTimeout(() => {
                        ctx.textAlign = "center"
                        ctx.fillStyle = "white"
                        ctx.font = "36px sans-serif"
                        ctx.fillText("constant expansion rate", w/2 + 20, h/2 + 20)
                    }, 200)
                }
            })
    
        }, 1000)

    }

    function drawCanvas() {

        canvas.width = w

        ctx.translate(40, -20)

        ctx.fillStyle = "white"
        ctx.font = "20px sans-serif"

        ctx.textAlign = "center"
        for (i = 0; i <= maxZ; i=i+1) {
            ctx.fillText(i, i / maxZ * w, h + 20)
        }
        
        ctx.textAlign = "right"
        ctx.fillText("redshift z", w - 50, h - 25)
        

        for (i = 0; i <= zoomY; i=i+5000) {
            ctx.fillText(i / 1000, -2, h - h * i / zoomY)
        }
        ctx.textAlign = "left"
        ctx.fillText("distance (billion light years)",  8, 38)

        ctx.strokeStyle = "white"
        ctx.lineWidth = 1
        ctx.strokeRect(0, 0, canvas.width, canvas.height)
        
        /*ctx.fillStyle = "black"
        data2.forEach(dp => {
            ctx.fillRect(w * dp.z / maxZ, h / 2, 1, 1)
        })*/

        ctx.lineWidth = 10
        ctx.strokeStyle = "red"
        ctx.beginPath()
        ctx.moveTo(0, h)

        /*
        data.forEach(dp => {
            ctx.lineTo(w * dp.z / maxZ, h - h * dp.t * 1000 / zoomY)
        })
        ctx.globalAlpha = 0.4
        ctx.stroke()


        ctx.beginPath()
        ctx.moveTo(0, h)

        data.forEach(dp => {
            ctx.lineTo(w * dp.z / maxZ, h - h * dp.DA * pc2ly / zoomY)
        })
        ctx.globalAlpha = 0.4
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, h)

        data.forEach(dp => {
            ctx.lineTo(w * dp.z / maxZ, h - h * dp.DC * pc2ly / zoomY)
        })
        ctx.globalAlpha = 0.4
        ctx.stroke()

        ctx.globalAlpha = 1
        ctx.lineWidth = 6
        ctx.strokeStyle = "black"

        ctx.setLineDash([50, 10])
        ctx.beginPath()
        ctx.moveTo(0, h)

        data2.forEach(dp => {
            ctx.lineTo(w * dp.z / maxZ, h - h * dp.d_T / zoomY)
        })
        ctx.stroke()


        ctx.setLineDash([])
        ctx.beginPath()
        ctx.moveTo(0, h)

        var dp
        for (i = 0; i < data2.length; i++) {
            dp = data2[i]
            if (dp.z) {
                ctx.lineTo(w * dp.z / maxZ, h - h * dp.d_A / zoomY)
            }
        }
        ctx.stroke()

        */

        ctx.setLineDash([15, 5])
        ctx.beginPath()
        ctx.moveTo(0, h)

        var dp
        for (i = 0; i < data.length; i++) {
            dp = data[i]
            ctx.lineTo(w * dp.z / maxZ, h - h * dp.d / zoomY)

            if (i / data.length > perct) break
        }
        ctx.stroke()

    }





}