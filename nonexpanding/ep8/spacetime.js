function stretchedSpacetime(st1, st2) {
    var black = true
    
    var graph = st2
    var ctxG = graph.getContext("2d")
    var models = []

    var ctx = st1.getContext("2d")
    
    var c = 1

    var zoom = 0.25
    var zoom_gx = 0.95 * 0.3
    var zoom_gy = 0.95 * 0.3
    var zoomG = zoom * zoom_gx
    var zoomGY = zoom * zoom_gy
    var offset = 20
    var offsetX = 20//400

    var dgn
    
    var zoomz = 1000

    var dz = []
    var t = 0
    for (let d = 0; d<=13000; d+=10) {
        t += 1/(1 - 0.0000756 * d) 
        z = (0.0000756 * d) / (1 - 0.0000756 * d)
        
        dz.push({z: z, d, t: t})
    }


    var step = 10
    var stepWidth = 50

    var segs1 = []
    var segs2 = []

    var x0
    var x = 0
    for (dgi = 0; dgi < step; dgi++) {

        x0 = x * stepWidth 
        var z = dgi / 10
        x += (1 + z)
        segs1.push([dgi * stepWidth, (dgi+1) * stepWidth])
        segs2.push([x0, x * stepWidth])
    }



    var drawx, drawy, dgt, dgm, dgi
    
    var drawTop = function () {
        st1.width = st1.width

        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, st1.width, st1.height)

        ctx.translate(20, st1.height / 2)
        ctx.fillStyle = "blue"
        ctx.beginPath()
        ctx.arc(0, -20, 10, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.arc(0, 20, 10, 0, Math.PI * 2)
        ctx.fill()

        
        ctx.strokeStyle = "blue"
        ctx.lineWidth = 10

        for (dgi = 0; dgi < step; dgi++) {
            ctx.beginPath()
            ctx.moveTo(segs1[dgi][0] + 5, -20)
            ctx.lineTo(segs1[dgi][1] - 5, -20)                
            ctx.stroke()
        }

        var x = 0
        ctx.strokeStyle = "red"
        for (dgi = 0; dgi < step; dgi++) {
            ctx.beginPath()
            ctx.moveTo(segs2[dgi][0] + 5, 20)
            ctx.lineTo(segs2[dgi][1] - 5, 20)                
            ctx.stroke()
        }

        ctx.font = "italic 20pt serif"
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.fillText("Without time dilation", st1.width / 2, - 50)
        ctx.fillText("With time dilation", st1.width / 2,  70)

    }


    var draw = function () {
        
        ctxG.lineWidth = 1
        ctxG.fillStyle = black ? "black" : "white"
        ctxG.fillRect(0, 0, graph.width, graph.height)

        ctxG.strokeStyle = !black ? "black" : "white"
        ctxG.strokeRect(offset, offset, graph.width, graph.height)
        
        ctxG.strokeStyle = "#444444"
        ctxG.fillStyle = "white"
        var lastY = 0
        var stepY = 200
        
        
        for (var y = 0; y < 20000; y+=1000) {
            ctxG.beginPath()
            ctxG.moveTo(offset, offset + y * zoomGY)
            ctxG.lineTo(graph.width, offset + y * zoomGY)
            ctxG.stroke()

            if (y % 1000 == 0)
                ctxG.fillText(-y / 1000, 4, offset + y * zoomGY + 4)    
            
        }

        var dgn = 1
        //for (dgn = -1; dgn <= 1; dgn+=2) {
            
            for (var x = 0; x < 20000; x+=1000) {
                ctxG.beginPath()
                ctxG.moveTo(offsetX + x * zoomG * dgn, offset)
                ctxG.lineTo(offsetX + x * zoomG * dgn, graph.height)
                //offsetX + drawx * zoomG * dgn, -offset + graph.height - drawy * zoomGY
                ctxG.stroke()
            }
        //}


        ctxG.lineWidth = 4

        

        ctxG.font = "14px sans-serif"
        
        ctxG.fillStyle = !black ? "black" : "white"
        ctxG.textAlign = "right"
        ctxG.fillText("Space", graph.width - 4,  36)
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

        for (dgi = 0; dgi < 14; dgi+=1) {
            ctxG.fillText(dgi, offsetX + dgi * 1000 * zoomG - 3, offset)    
        }
        
        ctxG.translate(offset, offset)


        ctxG.strokeStyle = "blue"
        ctxG.lineWidth = 10

        for (dgi = 0; dgi < step; dgi++) {
            ctxG.beginPath()
            ctxG.moveTo((dgi) * stepWidth + 5, segs1[dgi][0] + 5)
            ctxG.lineTo((dgi + 1) * stepWidth - 5, segs1[dgi][1] - 5)
            ctxG.stroke()
        }

        ctxG.strokeStyle = "red"
        for (dgi = 0; dgi < step; dgi++) {
            ctxG.beginPath()
            ctxG.moveTo(dgi * stepWidth, segs2[dgi][0])
            ctxG.lineTo((dgi + 1) * stepWidth, segs2[dgi][1])
            ctxG.setLineDash([-10 + (stepWidth**2 + (segs2[dgi][0]-segs2[dgi][1])**2)**0.5, 20])
            ctxG.stroke()
        }

    }

    return {
        drawTop,
        draw, 
        drawConnections: function () {
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
    
        }, 
        drawTimedilated: function () {
            console.log("draw red")
            ctxG.strokeStyle = "red"
            ctxG.lineWidth = 4
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
}