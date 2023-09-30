stretchedSpacetime2()
function stretchedSpacetime2() {
    var black = true
    
    var graph = document.getElementById("stretched-spacetime2")
    var ctxG = graph.getContext("2d")
    var models = []

    
    var c = 1

    var zoom = 0.055
    var zoom_gx = 0.95 * 0.3
    var zoom_gy = 0.95 * 0.3
    var zoomG = zoom * zoom_gx
    var zoomGY = zoom * zoom_gy
    var offset = 20
    var offsetX = 20//400

    var dgn
    
    var zoomz = 10000

    var dz = []
    var t = 0
    for (let d = 0; d<=13000; d+=10) {
        t += 1/(1 - 0.0000756 * d) 
        z = (0.0000756 * d) / (1 - 0.0000756 * d)
        
        dz.push({z: z, d, t: t})
    }

    var drawx, drawy, dgt, dgm, dgi
    drawGraph()
    drawTimedilated()

    function drawGraph() {
        
        ctxG.lineWidth = 1
        ctxG.fillStyle = black ? "black" : "white"
        ctxG.fillRect(0, 0, graph.width, graph.height)

        ctxG.strokeStyle = !black ? "black" : "white"
        ctxG.strokeRect(offset, offset, graph.width, graph.height)
        
        ctxG.strokeStyle = "#444444"
        ctxG.fillStyle = "white"
        var lastY = 0
        var stepY = 200
        
        
        for (var y = 0; y < 100000; y+=1000) {
            ctxG.beginPath()
            ctxG.moveTo(offset, offset + y * zoomGY)
            ctxG.lineTo(graph.width, offset + y * zoomGY)
            ctxG.stroke()

            if (y % 5000 == 0)
                ctxG.fillText(-y / 1000, 4, offset + y * zoomGY + 4)    
            
        }

        var dgn = 1
        //for (dgn = -1; dgn <= 1; dgn+=2) {
            
            for (var x = 0; x < 100000; x+=1000) {
                ctxG.beginPath()
                ctxG.moveTo(offsetX + x * zoomG * dgn, offset)
                ctxG.lineTo(offsetX + x * zoomG * dgn, graph.height)
                //offsetX + drawx * zoomG * dgn, -offset + graph.height - drawy * zoomGY
                ctxG.stroke()
            }
        //}


        ctxG.lineWidth = 2

        ctxG.strokeStyle = "blue"
        
        //for (dgn = -1; dgn <= 1; dgn+=2) {
            ctxG.beginPath()
            ctxG.moveTo(offsetX, offset)
            ctxG.lineTo(offsetX + dgn * 50e8 * zoomG, offset + 50e8 * zoomGY)
            ctxG.stroke()
        //}

        ctxG.fillStyle = "white"
        for (var ii = 0; ii < 40000; ii+=1000) {
            ctxG.fillRect(offsetX + ii * zoomG - 1, offset + ii * zoomGY - 1, 2, 2)        
        }


        ctxG.font = "14px sans-serif"
        
        ctxG.fillStyle = !black ? "black" : "white"
        ctxG.textAlign = "right"
        ctxG.fillText("Distance", graph.width - 4,  36)
        ctxG.textAlign = "left"
        ctxG.fillText("Time", offset + 5, graph.height - 10)
        
        ctxG.font = "10px sans-serif"
        /*if (yAxis.selectedIndex < 2 || yAxis.selectedIndex === 6) {
            for (dgi = 0; dgi < 100; dgi+=5) {
                ctxG.fillText(dgi, 4, -offset + graph.height - dgi * 1000 * zoomGY + 4)    
            }
        }
        else {
            for (dgi = 0; dgi < 1000; dgi+=10) {
                ctxG.fillText(dgi / 10, 4, -offset + graph.height - dgi / 10 * 10000 * zoomGY + 4)    
            }
        }*/

        for (dgi = -50; dgi < 50; dgi+=2) {
            ctxG.fillText(dgi, offsetX + dgi * 1000 * zoomG - 3, offset)    
        }
        
        ctxG.fillStyle = "yellow"
        ctxG.strokeStyle = "yellow"
        ctxG.lineWidth = 1
        
        dz.forEach(dp => {
            if (dp.d % 1000 == 0) {
                ctxG.fillRect(offsetX + dp.d * zoomG - 1, offset + dp.t*10 * zoomGY - 1, 2, 2)
                console.log(offsetX + dp.d * zoomG, offset + dp.t*10 * zoomGY)

                ctxG.beginPath()
                ctxG.moveTo(offsetX + dp.d * zoomG, offset + dp.d * zoomGY)
                ctxG.lineTo(offsetX + dp.d * zoomG, offset + dp.t*10 * zoomGY)
                ctxG.stroke()
            }
        })
    }

    function drawTimedilated() {
        console.log("draw red")
        ctxG.strokeStyle = "red"
        var dgn = 1
        //for (dgn = -1; dgn <= 1; dgn+=2) {
            ctxG.beginPath()
            ctxG.moveTo(offsetX, offset)
            
            dz.forEach(dp => {
                ctxG.lineTo(offsetX + dgn * dp.d * zoomG, offset + dp.t*10 * zoomGY)
            })
            ctxG.stroke()
        //}

    }
}