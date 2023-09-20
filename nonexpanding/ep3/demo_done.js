
const pc2ly = 3.261564
    

var snData = []
var url = "https://raw.githubusercontent.com/PantheonPlusSH0ES/DataRelease/main/Pantheon%2B_Data/4_DISTANCES_AND_COVAR/Pantheon%2BSH0ES.dat"
fetch(url).then(res => res.text()).then(text => {
    var lines = text.split("\n")
    for (var i = 1; i < lines.length - 1; i++) {
        var line = lines[i].split(" ")
        var mu = parseFloat(line[10])
        var z = parseFloat(line[2])
        var dL = Math.pow(10, mu/5 - 5)
        var dC = dL / (1+z) * pc2ly
        snData.push({
            z,
            mu,
            muerr: parseFloat(line[11]),
            dC
        })
    }


    var H = 70
    var lowest
    var handle = setInterval(() => {
        var _sse = sse(H)
        console.log(_sse, H)
        
        if (!lowest || _sse < lowest.sse) {
            lowest = {H, sse: _sse}
        }
        H += 0.1
        if (H >= 75) {
            clearInterval(handle)
            console.log(lowest)
        }
    })

    draw()
})

function flrw(H0) {
    // units in million light years and million years
    c = 1
    t = 0
    H0 = H0 / 3.08e19 * 60 * 60 * 24 * 365 * 1e6
    H = H0

    photon = 0.1
    photon2 = 0

    var data = []
    for (let i = 10; i < 80000; i += 10) {
        data.push({
            x: i, x0: i
        })
    }

    var z = 0
    while (z < 20) {
        photon += c - H * photon
        photon2 += c - H * photon2
        t++
        z = 0.1 / (photon - photon2) - 1

        for (var i = 0; i < data.length; i++) {
            if (!data[i].t) {

                data[i].x = data[i].x - H * data[i].x 



                if (data[i].x <= photon) {
                    data[i].t = t
                    data[i].z = z

                    //console.log(data[i])
                }
            }
        }

        H = H0 * Math.sqrt(0.3 * Math.pow(1 + z, 3) + 0.7)
        
    }
    return data
}


var ctx = graph.getContext("2d")
var zoom = 0.02
var zoomZ = 200

var data = flrw(72.4)


function sse(H0) {
    var data = flrw(H0)
    var dL, mu
    var err = 0
    snData.forEach(sn => {
        dL = findZ(data, sn.z).x0 * (1+sn.z) / pc2ly
        mu = 5 * Math.log10(dL) + 25

        err += Math.pow(mu - sn.mu, 2) / Math.pow(sn.muerr, 2)
    })
    return err
}

function findZ(data, z) {
    for (var i = 0; i < data.length; i++) {
        //console.log(z, data[i].z)
        if (z < data[i].z) {
            return data[i - 1]
        }
    }
}


draw()


function draw() {
    graph.width = graph.clientWidth
    graph.height = graph.clientHeight
    ctx.translate(0, graph.height)

    ctx.lineWidth = 1

    ctx.strokeStyle = "white"

    ctx.beginPath()
    ctx.moveTo(0, 0)

    for (var i = 0; i < data.length; i++) {
        ctx.lineTo(data[i].z * zoomZ , 
            -data[i].x * zoom)
        
    }
    ctx.stroke()

    ctx.strokeStyle = "red"

    ctx.beginPath()
    ctx.moveTo(0, 0)

    for (var i = 0; i < data.length; i++) {
        ctx.lineTo(data[i].z * zoomZ , 
            -data[i].x0 * zoom)
        
    }
    ctx.stroke()


    ctx.strokeStyle = "yellow"

    ctx.beginPath()
    ctx.moveTo(0, 0)

    for (var i = 0; i < data.length; i++) {
        ctx.lineTo(data[i].z * zoomZ , 
            -data[i].t * zoom)
        
    }
    ctx.stroke()



    ctx.fillStyle = "yellow"
    ctx.fillRect(photon * zoom, 0, 4, 10)

    ctx.fillStyle = "white"
    for (var i = 0; i < 10; i++) {
        ctx.fillText(i, i * zoomZ, -2)
    }

    for (var i = 0; i < 40; i+=5) {
        ctx.fillText(i, 5, -i  * 1000 * zoom)
    }

    ctx.fillStyle = "red"
    for (i = 0; i < snData.length; i++) {
        ctx.fillRect(snData[i].z * zoomZ, -snData[i].dC * zoom, 2, 2)
    }
}