function lightspeedDemo(canvas, rate) {

    var ctx = canvas.getContext("2d")


    var source = canvas.width / 2
    var alts = []
    
    
    var i 
    var now
        
    var ret = {alts}

    ret.draw = function () {
        canvas.width = canvas.width

        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.translate(canvas.width / 4, canvas.height / 2)

        ret.drawLC(1)

        //ctx.translate(-canvas.width / 2, 0)

        for (i = 0; i < alts.length; i++) {

            //if (now - alts[i] < 1980) {
                //ctx.fillRect((canvas.height / 2) - (1 - (now - alts[i]) / -500) , -20, 20, 20)
                ctx.fillRect(alts[i].x, -10, 20, 20)
            //}
        }


    }

    ret.drawLC = function (z) {
        
        ctx.font = "italic 18pt serif"
        ctx.fillStyle = "white"

        ctx.textAlign = "center"

        
        ctx.fillText("z", -60, -100)
        ctx.fillText("v", -60, 130)
        
        for (i = 0; i <= 10; i++) {

            ctx.font = "18pt serif"
            ctx.fillText((i/10).toFixed(1), canvas.width / 2 / 10 * i, -100)
            ctx.fillText((1 + i/10).toFixed(1), canvas.width / 2 / 10 * i, 150)

            ctx.fillRect(canvas.width / 2 / 10 * i - 18, 122, 36, 1)

            ctx.font = "italic 18pt serif"
            ctx.fillText("c", canvas.width / 2 / 10 * i, 110)
            
        }


        ctx.fillStyle = "orange"
        ctx.beginPath()
        ctx.arc(0, 0, 20, 0, Math.PI * 2)
        ctx.fill()
        

        ctx.beginPath()
        ctx.arc(canvas.width / 2, 0, 20, 0, Math.PI * 2)
        ctx.fill()



    }

    var anim = function (callback) {
        var start = Date.now()
        var now
        var h = setInterval(() => {
            now = Date.now() - start

            if (callback(now)) {
                clearInterval(h)
            }
            
            ret.draw()
        }, 1000/30)
    }

    ret.showSource = function () {
        anim((now) => {
            ret.source = Math.min(1, now/1000)
            return now > 1000
        })
    }

    ret.showMirror = function () {
        anim((now) => {
            ret.mirror = Math.min(1, now/1000)
            return now > 1000
        })
    }

    ret.showDist = function () {
        anim((now) => {
            ret.dist = Math.min(1, now/1000)
            return now > 1000
        })
    }


    var h
    ret.fire = function () {
        var start = Date.now()
        var loop, i
        var next = 1000
        h = setInterval(() => {
            now = (Date.now() - start) 
            
            loop = now % 1000
            
            if (next <= now) {
                next += 1000

                alts.push({start:now, x: source})
            }

            for (i = 0; i < alts.length; i++) {
                if (alts[i].x > 0)
                alts[i].x -= 10 / (1 + alts[i].x / source)

            }
        
            ret.draw()
        }, 1000/30)
    }


    ret.stop = function () {
        clearInterval(h)
    }

   


    return ret
}