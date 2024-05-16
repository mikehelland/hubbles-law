function metalGraph(graph, points, refs) {

    colors = ["white", "pink", "blue", "goldenrod", "gray", "orange", "yellow", "aquamarine", "red", "cyan", "Chartreuse", "darkblue", "fuchsia", "midnightblue"]
    const black = true
    
    var ctxB = graph.getContext("2d")

    var offset = 80
    var height = graph.height - offset
    var zoom = 1
    var zoomGY = height * 0.31
    var zoomG = (graph.width - offset) / 14.5 //zoom * 69
    var OH0 = 6.5

    var Omega_M = 0.3 
    var Omega_L = 0.7
    var Omega_k = 0
    var H0 = 68

    var local = [
        {"name": "solar",       "z": 0,  "x": 0,     "OH": 8.69,       "ref": "0"},
        {"name": "Milky Way",   "z": 0,  "x": 0,     "OH": 8.50,       "ref": "0"},
        //{"name": "LMC",         "z": 0,  "x": 0,     "OH": 8.37,       "ref": "0"},
        //{"name": "SMC",         "z": 0,  "x": 0,     "OH": 8.01,       "ref": "0"}
    ]

    var zs = [];
    [0.5, 1, 2, 3, 4, 5, 10, 20].forEach(z => {
        zs.push({z, t: FLRW(H0, Omega_L, Omega_M, z).lookback})
    })

    bb = FLRW(H0, Omega_L, Omega_M, 12.8).age



    function drawGraph() {
        graph.height = graph.clientHeight
        height = graph.height - offset
        zoomGY = height * 0.31
        sseHypothesis = 0

        ctxB.translate(8, 0)
        
        ctxB.lineWidth = 2
        ctxB.fillStyle = black ? "black" : "white"
        ctxB.fillRect(0, 0, graph.width, graph.height)

        ctxB.strokeStyle = !black ? "black" : "white"
        ctxB.strokeRect(offset, offset, graph.width, graph.height - 2*offset)

        ctxB.font = "24px sans-serif"

        ctxB.fillRect(offset + 16, offset + 33, 2, 2)
        ctxB.fillStyle = "black"

        ctxB.fillStyle = !black ? "black" : "white"
        ctxB.textAlign = "left"
        
        ctxB.textAlign = "left"
        //ctxB.fillText('ΛCDM', offset, 12)

        ctxB.textAlign = "center"
        ctxB.fillText("Lookback Time (billion years)", graph.width / 2 + offset / 2, graph.height  - 10)
        ctxB.fillText("Redshift (z)", graph.width / 2 + offset / 2, 5 + 24)
        
        ctxB.fillStyle = "#404040"
        //ctxB.globalAlpha = 0.2
        ctxB.fillRect(offset + bb * zoomG, offset, 100, graph.height - 2*offset)
        ctxB.globalAlpha = 1
        
        var dgi
        ctxB.font = "18px sans-serif"
        ctxB.fillStyle = !black ? "black" : "white"
        
        for (dgi = 0; dgi <= 140; dgi+=10) {
            ctxB.fillText(dgi/10, offset + dgi / 10  * zoomG, graph.height + 22 - offset)
        }        

        ctxB.lineWidth = 1
        ctxB.strokeStyle = "#888888"
        zs.forEach(z => {
            ctxB.fillText(z.z, offset + z.t * zoomG, offset - 8)    
            ctxB.beginPath()
            ctxB.moveTo(offset + z.t * zoomG, offset)
            ctxB.lineTo(offset + z.t * zoomG, height)
            ctxB.stroke()
        })

        ctxB.translate(offset, graph.height - offset)

        for (dgi = 0.5; dgi < 3; dgi+=0.5) {
            ctxB.fillText(OH0 + dgi, -24, - dgi * zoomGY + 9)    
        }

        ctxB.save()
        ctxB.font = "32px sans-serif"

        ctxB.translate(-offset, -height / 2 + offset / 2)
        ctxB.rotate(-Math.PI/2)
        ctxB.textAlign = "center"
        ctxB.fillText("12 + log(O/H)", 0, 32)

        //ctxB.translate(0, 985)
        ctxB.fillStyle = "white"
        ctxB.fillText("BIG BANG", 0, graph.width - 36)
        ctxB.restore()


    }

    function drawz12() {
        console.log(points)
        drawPoint(points[9])
    }
    function drawz12b() {
        console.log(points)
        drawPoint(points[10])
    }
    function drawz4() {
        console.log(points)
        drawPoint(points[11])
    }

    var nextLocal = 0
    function drawNextLocal() {
        var i = nextLocal
        drawPoint(local[i])
        nextLocal++

    }
    function drawLocal() {
        local.forEach(p => drawPoint(p))
    }

    function drawPoint(point) {
        console.log(point)
        var start = Date.now()

        var h = setInterval(() => {
            var now = (Date.now() - start) / 1000
            if (now >= 1) {
                now = 1
                clearInterval(h)
            }

            ctxB.fillStyle = "lemonchiffon"
            ctxB.globalAlpha = now
            ctxB.fillRect(
                - 10 + point.x * zoomG, 
                - zoomGY * (point.OH - OH0) - 10, 
                20, 20)

            ctxB.textAlign = point.z > 1 ? "right" : "left"
            ctxB.font = "20pt sans-serif"
            ctxB.fillText(point.name, 
                point.x * zoomG + (point.z > 1 ? -20 : 20), 
                - zoomGY * (point.OH - OH0))
        }, 100/60)
    }

    function drawRefs(refList) {

        refList.forEach(ref => {
            drawRef(ref, 1)
        })

    }

    function drawJWST(nocap) {
        var jwstRefs = ["CEERS", "Langeroodi1", "Curti", "Yanagisawa", "Welch"]

        jwstRefs.forEach(ref => {
            drawRef(ref, 1)
        })

        if (nocap) return
        
        ctxB.globalAlpha = 1
        ctxB.font = "44px serif"
        ctxB.fillStyle = "white"
        ctxB.textAlign = "center"
        ctxB.fillText("JWST (2023)", 1500, -height / 10)
    }

    function drawRef(ref, ms) {

        for (var j = 0; j < points.length; j++) {
            if (points[j].ref === ref) {
                drawData(points[j].data, refs[ref].color, ms) 
            }

        }
    }
    function drawData(data, color, ms) {
        var i = 0

        var h = setInterval(() => {

            ctxB.fillStyle = color
            ctxB.globalAlpha = 0.8

            ctxB.fillRect(
                - 5 + data[i].x * zoomG, 
                - zoomGY * (data[i].OH - OH0) - 5, 
                10, 10)


            i++
            if (i === data.length) {
                clearInterval(h)
                return
            }
            

        }, ms)
        
    }

    function findRef(ref) {
        for (var j = 0; j < points.length; j++) {
            if (points[j].ref === ref) {
                return points[j]
            }
        }

    }

    function drawDESI(nocap) {
        var i = 0
        var data = findRef("DESI1").data
     
        var h = setInterval(() => {

            ctxB.fillStyle = "fuchsia"
            ctxB.globalAlpha = 0.8

            for (var j = 0; j < 5; j++) {

                ctxB.fillRect(
                    - 5 + data[i].x * zoomG, 
                    - zoomGY * (data[i].OH - OH0) - 5, 
                    10, 10)


                i++

                if (i === data.length) {
                    clearInterval(h)
                    return
                }
            }            

        }, 0)
        

        //drawRef("DESI1", 0)
        
        if (nocap) return

        ctxB.font = "44px serif"
        ctxB.fillStyle = "white"
        ctxB.fillText("DESI (2024)", 450, -height / 10)

    }

    function drawZahid() {
        var ref = "Zahid"
        var bins = findRef("Zahid").bins

        bins.forEach((bin, i) => {

            setTimeout(() => {
                ctxB.globalAlpha = 0.6
                ctxB.fillStyle = "yellow" //refs[ref].color
        
                var x0 = bin.zstart > 0 ? FLRW(H0, Omega_L, Omega_M, bin.zstart).lookback : 0
                var x1 = FLRW(H0, Omega_L, Omega_M, bin.zend).lookback
                
                var OHmin = - zoomGY * (bin.min - OH0)
                var OHmax = - zoomGY * (bin.max - OH0)
                
                ctxB.fillRect(
                    x0 * zoomG, 
                    OHmin, 
                    (x1 - x0) * zoomG, 
                    OHmax - OHmin    
                )
            }, 100 * i)
        })
    }

    function drawLine() {
        var x1 = 0
        var y1 = - zoomGY * (local[0].OH - OH0) 
        var x2 = points[9].x * zoomG
        var y2 = - zoomGY * (points[9].OH - OH0)  
        
        ctxB.strokeStyle = "blue"
        ctxB.lineWidth = 3

        ctxB.globalAlpha = 0.8
        ctxB.beginPath()
        ctxB.moveTo(x1, y1)
        ctxB.lineTo(x2, y2)
        ctxB.setLineDash([20, 10])
        ctxB.stroke()
        ctxB.globalAlpha = 1
        ctxB.setLineDash([])

    }

    function drawLine2() {
        var x1 = 0
        var y1 = - zoomGY * (local[1].OH - OH0) 
        var x2 = points[11].x * zoomG
        var y2 = - zoomGY * (points[11].OH - OH0)  
        
        ctxB.strokeStyle = "blue"
        ctxB.lineWidth = 3

        ctxB.globalAlpha = 0.8
        ctxB.beginPath()
        ctxB.moveTo(x1, y1)
        ctxB.lineTo(x2, y2)
        ctxB.setLineDash([20, 10])
        ctxB.stroke()
        ctxB.globalAlpha = 1
        ctxB.setLineDash([])

    }

    function drawLine3() {
        var x2 = points[11].x * zoomG
        var y2 = - zoomGY * (points[11].OH - OH0)  
        
        var x3 = points[10].x * zoomG
        var y3 = - zoomGY * (points[10].OH - OH0)  
        
        ctxB.strokeStyle = "blue"
        ctxB.lineWidth = 4

        ctxB.globalAlpha = 1
        ctxB.beginPath()
        ctxB.moveTo(x2, y2)
        ctxB.lineTo(x3, y3)
        ctxB.setLineDash([20, 10])
        ctxB.stroke()
        ctxB.globalAlpha = 1
        ctxB.setLineDash([])

    }

    function drawLine4() {
        var x1 = 0
        var y1 = - zoomGY * (8.85 - OH0) 
        var x2 = points[11].x * zoomG
        var y2 = - zoomGY * (points[11].OH - OH0)  
        
        ctxB.strokeStyle = "blue"
        ctxB.lineWidth = 4

        ctxB.globalAlpha = 1
        ctxB.beginPath()
        ctxB.moveTo(x1, y1)
        ctxB.lineTo(x2, y2)
        ctxB.setLineDash([20, 10])
        ctxB.stroke()
        ctxB.globalAlpha = 1
        ctxB.setLineDash([])

    }


    return {draw: drawGraph, drawNextLocal, drawJWST, drawDESI, 
        drawRefs, drawz12, drawz12b, drawz4, drawLocal, drawZahid, 
        drawLine, drawLine2, drawLine3, drawLine4}
}

