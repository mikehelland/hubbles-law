function sampleDemo(canvas) {
    var ctx = canvas.getContext("2d")

    var zoom = 50

    var data = [
        [4, 2, "red"], [7.7, 8, "orange"], [2, 0.5, "green"], [3, 3, "blue"], [5, 5, "indigo"], [6, 4.9, "violet"]
    ]

    var alphaLine = 0
    var alphaError = 0
    var alphaSquare = 0
    var alphaSum = 0

    var errs = []
    var sums = []
    var isum = 1
    var A = 1.1

    var update = () => {

        errs = []
        for (var i = 0; i < data.length; i++) {
            errs.push({
                x: data[i][0], 
                y: data[i][1], 
                y2: data[i][0] * A
            })
            errs[i].sqr = (errs[i].y - errs[i].y2)**2
        }

        sums.push({A, errs})

    }

    update()

    var draw = () => {
        canvas.width = canvas.width
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.translate(20, canvas.height - 20)

        ctx.lineWidth = 2
        ctx.strokeStyle = "black"
        ctx.strokeRect(0, 0, canvas.width, -canvas.height)

        ctx.globalAlpha = alphaLine
        ctx.lineWidth = 4
        ctx.moveTo(0, 0)
        ctx.lineTo(zoom * 10, -zoom * 10 * A)
        ctx.stroke()
        ctx.globalAlpha = 1

        var y = 0
        var x = canvas.width - 32
            
        for (var i = 0; i < data.length; i++) {
            ctx.globalAlpha = 1
            ctx.fillStyle = data[i][2]
            ctx.strokeStyle = data[i][2]
            ctx.fillRect(-12 + data[i][0] * zoom, zoom * -data[i][1] - 12, 24, 24)


            ctx.lineWidth = 12


            ctx.beginPath()
            ctx.moveTo(errs[i].x * zoom, errs[i].y2 * -zoom)
            if (alphaSquare) {
                ctx.globalAlpha = alphaSquare
                ctx.lineTo(errs[i].x * zoom, (errs[i].y2 + errs[i].sqr) * -zoom)
            }
            else {
                ctx.globalAlpha = alphaError
                ctx.lineTo(errs[i].x * zoom, errs[i].y * -zoom)
            }
            ctx.stroke()
            
            
        }

        if (alphaSum) {
            ctx.globalAlpha = alphaSum
            ctx.lineWidth = 25
            for (var j = 0; j < isum; j++) {
                y = 0
                for (i = 0; i < sums[j].errs.length; i++) {
                    ctx.beginPath()
                    ctx.moveTo(x - j * 25, y * -zoom)
                    ctx.lineTo(x - j * 25, (y + sums[j].errs[i].sqr) * -zoom)
                    y += sums[j].errs[i].sqr
                    ctx.strokeStyle = data[i][2]
                    ctx.stroke()
        
                }
            }
        }
        ctx.globalAlpha = 1
        

        ctx.font = "20pt sans"
        ctx.fillStyle = "black"
        ctx.fillText("x", canvas.width - 40, -4)
        ctx.fillText("y", 4, -canvas.height + 44)



    }

    var pickA = () => {
        var start = Date.now()
        var h = setInterval(() => {
            var now = Date.now() - start
            alphaLine = Math.min(1, now / 1000)
            if (alphaLine === 1) {
                clearInterval(h)
            }
            draw()
        }, 1000 / 30)
    }



    var showError = () => {
        var start = Date.now()
        var h = setInterval(() => {
            var now = Date.now() - start
            alphaError = Math.min(1, now / 1000)
            if (alphaError === 1) {
                clearInterval(h)
            }
            draw()
        }, 1000 / 30)
    }


    var showSquare = () => {
        var start = Date.now()
        var h = setInterval(() => {
            var now = Date.now() - start
            alphaSquare = Math.min(1, now / 1000)
            if (alphaSquare === 1) {
                clearInterval(h)
            }
            draw()
        }, 1000 / 30)
    }

    var showSum = () => {
        var start = Date.now()
        var h = setInterval(() => {
            var now = Date.now() - start
            alphaSum = Math.min(1, now / 1000)
            if (alphaSum === 1) {
                clearInterval(h)
            }
            draw()
        }, 1000 / 30)
    }

    var nextA = () => {
        A -= 0.05
        update()

        var start = Date.now()
        var h = setInterval(() => {
            var now = Date.now() - start
            alphaLine = Math.min(1, now / 1000)
            alphaError = alphaLine < 0.5 ? alphaLine * 2 : 0
            alphaSquare = alphaLine > 0.5 ? alphaLine * 2 : 0
            if (alphaLine === 1) {
                clearInterval(h)
                isum++

                if (A > 0.7) {
                    setTimeout(()=>nextA(), 400)
                }
            }
            draw()
        }, 1000 / 30)
    }



    return {draw, pickA, showError, showSquare, showSum, nextA}

}