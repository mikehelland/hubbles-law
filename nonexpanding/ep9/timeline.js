function timelineDemo(canvas) {

    var ctx = canvas.getContext("2d")

    var w = 0.8 * canvas.width

    var n = 14


    var zs = [{t:0, z:"", a: 1}];
    [0.25, 0.5, 1, 2, 3, 4, 9].forEach(z => {
        var cap = (1/(1+z))
        
        if ((cap + "").length > 4) cap = cap.toFixed(3)
        zs.push({z, a: cap, t: FLRW(68, 0.7, 0.3, z).lookback})
    })

    

    var zline = 100

    var aline = 150

    var tline = -50

    var aAlpha = 0
    var zAlpha = 0
    var z0Alpha = 0
    var bbAlpha = 0
    var halfAlpha = 0

    var draw = function () {
        canvas.width = canvas.width
        ctx.translate(canvas.width * 0.1, canvas.height / 2)

        ctx.beginPath()
        ctx.moveTo(-3, 0)
        ctx.lineTo(w + 3, 0)
        ctx.lineWidth = 8        
        ctx.strokeStyle = "white"
        ctx.stroke()

        ctx.globalAlpha = 1 - zAlpha / 2

        ctx.lineWidth = 6
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.font = "italic 28px serif"
        for (var i = 0; i <= n; i++) {
            ctx.beginPath()
            ctx.moveTo(w/n * i, 0) 
            ctx.lineTo(w/n * i, -20)
            ctx.stroke() 

            ctx.fillText(-i, w/n * i, tline)
        }

        ctx.textAlign = "left"
        ctx.fillText("billion yrs", w + 30, tline) 

        ctx.textAlign = "center"


        for (var i = 0; i < zs.length; i++) {
            ctx.globalAlpha = zAlpha 

            ctx.beginPath()
            ctx.moveTo(w/n * zs[i].t, 0) 
            ctx.lineTo(w/n * zs[i].t, 40)
            ctx.stroke() 

            ctx.globalAlpha = zAlpha - aAlpha / 2

            ctx.fillText(zs[i].z, w/n * zs[i].t, zline)

            ctx.globalAlpha = aAlpha

            ctx.fillText(zs[i].a, w/n * zs[i].t, aline)

        }

        ctx.globalAlpha = z0Alpha - aAlpha / 2

        ctx.beginPath()
        ctx.moveTo(0, 0) 
        ctx.lineTo(0, 40)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(w/n * 13.8, 0) 
        ctx.lineTo(w/n * 13.8, 40)
        ctx.stroke()

        ctx.globalAlpha = z0Alpha - aAlpha / 2

        ctx.fillText("0", 0, zline)
        
        ctx.fillText("∞", w/n * 13.8, zline)
        
  
//        ctx.fillText("Redshift (z)", w/4, -50) 
        ctx.fillText("z  =", -50, zline) 

        ctx.globalAlpha = aAlpha

        ctx.fillText("0", w/n * 13.8, aline)
        ctx.fillText("a  =", -50, aline) 

        ctx.globalAlpha = 1  - zAlpha / 2

        ctx.fillText("t  =", -50, tline) 
        

        ctx.globalAlpha = bbAlpha - zAlpha / 2


        ctx.strokeStyle = "gray"
        ctx.beginPath()
        ctx.moveTo(w/n * 13.8, 0)
        ctx.lineTo(w/n * 13.8, -140)
        ctx.lineWidth = 2
        ctx.stroke()


        ctx.fillText("Big Bang", w/n * 13.8, -188) 

        ctx.fillText("(-13.8 billion years)", w/n * 13.8, -148) 

        
        ctx.beginPath()
        ctx.arc(w/n * 13.8, 0, 10, 0, Math.PI * 2)
        ctx.fillStyle = "red"
        ctx.fill()

        ctx.beginPath()
        ctx.arc(0, 0, 10, 0, Math.PI * 2)
        ctx.fillStyle = "green"
        ctx.fill()

        ctx.globalAlpha = halfAlpha
        ctx.lineWidth = 4
        ctx.strokeStyle = "blue"

        ctx.beginPath()
        ctx.moveTo(w/n * 13.8/2, 100)
        ctx.lineTo(w/n * 13.8/2, -100)

        ctx.stroke()

    }

    var anim = function (callback) {
        var start = Date.now()
        var h = setInterval(() => {
            now = Date.now() - start

            if (callback(now)) {
                clearInterval(h)
            }
            
            draw()
        }, 1000/30)
    }

    var showZ0 = function () {
        anim((now) => {
            z0Alpha = Math.min(1, now/1000)
            return now > 1000
        })
    }

    var showZ = function () {
        anim((now) => {
            zAlpha = Math.min(1, now/1000)
            return now > 1000
        })
    }

    var showBB = function () {
        anim((now) => {
            bbAlpha = Math.min(1, now/1000)
            return now > 1000
        })
    }

    var showHalf = function () {
        anim((now) => {
            halfAlpha = Math.min(1, now/1000)
            return now > 1000
        })
    }

    var showA = function () {
        anim((now) => {
            aAlpha = Math.min(1, now/1000)
            return now > 1000
        })
    }

    return {draw, showZ, showBB, showHalf, showZ0, showA}
}