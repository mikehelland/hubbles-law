function timeDilation1(graph) {
    var ctx = graph.getContext("2d")
    
    var draw = function (t, dx) {
        
        var started = true
        if (typeof(t) !== "number") {
            started = false
        }

        if (typeof(dx) !== "number") {
            dx = 0
        }

        
        ctx.fillStyle = "black"
        ctx.fillRect(0, 0, graph.width, graph.height)
        
        var x0 = graph.width / 20
        var y0 = graph.height / 3
        ctx.strokeStyle = "White"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, y0)
        ctx.lineTo(graph.width, y0)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x0, 0)
        ctx.lineTo(x0, graph.height)
        ctx.stroke()
    
        ctx.font = "14pt Sans"
        ctx.fillStyle = "white"
        ctx.textAlign = "right"
        ctx.fillText("Time", 86, 24)
        ctx.fillText("Space", graph.width - 5, y0 - 34)
    
        var percent = Math.min(1, t / 2000)

        if (percent > 0) {
            ctx.strokeStyle = "yellow"
            ctx.lineWidth = 3
            ctx.beginPath()
            ctx.moveTo(x0, y0)
            ctx.lineTo(x0 + 400, y0 + 400)
            ctx.stroke()    
        }
        if (percent === 1) {
            ctx.beginPath()
            ctx.moveTo(x0, y0 - 200 + dx)
            ctx.lineTo(x0 + 500 - dx, y0 + 300)
            ctx.stroke()

            ctx.beginPath()
            ctx.moveTo(x0 + 400, y0 + 400)
            ctx.lineTo(x0 + 500 - dx, y0 + 300)
            ctx.strokeStyle = "darkred"
            ctx.stroke()

        }
    
        ctx.fillStyle = "red"
        ctx.beginPath()
        ctx.arc(x0 + 400, y0 + 400, 16, 0, Math.PI*2)
        ctx.fill()
    
        ctx.font = "12pt Sans"
        ctx.fillStyle = "white"
        ctx.textAlign = "center"
        ctx.fillText("SN Start", x0 + 400, y0 + 430)
    
        ctx.fillStyle = "orange"

        if (started) {
            ctx.beginPath()
            ctx.arc(x0 + 400 + 100 * percent - dx, 
                y0 + 400 - 100 * percent,
                16 + 30 * (1 - percent), 0, Math.PI * 2)
            ctx.fill()
    
        }

        if (percent === 1) {
            ctx.fillStyle = "white"
            ctx.textAlign = "center"
            ctx.fillText("SN End", x0 + 500 - dx, y0 + 330)
        
        }
        /*ctx.drawImage(imgSN, 
            x0 + 400 - imgSN.width / 2 + 100 * percent, 
            y0 + 400 - imgSN.height / 2 - 100 * percent)
        */
    }
    

    var run = function () {
        var start = Date.now()
        var t
        var h = setInterval(() => {
            t = (Date.now() - start)
            if (t >= 2000) {
                clearInterval(h)
                //t = 1
    
            }
            draw(t)
    
        })
    
    }

    var change = function () {
        var start = Date.now()
        var t
        var h = setInterval(() => {
            t = (Date.now() - start)
            if (t >= 8000) {
                clearInterval(h)
                //t = 1
    
            }
            var dx = Math.sin(t/500) * 100
            draw(2000, dx)
            blueLine()
            redLine(dx)
    
        })
    
    }


    var blueLine = function() {
        var x0 = graph.width / 20
        var y0 = graph.height / 3
        ctx.strokeStyle = "blue"
        
        ctx.lineWidth = 1

        ctx.beginPath()
        ctx.moveTo(0, y0 + 400)
        ctx.lineTo(graph.width, y0 + 400)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, y0 + 300)
        ctx.lineTo(graph.width, y0 + 300)
        ctx.stroke()

        
        ctx.lineWidth = 10
        ctx.beginPath()
        ctx.moveTo(x0 - 20, y0 + 400)
        ctx.lineTo(x0 - 20, y0 + 300)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x0 - 10, y0 + 400)
        ctx.lineTo(x0 - 30, y0 + 400)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x0 - 10, y0 + 300)
        ctx.lineTo(x0 - 30, y0 + 300)
        ctx.stroke()
    }

    var redLine = function(dx) {
        dx = dx || 0
        var x0 = graph.width / 20
        var y0 = graph.height / 3    
        ctx.strokeStyle = "red"

        ctx.lineWidth = 1

        ctx.beginPath()
        ctx.moveTo(0, y0)
        ctx.lineTo(graph.width, y0)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, y0 - 200 + dx)
        ctx.lineTo(graph.width, y0 - 200 + dx)
        ctx.stroke()


        ctx.lineWidth = 10

        ctx.beginPath()
        ctx.moveTo(x0 - 20, y0)
        ctx.lineTo(x0 - 20, dx + y0 - 200)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x0 - 30, y0)
        ctx.lineTo(x0 - 10, y0)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(x0 - 30, dx + y0 - 200)
        ctx.lineTo(x0 - 10, dx + y0 - 200)
        ctx.stroke()
    }

    return {draw, run, blueLine, redLine, change}
}




var graph = document.getElementById("time-dilation")
var imgSN = document.getElementById("supernova")