function getMetal() {
    var json 
    var refs =  {}
    var points =  []

    var Omega_M = 0.3 
    var Omega_L = 0.7
    var Omega_k = 0
    var H0 = 68

    fetch("https://mikehelland.github.io/hubbles-law/data/metallicity.json").then(res => res.json()).then(res => {
        json = res
        
        console.log("fetching")

        var i = 1
        var tr, td, li, url, hideBox
        var iNextColor = 0

        res.data.sort((a, b) => res.refs[a.ref].year - res.refs[b.ref].year)

        res.data.forEach(point => {
            if (!refs[point.ref]) {
                refs[point.ref] = json.refs[point.ref]
                refs[point.ref].i = i
                i++

                url = refs[point.ref].url

                li = document.createElement("li")
                li.innerHTML = `(${refs[point.ref].year}) <b>${refs[point.ref].title}</b> <br> <a target="_blank" href="${url}">${url}</a>`                
                //ol.appendChild(li)

                if (point.data) {
                    refs[point.ref].color = colors[iNextColor++]
                }
            }

            if (point.data) {
                point.data.sort((a, b) => a.z - b.z)

                for (var j = 0; j < point.data.length; j++) {
                    point.data[j].x = point.data[j].z === 0 ? 0 : FLRW(H0, Omega_L, Omega_M, point.data[j].z).lookback
                }
            }
            else if (point.bins) {
            }
            else {
                if (point.z === 0) {
                    point.x = 0
                }
                else { 
                    point.x = FLRW(H0, Omega_L, Omega_M, point.z).lookback
                }
            }
            
            points.push(point)


        })

    })

    return {refs, points}
}