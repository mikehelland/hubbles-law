

function run(H0) {
    var data = []
    for (var i = 10; i < 50000; i+=10) {
        data.push({
            x: i,
            x0: i
        })
    }

    var H0 = H0 / 3.08e19 * 60 * 60 * 24 * 365 * 1e6
    var H = H0

    var t = 0
    var c = 1
    var x = 0.1
    var x2 = 0
    var z = 0
    
    while (z < 6) {
        x += c - H * x
        x2 += c - H * x2
        z = 0.1 / (x - x2) - 1
    
        t++
        data.forEach(g => {
            if (!g.t) {
                g.x -= H * g.x
    
                if (g.x <= x) {
                    g.t = t
                    g.z = z
                }
            }
            
        })

        H = H0 * Math.sqrt(0.3 * Math.pow(1+z, 3) + 0.7)
    }
    return data
}

var data = run(73)

const pc2ly = 3.261564

var snData = []
var url = "https://raw.githubusercontent.com/PantheonPlusSH0ES/DataRelease/main/Pantheon%2B_Data/4_DISTANCES_AND_COVAR/Pantheon%2BSH0ES.dat"
fetch(url).then(res => res.text()).then(text => {
    var lines = text.split("\n")
    for (var i = 1; i < lines.length - 1; i++) {
        var line = lines[i].split(" ")
        var z = parseFloat(line[2])
        var mu = parseFloat(line[10])
        var dL = Math.pow(10, mu/5 - 5) * pc2ly
        var dC = dL / (1+z)
        snData.push({
            z,
            mu,
            muerr: parseFloat(line[11]),
            dC
        })
    }
    draw()

    var lowest
    for (var H = 70; H < 75; H+=0.1) {
        var sse = calculateSSE(H)
        console.log(H, sse)

        if (!lowest || lowest.sse > sse) {
            lowest = {H, sse}
        }
    }
    console.log(lowest)
})

function calculateSSE(H0) {
    // this is a tight loop and blocks up the ui
    // make sure to have console open if you uncomment this
    return 0
    var data = run(H0)
    var d, mu
    var err = 0

    snData.forEach(sn => {
        d = findZ(data, sn.z).x0 / pc2ly * (1 + sn.z)

        mu = 5 * Math.log10(d) + 25

        err += Math.pow(sn.mu - mu, 2)
    })
    return err
}

function findZ(data, z) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].z > z) return data[i - 1]
    }
}

var zoom = 0.02
var zoomZ = 200
var ctx = graph.getContext("2d")
draw()

function draw() {
    graph.width = graph.width
    ctx.translate(0, graph.height)

    ctx.strokeStyle = "white"
    ctx.lineWidth = 2

    ctx.beginPath()
    ctx.moveTo(0, 0)
    
    data.forEach(g => {
        ctx.lineTo(g.z * zoomZ, -g.x * zoom)
    })
    ctx.stroke()

    ctx.setLineDash([40, 40])
    ctx.beginPath()
    ctx.moveTo(0, 0)
    
    data.forEach(g => {
        ctx.lineTo(g.z * zoomZ, -g.x0 * zoom)
    })
    ctx.stroke()

    ctx.setLineDash([10, 10])
    ctx.beginPath()
    ctx.moveTo(0, 0)
    
    data.forEach(g => {
        ctx.lineTo(g.z * zoomZ, -g.t * zoom)
    })
    ctx.stroke()    

    ctx.fillStyle = "red"
    snData.forEach(sn => {
        ctx.fillRect(sn.z * zoomZ, -sn.dC * zoom, 2, 2)
    })

    ctx.fillStyle = "white"
    for (var i = 0; i < 6; i++) {
        ctx.fillText(i, i * zoomZ, -2)
    }
}