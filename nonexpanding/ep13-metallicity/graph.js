function metalGraph(graph) {

    colors = ["gray", "pink", "blue", "goldenrod", "cyan", "orange", "yellow", "green", "red", "purple", "Chartreuse", "darkblue", "fuchsia", "midnightblue"]
    const black = false
    
    var ctxB = graph.getContext("2d")

    var offset = 20
    var height = graph.height - offset
    var zoom = 1
    var zoomGY = height * 0.31
    var zoomG = zoom * 69
    var OH0 = 6.5

    var Omega_M = 0.3 
    var Omega_L = 0.7
    var Omega_k = 0
    var H0 = 68

    var refs = {}

    var local = [
        {"name": "solar",       "z": 0,  "x": 0,     "OH": 8.69,       "ref": "0"},
        {"name": "Milky Way",   "z": 0,  "x": 0,     "OH": 8.50,       "ref": "0"},
        {"name": "LMC",         "z": 0,  "x": 0,     "OH": 8.37,       "ref": "0"},
        {"name": "SMC",         "z": 0,  "x": 0,     "OH": 8.01,       "ref": "0"}
    ]
        

    var json
    var points = []
    fetch("https://mikehelland.github.io/hubbles-law/data/metallicity.json").then(res => res.json()).then(res => {
        json = res
        points = res.data

        var i = 1
        var tr, td, li, url, hideBox
        var iNextColor = 0

        points.sort((a, b) => res.refs[a.ref].year - res.refs[b.ref].year)

        points.forEach(point => {
            if (!refs[point.ref]) {
                refs[point.ref] = json.refs[point.ref]
                refs[point.ref].i = i
                i++

                url = refs[point.ref].url

                li = document.createElement("li")
                li.innerHTML = `(${refs[point.ref].year}) <b>${refs[point.ref].title}</b> <br> <a target="_blank" href="${url}">${url}</a>`                
                ol.appendChild(li)

                if (point.data) {
                    refs[point.ref].color = colors[iNextColor++]
                }
            }

            tr = document.createElement("tr")    
            table.appendChild(tr)
            
            let hideBox = document.createElement("input")
            hideBox.type = "checkbox"
            hideBox.checked = "checked"
            hideBox.onchange = e => {
                point.hide = !hideBox.checked
                drawGraph()
            }
            td = document.createElement("td")
            td.appendChild(hideBox)
            tr.appendChild(td)

            point.hideBox = hideBox
            

            var zCap
            if (point.data) {
                point.data.sort((a, b) => a.z - b.z)
                zCap = point.data[0].z.toFixed(2) + "&mdash;" + point.data[point.data.length - 1].z.toFixed(2)

                for (var j = 0; j < point.data.length; j++) {
                    point.data[j].x = point.data[j].z === 0 ? 0 : FLRW(H0, Omega_L, Omega_M, point.data[j].z).lookback
                }
            }
            else if (point.bins) {
                zCap = point.bins[0].zstart + "&mdash;" + point.bins[point.bins.length - 1].zstart
            }
            else {
                zCap = point.z
                if (point.z === 0) {
                    point.x = 0
                }
                else { 
                    point.x = FLRW(H0, Omega_L, Omega_M, point.z).lookback
                }
            }
            
            td = document.createElement("td")
            td.innerHTML = refs[point.ref].year
            tr.appendChild(td)
            
            td = document.createElement("td")
            td.innerHTML = point.name + "<sup>[" + refs[point.ref].i + "]</sup>"
            tr.appendChild(td)

            td = document.createElement("td")
            td.innerHTML = zCap
            tr.appendChild(td)

            td = document.createElement("td")
            td.innerHTML = point.OH || `<span style="opacity: 0.3; color:${refs[point.ref].color};">■</span>`
            tr.appendChild(td)

        })

        //points.splice(points.length, 0, ...local)

        drawGraph()
    })

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

        ctxB.font = "14px sans-serif"

        ctxB.fillRect(offset + 16, offset + 33, 2, 2)
        ctxB.fillStyle = "black"

        ctxB.fillStyle = !black ? "black" : "white"
        ctxB.textAlign = "left"
        
        ctxB.textAlign = "left"
        ctxB.fillText('ΛCDM', offset, 12)

        ctxB.textAlign = "center"
        ctxB.fillText("Lookback Time (billion years)", graph.width / 2 + offset, graph.height - 30)
        ctxB.fillText("Redshift z", graph.width / 2 + offset, 34)
        
        ctxB.fillStyle = "#404040"
        //ctxB.globalAlpha = 0.2
        ctxB.fillRect(offset + bb * zoomG, offset, 100, graph.height - 2*offset)
        ctxB.globalAlpha = 1
        
        var dgi
        ctxB.font = "10px sans-serif"
        ctxB.fillStyle = "black"
        
        for (dgi = 0; dgi <= 140; dgi+=10) {
            ctxB.fillText(dgi/10, offset + dgi / 10  * zoomG, graph.height - 5)    
        }        

        ctxB.lineWidth = 1
        ctxB.strokeStyle = "#888888"
        zs.forEach(z => {
            ctxB.fillText(z.z, offset + z.t * zoomG, 10)    
            ctxB.beginPath()
            ctxB.moveTo(offset + z.t * zoomG, offset)
            ctxB.lineTo(offset + z.t * zoomG, height)
            ctxB.stroke()
        })

        ctxB.translate(offset, graph.height - offset)

        for (dgi = 0; dgi <= 3; dgi+=0.5) {
            ctxB.fillText(OH0 + dgi, -12, - dgi * zoomGY)    
        }


        ctxB.globalAlpha = 0.2
        ctxB.beginPath()
        ctxB.moveTo(offset, (graph.height - offset)/2)
        ctxB.lineTo(graph.width, (graph.height - offset)/2)
        ctxB.setLineDash([20, 10])
        ctxB.stroke()
        ctxB.globalAlpha = 1
        ctxB.setLineDash([])

        ctxB.font = "14px sans-serif"

        for (var i = 0; i < points.length; i++) {
            
            if (points[i].hide) {
                continue 
            }

            if (points[i].bins) {
                ctxB.globalAlpha = 0.2
                ctxB.fillStyle = refs[points[i].ref].color

                for (var j = 0; j < points[i].bins.length; j++) {
                    var bin =  points[i].bins[j]

                    var x0 = bin.zstart > 0 ? FLRW(H0, Omega_L, Omega_M, bin.zstart).lookback : 0
                    var x1 = FLRW(H0, Omega_L, Omega_M, bin.zend).lookback
                    
                    var OHmin = - zoomGY * (bin.min - OH0) - 10
                    var OHmax = - zoomGY * (bin.max - OH0) - 10
                    
                    ctxB.fillRect(
                        x0 * zoomG, 
                        OHmax, 
                        (x1 - x0) * zoomG, 
                        OHmax - OHmin    
                    )

                }
                continue
            }

        }


        for (var i = 0; i < points.length; i++) {
            if (points[i].hide) {
                continue 
            }

            if (points[i].data) {
                ctxB.globalAlpha = 0.3
                ctxB.fillStyle = refs[points[i].ref].color
                for (var j = 0; j < points[i].data.length; j++) {
                    ctxB.fillRect(
                        - 5 + points[i].data[j].x * zoomG, 
                        - zoomGY * (points[i].data[j].OH - OH0) - 10, 
                        10, 10)

                }
                continue
            }

        }

        ctxB.fillStyle = "black"

        for (var i = 0; i < points.length; i++) {
            
            if (points[i].hide) {
                continue 
            }

            if (points[i].data || points[i].bins) {
                continue
            }

            ctxB.globalAlpha = 1
            ctxB.fillRect(
                - 5 + points[i].x * zoomG, 
                - zoomGY * (points[i].OH - OH0) - 10, 
                10, 10)

            ctxB.textAlign = points[i].z > 1 ? "right" : "left"
        
            ctxB.fillText(points[i].name, 
                points[i].x * zoomG + (points[i].z > 1 ? -10 : 10), 
                - zoomGY * (points[i].OH - OH0))

        }

        for (var i = 0; i < local.length; i++) {
            
            ctxB.globalAlpha = 1
            ctxB.fillRect(
                - 5 + local[i].x * zoomG, 
                - zoomGY * (local[i].OH - OH0) - 10, 
                10, 10)

            ctxB.textAlign = local[i].z > 1 ? "right" : "left"
        
            ctxB.fillText(local[i].name, 
                local[i].x * zoomG + (local[i].z > 1 ? -10 : 10), 
                - zoomGY * (local[i].OH - OH0))

        }

        ctxB.font = "12px sans-serif"

        ctxB.translate(-18, -height / 2)
        ctxB.rotate(-Math.PI/2)
        ctxB.textAlign = "center"
        ctxB.fillText("12 + log(O/H)", 0, 0)

        ctxB.translate(0, 985)
        ctxB.fillStyle = "white"
        ctxB.fillText("BIG BANG", 0, 0)

    }

    drawGraph()

    
    return {draw: drawGraph}
}